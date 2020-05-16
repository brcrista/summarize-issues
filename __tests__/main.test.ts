import * as path from 'path';

import { Octokit } from '@octokit/rest';

import * as summarizeIssues from '../src/summarize-issues';

test('Run the action end-to-end through its API', async () => {
    await summarizeIssues.run({
        title: 'test',
        configPath: path.join(__dirname, 'issues-report.json'),
        outputPath: path.join(__dirname, 'result.md'),
        octokit: <Octokit>mocktokit
    });
});

const mocktokit = {
    issues: {
        listForRepo: (params?: Octokit.RequestOptions & Octokit.IssuesListForRepoParams): Promise<Octokit.Response<Octokit.IssuesListForRepoResponse>> => {
            const response = JSON.parse(issuesForRepoResponseJson);
            return Promise.resolve(response);
        }
    }
};

const issuesForRepoResponseJson = `{
    "status": 200,
    "url": "https://api.github.com/repos/brcrista/summarize-issues-test/issues?labels=incident-repair&state=open",
    "headers": {
        "accept-ranges": "bytes",
        "access-control-allow-origin": "*",
        "access-control-expose-headers": "ETag, Link, Location, Retry-After, X-GitHub-OTP, X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset, X-OAuth-Scopes, X-Accepted-OAuth-Scopes, X-Poll-Interval, X-GitHub-Media-Type, Deprecation, Sunset",
        "cache-control": "public, max-age=60, s-maxage=60",
        "connection": "close",
        "content-encoding": "gzip",
        "content-length": "886",
        "content-security-policy": "default-src 'none'",
        "content-type": "application/json; charset=utf-8",
        "date": "Sat, 16 May 2020 20:29:53 GMT",
        "etag": "W/\\"8dd235ebc301958ee3684e988bd25908\\"",
        "referrer-policy": "origin-when-cross-origin, strict-origin-when-cross-origin",
        "server": "GitHub.com",
        "status": "200 OK",
        "strict-transport-security": "max-age=31536000; includeSubdomains; preload",
        "vary": "Accept, Accept-Encoding, Accept, X-Requested-With",
        "x-content-type-options": "nosniff",
        "x-frame-options": "deny",
        "x-github-media-type": "github.v3; format=json",
        "x-github-request-id": "F068:774E:CC9BDC:1512A0C:5EC04D44",
        "x-ratelimit-limit": "60",
        "x-ratelimit-remaining": "58",
        "x-ratelimit-reset": "1589664592",
        "x-xss-protection": "1; mode=block"
    },
    "data": [
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
            "assignee": null,
            "assignees": [],
            "milestone": null,
            "comments": 0,
            "created_at": "2020-05-16T18:32:57Z",
            "updated_at": "2020-05-16T18:32:57Z",
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
    ]
}`;