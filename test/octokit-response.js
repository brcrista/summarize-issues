/**
 * Use this script to get some real-life data for the mock response.
 */

const { Octokit } = require('@octokit/rest');

async function main() {
    const octokit = new Octokit({
        auth: process.env['PAT']
    });

    const issues = await octokit.paginate(
        'GET /repos/:owner/:repo/issues',
        {
            owner: 'brcrista',
            repo: 'summarize-issues-test',
            labels: ['incident-repair'].join(','),
            state: 'open'
        }
    );

    console.log(JSON.stringify(issues));
}

main().catch(err => console.error(err));
