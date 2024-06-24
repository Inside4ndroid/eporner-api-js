import { detailsBase } from "./Constants.js";

export async function getVideoDetails(epornId) {
    try {
        const url = detailsBase + epornId;

        const response = await fetch(url);
        const data = await response.json();

        delete data.url;
        delete data.embed;

        const json = {
            details: data
        };
        return { json };
    } catch (err) {
        console.error(err);
        return null;
    }
}