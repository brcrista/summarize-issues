import type { Octokit } from '@octokit/rest';

import type { Status } from './status';

// The type of `context` from `@actions/github`
export interface RepoContext { owner: string, repo: string }

export type Issue = Octokit.IssuesListForRepoResponseItem;

// What comes out of the config file
export interface ConfigSection {
    section: string,
    labels: string[],
    threshold: number
}

// What comes out of the config file plus whatever else we need to write the report
export type Section = ConfigSection & {
    issues: Issue[],
    status: Status
}