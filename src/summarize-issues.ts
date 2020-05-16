import * as fs from 'fs';

import * as markdown from './markdown';

export interface Inputs {
    title: string,
    outputPath: string,
    configPath: string
}

export interface Section {
    section: string,
    labels: string[],
    threshold: number
}

export function run(inputs: Inputs) {
    console.log(`Reading the config file at ${inputs.configPath} ...`);
    const config = fs.readFileSync(inputs.configPath, 'utf8');
    const sections = JSON.parse(config);

    console.log('Generating the report Markdown ...');
    const report = generateReport(inputs.title, sections);

    console.log(`Writing the Markdown to ${inputs.outputPath} ...`);
    // Write the Markdown to the output file
    fs.writeFileSync(inputs.outputPath, report, 'utf8');

    console.log('Done!');
}

function generateReport(title: string, sections: Section[]): string {
    let result = '';
    for (const line of markdown.generateSummary(title, sections)) {
        result += line;
        result += '\n';
    }

    for (const line of markdown.generateDetails(sections)) {
        result += line;
        result += '\n';
    }

    return result;
}