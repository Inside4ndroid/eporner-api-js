import { detailsBase } from "./constants.js";

export async function getVideoUrl(embed) {
    try {
        const response = await fetch(embed);
        const html = await response.text();

        const pattern = /vid\s*=\s*'([^']+)';\s*[\w*\.]+hash\s*=\s*["\']([\da-f]{32})/;
        const match = html.match(pattern);

        if (match && match.length === 3) {
            const id = match[1];
            const hash = match[2];

            const hash_code = Array.from({ length: 4 }, (_, i) => {
                const part = hash.slice(i * 8, (i + 1) * 8);
                return parseInt(part, 16).toString(36);
            }).join('');

            const load_url = `https://www.eporner.com/xhr/video/${id}?hash=${hash_code}&device=generic&domain=www.eporner.com&fallback=false&embed=false&supportedFormats=mp4`;

            const getjson = await fetch(load_url);

            const data = await getjson.json();

            const sources = data.sources

            return sources;
        } else {
            console.error('Pattern not found in HTML');
            return null;
        }
    } catch (err) {
        console.error(err);
        return null;
    }
}

export async function getVideoDetails(epornId) {
    try {
        const url = detailsBase + epornId;

        const response = await fetch(url);
        const data = await response.json();

        const sources = await getVideoUrl(data.embed);

        delete data.url;
        delete data.embed;

        const json = {
            details: data,
            sources: sources
        };
        return { json };
    } catch (err) {
        console.error(err);
        return null;
    }


}