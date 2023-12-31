import { fillZeros } from "./fill-zeros";

export function generateBikeId() {
    return `${fillZeros(Math.floor(Math.random() * 1000).toString(), 3)}-${fillZeros(
        Math.floor(Math.random() * 1000).toString(),
        3
    )}-${Date.now() % 100000}`;
}
