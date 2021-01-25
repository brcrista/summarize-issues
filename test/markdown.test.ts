import * as markdown from '../src/markdown';
import type { Issue, Section } from '../src/types';

describe('The details section', () => {
    test('is empty when there are no sections', () => {
        const details = Array.from(markdown.generateDetails([], { owner: 'test', repo: 'repo' }));

        expect(details).toStrictEqual(['## Details']);
    });

    test('has an empty table when there are no issues', () => {
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

    test('creates query correctly', () => {
        const sections: Section[] = [{
            section: "Enhancements",
            labels: ['enhancement', 'priority'],
            threshold: 1,
            issues: [],
            status: '💚🥳'
        }];

        const details = Array.from(markdown.generateDetails(sections, { owner: 'test', repo: 'repo' }));

        expect(details).toStrictEqual([
            '## Details',
            '### 💚🥳 Enhancements [(query)](https://github.com/test/repo/issues?q=is%3Aissue+is%3Aopen+label%3Aenhancement+label%3Apriority)',
            'Total: 0\n',
            'Threshold: 1\n',
            'Labels: `enhancement`, `priority`\n',
            '| Owner | Count |',
            '| -- | -- |'
        ]);
    });

    test('creates excludeLabels query and details correctly', () => {
        const sections: Section[] = [{
            section: "Non-reliability bugs",
            labels: ['bug'],
            excludeLabels: ['reliability'],
            threshold: 1,
            issues: [],
            status: '💚🥳'
        }];

        const details = Array.from(markdown.generateDetails(sections, { owner: 'test', repo: 'repo' }));

        expect(details).toStrictEqual([
            '## Details',
            '### 💚🥳 Non-reliability bugs [(query)](https://github.com/test/repo/issues?q=is%3Aissue+is%3Aopen+label%3Abug+-label%3Areliability)',
            'Total: 0\n',
            'Threshold: 1\n',
            'Labels: `bug`, ~`reliability`~\n',
            '| Owner | Count |',
            '| -- | -- |'
        ]);
    });

    test('creates the owner table correctly', () => {
        const sections: Section[] = [{
            section: "Bugs",
            labels: ['bug'],
            threshold: 3,
            issues: <Issue[]>[
                {
                    assignees: []
                },
                {
                    assignees: [{ login: 'user1' }]
                },
                // Give user2 more issues than user1 to test that the table is sorted in descending order and not FIFO
                {
                   assignees: [{ login: 'user2' }]
                },
                {
                    assignees: [{ login: 'user2' }]
                },
                {
                    assignees: [{ login: 'user1' }, { login: 'user2' }]
                }
            ],
            status: '❤️🥵'
        }];

        const details = Array.from(markdown.generateDetails(sections, { owner: 'test', repo: 'repo' }));

        expect(details).toStrictEqual([
            '## Details',
            '### ❤️🥵 Bugs [(query)](https://github.com/test/repo/issues?q=is%3Aissue+is%3Aopen+label%3Abug)',
            'Total: 5\n',
            'Threshold: 3\n',
            'Labels: `bug`\n',
            '| Owner | Count |',
            '| -- | -- |',
            '| [user2](https://github.com/test/repo/issues?q=is%3Aissue+is%3Aopen+label%3Abug+assignee%3Auser2) | 3 |',
            '| [user1](https://github.com/test/repo/issues?q=is%3Aissue+is%3Aopen+label%3Abug+assignee%3Auser1) | 2 |',
            "| [**Unassigned**](https://github.com/test/repo/issues?q=is%3Aissue+is%3Aopen+label%3Abug+no%3Aassignee) | 1 |",
        ]);
    });
});