import type { Issue, RepoContext, Section } from './types';

export function* generateSummary(title: string, sections: Section[]) {
    yield h3(title);
    yield h3('Summary');
    yield '| Section Title | Labels | Threshold | Count | Status |';
    yield '| -- | -- | -- | -- | -- |';
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
    const sectionAnchor = '#' + `-${hyphenate(section.section)}-query`;
    yield `| ${link(section.section, sectionAnchor)} | ${section.labels.map(code).join(', ')} | ${section.threshold} | ${section.issues.length} | ${section.status} |`;
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
        const queryUrl = issuesQuery(repoContext, section.labels, key);
        yield `| ${link(key, queryUrl)} | ${owners[key]} |`;
    }
}

// Markdown and HTML helpers -- not the least bit safe for production.
const h2 = (text: string) => `## ${text}`;
const h3 = (text: string) => `### ${text}`;
const link = (text: string, href: string) => `[${text}](${href})`;
const code = (text: string) => `\`${text}\``;

// Useful for converting a header name to an HTML ID in a hacky way
function hyphenate(headerName: string) {
    return headerName.replace(/\s+/g, '-');
}

// Construct a URL like https://github.com/brcrista/summarize-issues-test/issues?q=is%3Aissue+is%3Aopen+label%3Aincident-repair+label%3Ashort-term+
function issuesQuery(repoContext: RepoContext, labels: string[], assignee?: string) {
    // If the label contains a space, the query string needs to have it in quotes.
    labels = labels.map(label => {
        if (label.includes(' ')) {
            return `"${label}"`;
        } else {
            return label;
        }
    });
    const queryInputs = ['is:issue','is:open'].concat(labels.map(label => `label:${label}`));
    if (assignee) {
        queryInputs.push(`assignee:${assignee}`);
    }

    // The `+` signs should not be encoded for the query to work.
    const queryString = queryInputs.map(encodeURIComponent).join('+');
    return `https://github.com/${repoContext.owner}/${repoContext.repo}/issues?q=${queryString}`;
}

// Get a mapping of owner logins to the number of issues they have in this section.
function sumIssuesForOwners(issues: Issue[]) {
    const result: { [owner: string]: number } = {};
    for (const issue of issues) {
        for (const owner of issue.assignees) {
            if (!result[owner.login]) {
                result[owner.login] = 0;
            }
            result[owner.login] += 1
        }
    }

    return result;
}