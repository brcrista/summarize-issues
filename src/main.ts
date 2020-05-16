import * as core from '@actions/core'

import { summarizeIssues } from './summarize-issues';

async function main(): Promise<void> {
    try {
        summarizeIssues({
            title: core.getInput('title'),
            outputPath: core.getInput('outputPath'),
            configPath: core.getInput('configPath')
        });
    } catch (error) {
        core.setFailed(error.message);
    }
}

main().catch(err => console.error(err));