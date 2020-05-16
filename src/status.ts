// For accessibility, status emoji should differ by more than just color.
export type Status = '💚🥳' | '💛😬' | '❤️🥵';

export function getStatus(issueCount: number, threshold: number): Status {
    if (issueCount < threshold) {
        return '💚🥳';
    } else if (issueCount === threshold) {
        return '💛😬';
    } else {
        return '❤️🥵';
    }
}