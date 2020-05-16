import * as core from '@actions/core';
import * as github from '@actions/github';

import * as summarizeIssues from './summarize-issues';

async function main(): Promise<void> {
    try {
        await summarizeIssues.run({
            title: core.getInput('title'),
            configPath: core.getInput('configPath'),
            outputPath: core.getInput('outputPath'),
            octokit: new github.GitHub(core.getInput('token')),
            repoContext: { ...github.context.repo }
        });
    } catch (error) {
        core.setFailed(error.message);
    }
}

main().catch(err => console.error(err));