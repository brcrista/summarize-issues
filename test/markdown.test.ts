import * as markdown from '../src/markdown';
import type { Section } from '../src/types';

test('Generate empty details', () => {
    const details = Array.from(markdown.generateDetails([], { owner: 'test', repo: 'repo' }));
    console.log(details);

    expect(details.length).toEqual(1);
    expect(details[0]).toEqual('## Details');
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
    console.log(details);

    expect(details.length).toEqual(7);
    expect(details[0]).toEqual('## Details');
    expect(details[1]).toEqual('### 💚🥳 Empty section [(query)](https://github.com/test/repo/issues?q=is%3Aissue+is%3Aopen)');
    expect(details[2]).toEqual('Total: 0\n');
    expect(details[3]).toEqual('Threshold: 1\n');
    expect(details[4]).toEqual('Labels: \n');
    expect(details[5]).toEqual('| Owner | Count |');
    expect(details[6]).toEqual('| -- | -- |');
});