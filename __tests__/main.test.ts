import * as path from 'path';
import * as summarizeIssues from '../src/summarize-issues';

test('Run the action end-to-end through its API', () => {
    summarizeIssues.run({
        title: 'test',
        configPath: path.join(__dirname, 'issues-report.json'),
        outputPath: path.join(__dirname, 'result.md')
    });
});