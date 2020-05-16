import * as fs from 'fs';

import { Octokit } from '@octokit/rest';

import * as markdown from './markdown';
import * as status from './status';

// What comes out of the config file
interface ConfigSection {
    section: string,
    labels: string[],
    threshold: number
}

// What comes out of the config file plus whatever else we need to write the report
export type Section = ConfigSection & {
    issues: any[], // TODO
    status: status.Status
}

// See https://octokit.github.io/rest.js/v17#issues-list-for-repo.
// Use this interface to inject a test double for automated tests.
export interface QueryIssues {
    (owner: string, repo: string, labels: string[]): Promise<Octokit.Response<Octokit.IssuesListForRepoResponse>> 
}

export async function run(inputs: {
    title: string,
    configPath: string,
    outputPath: string,
    octokit: Octokit
}) {
    console.log(`Reading the config file at ${inputs.configPath} ...`);
    const config = fs.readFileSync(inputs.configPath, 'utf8');
    const configSections: ConfigSection[] = JSON.parse(config);

    console.log('Querying for issues ...');
    const sections = [];
    for (const configSection of configSections) {
        const issuesResponse = await queryIssues('repo', 'owner', configSection.labels, inputs.octokit); // TODO
        const issues = issuesResponse.data;
        sections.push({
            ...configSection,
            issues,
            status: status.getStatus(issues.length, configSection.threshold)
        }); 
    };

    console.log('Generating the report Markdown ...');
    const report = generateReport(inputs.title, sections);

    console.log(`Writing the Markdown to ${inputs.outputPath} ...`);
    fs.writeFileSync(inputs.outputPath, report, 'utf8');

    console.log('Done!');
}

async function queryIssues(owner: string, repo: string, labels: string[], octokit: Octokit) {
    return await octokit.issues.listForRepo({
        owner,
        repo,
        labels: labels.join(','),
        state: 'open'
    });
}

function generateReport(title: string, sections: Section[]): string {
    let result = '';
    for (const line of markdown.generateSummary(title, sections)) {
        result += line;
        result += '\n';
    }

    for (const line of markdown.generateDetails(sections)) {
        result += line;
        result += '\n';
    }

    return result;
}