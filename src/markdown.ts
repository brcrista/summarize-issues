import type { Issue, RepoContext, Section } from './types';

export function* generateSummary(title: string, sections: Section[]) {
    yield h3(title);
    for (const section of sections) {
        yield* sectionSummary(section);
    }
}

export function* generateDetails(sections: Section[], repoContext: RepoContext) {
    yield h2('Details');
    for (const section of sections) {
        yield* sectionDetails(section, repoContext);
    }
}

function* sectionSummary(section: Section) {
    yield h3(`Summary of ${section.section}`);
    yield '| Section Title | Labels | Threshold | Count | Status |';
    yield '| -- | -- | -- | -- | -- |';
    // TODO the link doesn't work
    yield `| ${link(section.section, '#' + hyphenate(section.section))} | ${section.labels.map(code).join(', ')} | ${section.threshold} | ${section.issues.length} | ${section.status} |`;
}

function* sectionDetails(section: Section, repoContext: RepoContext) {
    const owners = sumIssuesForOwners(section.issues);

    yield h3(`${section.status} ${section.section} ${link('(query)', issuesQuery(repoContext, section.labels))}`);
    yield `Total: ${section.issues.length}\n`;
    yield `Threshold: ${section.threshold}\n`;
    yield `Labels: ${section.labels.map(code).join(', ')}\n`
    yield '| Owner | Count |';
    yield '| -- | -- |';

    for (const key of Object.keys(owners)) {
        // `key` is the owner's login
        yield `| ${link(key, owners[key].url)} | ${owners[key].count} |`;
    }
}

// Markdown and HTML helpers -- not the least bit safe for production.
const h2 = (text: string) => `## ${text}`;
const h3 = (text: string) => `### ${text}`;
const link = (text: string, href: string) => `[${text}](${href})`;
const code = (text: string) => `\`${text}\``;

// Useful for converting a header name to an HTML ID in a hacky way
function hyphenate(headerName: string) {
    // Not entirely correct; should replace 1 or more spaces.
    return headerName.replace(' ', '-');
}

// Construct a URL like https://github.com/brcrista/summarize-issues-test/issues?q=is%3Aissue+is%3Aopen+label%3Aincident-repair+label%3Ashort-term+
function issuesQuery(repoContext: RepoContext, labels: string[], assignee?: string) {
    const queryInputs = ['is:issue','is:open'].concat(labels.map(label => `label:${label}`));
    if (assignee) {
        queryInputs.push(`assignee:${assignee}`);
    }

    const queryString = encodeURIComponent(`${queryInputs.join('+')}`);

    return `https://github.com/${repoContext.owner}/${repoContext.repo}/issues?q=${queryString}`;
}

// Get a mapping of owner logins to their URL and the number of issues they have in this section.
// Using `Map` here might be easier, but I'm not sure if it will get owner equality right.
// That is, I don't know if it hashes the keys.
function sumIssuesForOwners(issues: Issue[]) {
    const result: { [owner: string]: { url: string, count: number } } = {};
    for (const issue of issues) {
        for (const owner of issue.assignees) {
            if (!result[owner.login]) {
                result[owner.login] = { url: owner.html_url, count: 0 };
            }
            result[owner.login].count += 1
        }
    }

    return result;
}