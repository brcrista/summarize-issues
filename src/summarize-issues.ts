import * as fs from 'fs';

import * as markdown from './markdown';
import * as status from './status';

export interface Inputs {
    title: string,
    configPath: string,
    outputPath: string
}

// What comes out of the config file
interface ConfigSection {
    section: string,
    labels: string[],
    threshold: number
}

// What comes out of the config file plus whatever else we need to write the report
export type Section = ConfigSection & {
    issues: any[], // TODO
    status: status.Status
}

export function run(inputs: Inputs) {
    console.log(`Reading the config file at ${inputs.configPath} ...`);
    const config = fs.readFileSync(inputs.configPath, 'utf8');
    const configSections: ConfigSection[] = JSON.parse(config);

    console.log('Querying for issues ...');
    const sections = [];
    for (const configSection of configSections) {
        const issues = ['hello']; // TODO
        sections.push({
            ...configSection,
            issues,
            status: status.getStatus(issues.length, configSection.threshold)
        }); 
    };

    console.log('Generating the report Markdown ...');
    const report = generateReport(inputs.title, sections);

    console.log(`Writing the Markdown to ${inputs.outputPath} ...`);
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