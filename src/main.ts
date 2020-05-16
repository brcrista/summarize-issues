import * as core from '@actions/core'

import * as summarizeIssues from './summarize-issues';

async function main(): Promise<void> {
    try {
        summarizeIssues.run({
            title: core.getInput('title'),
            configPath: core.getInput('configPath'),
            outputPath: core.getInput('outputPath')
        });
    } catch (error) {
        core.setFailed(error.message);
    }
}

main().catch(err => console.error(err));