import * as fs from 'fs';

import type { Octokit } from '@octokit/rest';

import * as iterable from './iterable';
import * as markdown from './markdown';
import * as status from './status';
import type { ConfigSection, RepoContext, Section, Issue } from './types';

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
        const issues = await queryIssues(inputs.octokit, inputs.repoContext, configSection.labels, configSection.excludeLabels || []);
        sections.push({
            ...configSection,
            issues,
            status: status.getStatus(issues.length, configSection.threshold)
        }); 
    };

    console.log('Generating the report Markdown ...');
    const report = generateReport(inputs.title, sections, inputs.repoContext);

    console.log(`Writing the Markdown to ${inputs.outputPath} ...`);
    fs.writeFileSync(inputs.outputPath, report, 'utf8');

    console.log('Done!');
}

// See https://octokit.github.io/rest.js/v17#issues-list-for-repo.
async function queryIssues(octokit: Octokit, repoContext: RepoContext, labels: string[], excludeLabels: string[]): Promise<Issue[]> {
    return await octokit.paginate(
        // There's a bug in the Octokit type declaration for `paginate`.
        // It won't let you use the endpoint method as documented: https://octokit.github.io/rest.js/v17#pagination.
        // Work around by using the route string instead.
        //octokit.issues.listForRepo,
        "GET /repos/:owner/:repo/issues",
        {
            ...repoContext,
            labels: labels.join(','),
            state: 'open'
        },
        (response: Octokit.Response<Octokit.IssuesListForRepoResponse>) => response.data.filter(issue => filterIssue(issue, excludeLabels)));
}

function filterIssue(issue: Octokit.IssuesListForRepoResponseItem, excludeLabels: string[]) {
    return !issue.pull_request &&
           !issue.labels.some(label => excludeLabels.includes(label.name));
}

function generateReport(title: string, sections: Section[], repoContext: RepoContext): string {
    return Array.from(iterable.chain(
        markdown.generateSummary(title, sections),
        markdown.generateDetails(sections, repoContext))
    ).join('\n');
}