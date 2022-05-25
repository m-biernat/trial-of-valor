export function roll(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const parser = new DOMParser();

export function parseHTML(str) {
    return parser.parseFromString(str, "text/html").body;
}
