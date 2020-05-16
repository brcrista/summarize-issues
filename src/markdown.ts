import type { Section } from './summarize-issues';

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
    yield h3(`${section.status} ${section.section} ${link('(query)', 'https://github.com')}`); // TODO
    yield `Total: ${section.issues.length}`;
    yield `Threshold: ${section.threshold}`;
    yield `Labels: ${section.labels.map(code).join(', ')}`
    yield '| Owner | Count |';
    yield '| -- | -- |';
    yield `| ${link('PersonA', 'https://github.com')} | {5} |`; // TODO
    yield `| ${link('PersonB', 'https://github.com')} | {5} |`; // TODO
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