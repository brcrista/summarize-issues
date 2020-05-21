/** Join zero or more iterables into a single iterable. */
export function* chain<T>(...iterables: Array<Iterable<T>>) {
    for (const it of iterables) {
        yield* it;
    }
}