import { categories } from "./constants";

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