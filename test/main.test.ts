import * as path from 'path';

import { Octokit } from '@octokit/rest';

import * as summarizeIssues from '../src/summarize-issues';

test('Run the action end-to-end through its API', async () => {
    await summarizeIssues.run({
        title: 'test',
        configPath: path.join(__dirname, 'issues-report.json'),
        outputPath: path.join(__dirname, 'result.md'),
        octokit: mocktokit,
        repoContext: { owner: 'test', repo: 'repo' }
    });
});

const mocktokit = <Octokit><unknown>{
    paginate: (route: string, params?: Octokit.RequestOptions & Octokit.IssuesListForRepoParams, callback?: any): Promise<Octokit.Response<Octokit.IssuesListForRepoResponse>> => {
        const response = JSON.parse(issuesForRepoResponseJson);
        return Promise.resolve(response);
    }
};

// Update by running octokit-response.js.
const issuesForRepoResponseJson = `[
    {
        "url": "https://api.github.com/repos/brcrista/summarize-issues-test/issues/4",
        "repository_url": "https://api.github.com/repos/brcrista/summarize-issues-test",
        "labels_url": "https://api.github.com/repos/brcrista/summarize-issues-test/issues/4/labels{/name}",
        "comments_url": "https://api.github.com/repos/brcrista/summarize-issues-test/issues/4/comments",
        "events_url": "https://api.github.com/repos/brcrista/summarize-issues-test/issues/4/events",
        "html_url": "https://github.com/brcrista/summarize-issues-test/pull/4",
        "id": 619566577,
        "node_id": "MDExOlB1bGxSZXF1ZXN0NDE5MDMwNjU4",
        "number": 4,
        "title": "Update README.md",
        "user": {
            "login": "brcrista",
            "id": 33549821,
            "node_id": "MDQ6VXNlcjMzNTQ5ODIx",
            "avatar_url": "https://avatars2.githubusercontent.com/u/33549821?v=4",
            "gravatar_id": "",
            "url": "https://api.github.com/users/brcrista",
            "html_url": "https://github.com/brcrista",
            "followers_url": "https://api.github.com/users/brcrista/followers",
            "following_url": "https://api.github.com/users/brcrista/following{/other_user}",
            "gists_url": "https://api.github.com/users/brcrista/gists{/gist_id}",
            "starred_url": "https://api.github.com/users/brcrista/starred{/owner}{/repo}",
            "subscriptions_url": "https://api.github.com/users/brcrista/subscriptions",
            "organizations_url": "https://api.github.com/users/brcrista/orgs",
            "repos_url": "https://api.github.com/users/brcrista/repos",
            "events_url": "https://api.github.com/users/brcrista/events{/privacy}",
            "received_events_url": "https://api.github.com/users/brcrista/received_events",
            "type": "User",
            "site_admin": true
        },
        "labels": [
            {
                "id": 2065705622,
                "node_id": "MDU6TGFiZWwyMDY1NzA1NjIy",
                "url": "https://api.github.com/repos/brcrista/summarize-issues-test/labels/incident-repair",
                "name": "incident-repair",
                "color": "a4f9f1",
                "default": false,
                "description": ""
            }
        ],
        "state": "open",
        "locked": false,
        "assignee": null,
        "assignees": [],
        "milestone": null,
        "comments": 0,
        "created_at": "2020-05-16T22:24:53Z",
        "updated_at": "2020-05-16T22:28:45Z",
        "closed_at": null,
        "author_association": "OWNER",
        "pull_request": {
            "url": "https://api.github.com/repos/brcrista/summarize-issues-test/pulls/4",
            "html_url": "https://github.com/brcrista/summarize-issues-test/pull/4",
            "diff_url": "https://github.com/brcrista/summarize-issues-test/pull/4.diff",
            "patch_url": "https://github.com/brcrista/summarize-issues-test/pull/4.patch"
        },
        "body": ""
    },
    {
        "url": "https://api.github.com/repos/brcrista/summarize-issues-test/issues/2",
        "repository_url": "https://api.github.com/repos/brcrista/summarize-issues-test",
        "labels_url": "https://api.github.com/repos/brcrista/summarize-issues-test/issues/2/labels{/name}",
        "comments_url": "https://api.github.com/repos/brcrista/summarize-issues-test/issues/2/comments",
        "events_url": "https://api.github.com/repos/brcrista/summarize-issues-test/issues/2/events",
        "html_url": "https://github.com/brcrista/summarize-issues-test/issues/2",
        "id": 619531412,
        "node_id": "MDU6SXNzdWU2MTk1MzE0MTI=",
        "number": 2,
        "title": "incident-repair 2",
        "user": {
            "login": "brcrista",
            "id": 33549821,
            "node_id": "MDQ6VXNlcjMzNTQ5ODIx",
            "avatar_url": "https://avatars2.githubusercontent.com/u/33549821?v=4",
            "gravatar_id": "",
            "url": "https://api.github.com/users/brcrista",
            "html_url": "https://github.com/brcrista",
            "followers_url": "https://api.github.com/users/brcrista/followers",
            "following_url": "https://api.github.com/users/brcrista/following{/other_user}",
            "gists_url": "https://api.github.com/users/brcrista/gists{/gist_id}",
            "starred_url": "https://api.github.com/users/brcrista/starred{/owner}{/repo}",
            "subscriptions_url": "https://api.github.com/users/brcrista/subscriptions",
            "organizations_url": "https://api.github.com/users/brcrista/orgs",
            "repos_url": "https://api.github.com/users/brcrista/repos",
            "events_url": "https://api.github.com/users/brcrista/events{/privacy}",
            "received_events_url": "https://api.github.com/users/brcrista/received_events",
            "type": "User",
            "site_admin": true
        },
        "labels": [
            {
                "id": 2065685912,
                "node_id": "MDU6TGFiZWwyMDY1Njg1OTEy",
                "url": "https://api.github.com/repos/brcrista/summarize-issues-test/labels/documentation",
                "name": "documentation",
                "color": "0075ca",
                "default": true,
                "description": "Improvements or additions to documentation"
            },
            {
                "id": 2065705622,
                "node_id": "MDU6TGFiZWwyMDY1NzA1NjIy",
                "url": "https://api.github.com/repos/brcrista/summarize-issues-test/labels/incident-repair",
                "name": "incident-repair",
                "color": "a4f9f1",
                "default": false,
                "description": ""
            },
            {
                "id": 2065707459,
                "node_id": "MDU6TGFiZWwyMDY1NzA3NDU5",
                "url": "https://api.github.com/repos/brcrista/summarize-issues-test/labels/short-term",
                "name": "short-term",
                "color": "d4c5f9",
                "default": false,
                "description": ""
            }
        ],
        "state": "open",
        "locked": false,
        "assignee": {
            "login": "brcrista",
            "id": 33549821,
            "node_id": "MDQ6VXNlcjMzNTQ5ODIx",
            "avatar_url": "https://avatars2.githubusercontent.com/u/33549821?v=4",
            "gravatar_id": "",
            "url": "https://api.github.com/users/brcrista",
            "html_url": "https://github.com/brcrista",
            "followers_url": "https://api.github.com/users/brcrista/followers",
            "following_url": "https://api.github.com/users/brcrista/following{/other_user}",
            "gists_url": "https://api.github.com/users/brcrista/gists{/gist_id}",
            "starred_url": "https://api.github.com/users/brcrista/starred{/owner}{/repo}",
            "subscriptions_url": "https://api.github.com/users/brcrista/subscriptions",
            "organizations_url": "https://api.github.com/users/brcrista/orgs",
            "repos_url": "https://api.github.com/users/brcrista/repos",
            "events_url": "https://api.github.com/users/brcrista/events{/privacy}",
            "received_events_url": "https://api.github.com/users/brcrista/received_events",
            "type": "User",
            "site_admin": true
        },
        "assignees": [
            {
                "login": "brcrista",
                "id": 33549821,
                "node_id": "MDQ6VXNlcjMzNTQ5ODIx",
                "avatar_url": "https://avatars2.githubusercontent.com/u/33549821?v=4",
                "gravatar_id": "",
                "url": "https://api.github.com/users/brcrista",
                "html_url": "https://github.com/brcrista",
                "followers_url": "https://api.github.com/users/brcrista/followers",
                "following_url": "https://api.github.com/users/brcrista/following{/other_user}",
                "gists_url": "https://api.github.com/users/brcrista/gists{/gist_id}",
                "starred_url": "https://api.github.com/users/brcrista/starred{/owner}{/repo}",
                "subscriptions_url": "https://api.github.com/users/brcrista/subscriptions",
                "organizations_url": "https://api.github.com/users/brcrista/orgs",
                "repos_url": "https://api.github.com/users/brcrista/repos",
                "events_url": "https://api.github.com/users/brcrista/events{/privacy}",
                "received_events_url": "https://api.github.com/users/brcrista/received_events",
                "type": "User",
                "site_admin": true
            }
        ],
        "milestone": null,
        "comments": 0,
        "created_at": "2020-05-16T18:32:57Z",
        "updated_at": "2020-05-16T22:05:31Z",
        "closed_at": null,
        "author_association": "OWNER",
        "body": ""
    },
    {
        "url": "https://api.github.com/repos/brcrista/summarize-issues-test/issues/1",
        "repository_url": "https://api.github.com/repos/brcrista/summarize-issues-test",
        "labels_url": "https://api.github.com/repos/brcrista/summarize-issues-test/issues/1/labels{/name}",
        "comments_url": "https://api.github.com/repos/brcrista/summarize-issues-test/issues/1/comments",
        "events_url": "https://api.github.com/repos/brcrista/summarize-issues-test/issues/1/events",
        "html_url": "https://github.com/brcrista/summarize-issues-test/issues/1",
        "id": 619511758,
        "node_id": "MDU6SXNzdWU2MTk1MTE3NTg=",
        "number": 1,
        "title": "incident-repair 1",
        "user": {
            "login": "brcrista",
            "id": 33549821,
            "node_id": "MDQ6VXNlcjMzNTQ5ODIx",
            "avatar_url": "https://avatars2.githubusercontent.com/u/33549821?v=4",
            "gravatar_id": "",
            "url": "https://api.github.com/users/brcrista",
            "html_url": "https://github.com/brcrista",
            "followers_url": "https://api.github.com/users/brcrista/followers",
            "following_url": "https://api.github.com/users/brcrista/following{/other_user}",
            "gists_url": "https://api.github.com/users/brcrista/gists{/gist_id}",
            "starred_url": "https://api.github.com/users/brcrista/starred{/owner}{/repo}",
            "subscriptions_url": "https://api.github.com/users/brcrista/subscriptions",
            "organizations_url": "https://api.github.com/users/brcrista/orgs",
            "repos_url": "https://api.github.com/users/brcrista/repos",
            "events_url": "https://api.github.com/users/brcrista/events{/privacy}",
            "received_events_url": "https://api.github.com/users/brcrista/received_events",
            "type": "User",
            "site_admin": true
        },
        "labels": [
            {
                "id": 2065705622,
                "node_id": "MDU6TGFiZWwyMDY1NzA1NjIy",
                "url": "https://api.github.com/repos/brcrista/summarize-issues-test/labels/incident-repair",
                "name": "incident-repair",
                "color": "a4f9f1",
                "default": false,
                "description": ""
            },
            {
                "id": 2065707459,
                "node_id": "MDU6TGFiZWwyMDY1NzA3NDU5",
                "url": "https://api.github.com/repos/brcrista/summarize-issues-test/labels/short-term",
                "name": "short-term",
                "color": "d4c5f9",
                "default": false,
                "description": ""
            }
        ],
        "state": "open",
        "locked": false,
        "assignee": null,
        "assignees": [],
        "milestone": null,
        "comments": 1,
        "created_at": "2020-05-16T16:40:44Z",
        "updated_at": "2020-05-16T18:32:24Z",
        "closed_at": null,
        "author_association": "OWNER",
        "body": ""
    }
]`;