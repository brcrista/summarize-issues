import type { Section } from './summarize-issues';

const hardcodedSectionSummary = `
### Summary of Another section
| Section Title | Labels | Threshold | Count | Status |
| -- | -- | -- | -- | -- |
| [Section Title](Link to Section Below) | \`bug\` | 2 | 0 | :green_heart: |
`;

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
        yield hardcodedSectionSummary;
    }
}

export function* generateDetails(sections: Section[]) {
    yield h2('Details');
    for (const section of sections) {
        yield hardcodedSectionDescription;
    }
}

const h2 = (text: string) => `## ${text}`;
const h3 = (text: string) => `### ${text}`;