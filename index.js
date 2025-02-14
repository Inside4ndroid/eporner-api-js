import express from "express";
import { getVideoDetails } from "./src/MediaDetails.js";
import { port } from "./src/constants.js";
import { getCategories } from "./src/Categories.js";
import { getVideoSources } from "./src/Resolver.js";
import { getSearchResults } from "./src/Search.js";

const app = express()

app.get('/', (req, res) => {
    res.status(200).json({
        intro: "Welcome to the unofficial eporner provider: check the provider website @ https://www.eporner.com/ ",
        routes: {
            categoty_list: "/api/cats",
            video_details_and_sources: "/api/full/?id=:epornerid",
            search: "/search/:query"
        },
        author: "This api is developed and created by Inside4ndroid"
    });
});

app.get('/details/:id', async (req, res) => {
    const id = req.params.id || null;
    const thumbsize = 'medium';

    const getDetails = await getVideoDetails(id, thumbsize);
    const getSources = await getVideoSources(id);

    if (getDetails === null || getSources === null) {
        res.status(404).send({
            status: 404,
            return: "Oops reached rate limit of this api"
        });
    } else {
        getDetails.json.details.sources = getSources.sources;
        res.status(200).json(getDetails);
    }
});

app.get('/search/:query', async (req, res) => {
    const query = req.params.query
    const getResults = await getSearchResults(query, '30', '1', 'medium', 'latest', '0', '1');
        if(getResults === null) {
            res.status(404).send({
                status: 404,
                return: "Oops reached rate limit of this api"
            });
        } else {
            res.status(200).json([getResults]);
        }
});

app.get('/cats/', async (req, res) => {
    const getCats = await getCategories();
    if (getCats === null) {
        res.status(404).send({
            status: 404,
            return: "Oops reached rate limit of this api"
        });
    } else {
        res.status(200).json(getCats);
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`);
});