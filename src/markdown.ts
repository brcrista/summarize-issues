import type { Section } from './summarize-issues';

const hardcodedSectionDescription = `
## Details
### :green_heart: Repair items [Link to Query](Link)
Total : 5
Threshold : 10
Labels : \`incident-repair\`, \`short-term\`
| Owner | Count |
| -- | -- |
| [PersonA](Link) | 5 |
| [PersonB](Link) | 5 |
`

export function* generateSummary(title: string, sections: Section[]) {
    yield h3(title);
    for (const section of sections) {
        const issueCount = 5; // TODO
        yield* sectionSummary(section, issueCount);
    }
}

export function* generateDetails(sections: Section[]) {
    yield h2('Details');
    for (const section of sections) {
        yield hardcodedSectionDescription;
    }
}

function* sectionSummary(section: Section, issueCount: number) {
    yield h3(`Summary of ${section.section}`);
    yield '| Section Title | Labels | Threshold | Count | Status |';
    yield '| -- | -- | -- | -- | -- |';
    yield `| ${link(section.section, toHref(section.section))} | ${section.labels.map(code).join(', ')} | ${section.threshold} | ${issueCount} | ${status(issueCount, section.threshold)} |`;
}

const h2 = (text: string) => `## ${text}`;
const h3 = (text: string) => `### ${text}`;
const link = (text: string, href: string) => `[${text}](${href})`;
const code = (text: string) => `\`${text}\``;

function toHref(headerName: string) {
    // This isn't completely correct; can adjust if needed in practice.
    return '#' + headerName.replace(' ', '-');
}

function status(issueCount: number, threshold: number) {
    // For accessibility, status emoji should differ by more than just color.
    if (issueCount < threshold) {
        return '💚🥳';
    } else if (issueCount == threshold) {
        return '💛😬';
    } else {
        return '❤️🥵';
    }
}