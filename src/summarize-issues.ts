import * as fs from 'fs';

import type { Octokit } from '@octokit/rest';

import * as markdown from './markdown';
import * as status from './status';
import type { ConfigSection, RepoContext, Section } from './types';

export async function run(inputs: {
    title: string,
    configPath: string,
    outputPath: string,
    octokit: Octokit,
    repoContext: RepoContext
}) {
    console.log(`Reading the config file at ${inputs.configPath} ...`);
    const config = fs.readFileSync(inputs.configPath, 'utf8');
    const configSections: ConfigSection[] = JSON.parse(config);

    console.log('Querying for issues ...');
    const sections = [];
    for (const configSection of configSections) {
        const issues = await queryIssues(inputs.octokit, inputs.repoContext, configSection.labels);
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

// See https://octokit.github.io/rest.js/v17#issues-list-for-repo.
async function queryIssues( octokit: Octokit, repoContext: RepoContext, labels: string[]) {
    const issuesResponse = await octokit.issues.listForRepo({
        ...repoContext,
        labels: labels.join(','),
        state: 'open'
    });

    return issuesResponse.data.filter(issue => !issue.pull_request);
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