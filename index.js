import express from "express";
import { getVideoDetails } from "./src/MediaDetails.js";
import { port } from "./src/Constants.js";
import { getCategories } from "./src/Categories.js";
import { getVideoSources } from "./src/Resolver.js";
import { getSearchResults } from "./src/Search.js";

const app = express()

app.get('/', (req, res) => {
    res.status(200).json({
        intro: "Welcome to the unofficial eporner provider: check the provider website @ https://www.eporner.com/ ",
        routes: {
            video_details: "/api/:epornerid",
            categoty_list: "/api/cats",
            video_source_links: "/api/resolve/:epornerid"
        },
        author: "This api is developed and created by Inside4ndroid"
    });
});

app.get('/api/', async (req, res) => {

    // http://localhost:3000/api/?id=IsabYDAiqXa&thumbsize=big
    // http://localhost:3000/api/?resolve=IsabYDAiqXa

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