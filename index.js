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
            video_details: "/api/?id=:epornerid",
            categoty_list: "/api/cats",
            video_source_links: "/api/resolve/?resolve=:epornerid",
            video_details_and_sources: "/api/full/?id=:epornerid"
        },
        author: "This api is developed and created by Inside4ndroid"
    });
});

app.get('/api/', async (req, res) => {

    const id = req.query.id || null;
    const thumbsize = req.query.thumbsize || 'medium';
    const resolve = req.query.resolve || null;

    const query = req.query.query || null;
    const per_page = req.query.per_page || '30';
    const page = req.query.page || '1';
    const order = req.query.order || 'latest';
    const gay = req.query.gay || '0';
    const lq = req.query.lq || '1';

    if (id) {
        const getDetails = await getVideoDetails(id, thumbsize);
        if (getDetails === null) {
            res.status(404).send({
                status: 404,
                return: "Oops reached rate limit of this api"
            });
        } else {
            res.status(200).json([getDetails]);
        }
    }

    if (resolve) {
        const getSources = await getVideoSources(resolve);
        if (getSources === null) {
            res.status(404).send({
                status: 404,
                return: "Oops reached rate limit of this api"
            });
        } else {
            res.status(200).json([getSources]);
        }
    }

    if(query) {
        const getResults = await getSearchResults(query, per_page, page, thumbsize, order, gay, lq);
        if(getResults === null) {
            res.status(404).send({
                status: 404,
                return: "Oops reached rate limit of this api"
            });
        } else {
            res.status(200).json([getResults]);
        }
    }
});

app.get('/api/full/', async (req, res) => {
    const id = req.query.id || null;
    const thumbsize = req.query.thumbsize || 'medium';

    const getDetails = await getVideoDetails(id, thumbsize);
    const getSources = await getVideoSources(id);

    if (getDetails === null || getSources === null) {
        res.status(404).send({
            status: 404,
            return: "Oops reached rate limit of this api"
        });
    } else {
        const mergedResponse = {
            details: getDetails,
            sources: getSources
        };
        res.status(200).json(mergedResponse);
    }


});

app.get('/api/cats', async (req, res) => {
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