export function fillZeros(string: string, count: number) {
    if (string.length < count) {
        return "0".repeat(count - string.length) + string;
    }
    return string;
}
