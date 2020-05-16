interface Inputs {
    title: string,
    outputPath: string,
    configPath: string
}

export function summarizeIssues(inputs: Inputs) {
    console.log(JSON.stringify(inputs));
}