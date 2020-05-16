import type { Issue, Section } from './types';

export function* generateSummary(title: string, sections: Section[]) {
    yield h3(title);
    for (const section of sections) {
        yield* sectionSummary(section);
    }
}

export function* generateDetails(sections: Section[]) {
    yield h2('Details');
    for (const section of sections) {
        yield* sectionDetails(section);
    }
}

function* sectionSummary(section: Section) {
    yield h3(`Summary of ${section.section}`);
    yield '| Section Title | Labels | Threshold | Count | Status |';
    yield '| -- | -- | -- | -- | -- |';
    // TODO the link doesn't work
    yield `| ${link(section.section, '#' + hyphenate(section.section))} | ${section.labels.map(code).join(', ')} | ${section.threshold} | ${section.issues.length} | ${section.status} |`;
}

function* sectionDetails(section: Section) {
    const owners = sumIssuesForOwners(section.issues);

    yield h3(`${section.status} ${section.section} ${link('(query)', 'https://github.com')}`); // TODO
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