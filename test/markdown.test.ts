import * as markdown from '../src/markdown';
import type { Section } from '../src/types';

test('Generate empty details', () => {
    const details = Array.from(markdown.generateDetails([], { owner: 'test', repo: 'repo' }));

    expect(details).toStrictEqual(['## Details']);
});

test('Generate details for a section with no issues', () => {
    const sections: Section[] = [{
        section: "Empty section",
        labels: [],
        threshold: 1,
        issues: [],
        status: '💚🥳'
    }];

    const details = Array.from(markdown.generateDetails(sections, { owner: 'test', repo: 'repo' }));

    expect(details).toStrictEqual([
        '## Details',
        '### 💚🥳 Empty section [(query)](https://github.com/test/repo/issues?q=is%3Aissue+is%3Aopen)',
        'Total: 0\n',
        'Threshold: 1\n',
        'Labels: \n',
        '| Owner | Count |',
        '| -- | -- |'
    ]);
});