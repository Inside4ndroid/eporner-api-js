import { categories } from "./Constants.js";

export async function getCategories() {
    try {
        const json = {
            categories: categories
        };
        return json;
    } catch (err) {
        console.error(err);
        return null;
    }
}