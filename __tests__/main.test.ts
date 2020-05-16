import * as cp from 'child_process';
import * as path from 'path';

// test('throws invalid number', async () => {
//   const input = parseInt('foo', 10);
//   await expect(wait(input)).rejects.toThrow('milliseconds not a number');
// })

// test('wait 500 ms', async () => {
//   const start = new Date()
//   await wait(500)
//   const end = new Date()
//   var delta = Math.abs(end.getTime() - start.getTime())
//   expect(delta).toBeGreaterThan(450)
// })

test('Run the action end-to-end', () => {
    process.env['INPUT_TITLE'] = 'My Issues Report';
    process.env['INPUT_OUTPUTPATH'] = 'IssuesReport.md';
    process.env['INPUT_CONFIGPATH'] = 'issues-report.json';

    const entryPoint = path.join(__dirname, '..', 'lib', 'main.js');
    const options = {
        env: process.env
    };

    console.log(cp.execSync(`node ${entryPoint}`, options).toString());
});