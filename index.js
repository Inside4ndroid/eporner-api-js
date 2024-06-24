import express from "express";
import { getVideoDetails } from "./src/MediaDetails.js";
import { port } from "./src/Constants.js";
import { getCategories } from "./src/Categories.js";
import { getVideoSources } from "./src/Resolver.js";

const app = express()

app.get('/', (req, res) => {
    res.status(200).json({
        intro: "Welcome to the unofficial eporner provider: check the provider website @ https://www.eporner.com/ ",
        routes: {
            video_details: "/v2/:epornerid",
            categoty_list: "/v2/cats",
            video_source_links: "/v2/resolve/:epornerid"
        },
        author: "This api is developed and created by Inside4ndroid"
    });
});

app.get('/v2/:epornId', async (req, res) => {
    const id = req.params.epornId;

    if (id === 'cats') {
        const getCats = await getCategories();

        if (getCats === null) {
            res.status(404).send({
                status: 404,
                return: "Oops reached rate limit of this api"
            });
        } else {
            res.status(200).json(getCats);
        }
    } else {
        const getDetails = await getVideoDetails(id);

        if (getDetails === null) {
            res.status(404).send({
                status: 404,
                return: "Oops reached rate limit of this api"
            });
        } else {
            res.status(200).json([getDetails]);
        }
    }
});

app.get('/v2/resolve/:epornId', async (req, res) => {
    const id = req.params.epornId;

    const getSources = await getVideoSources(id);

    if (getSources === null) {
        res.status(404).send({
            status: 404,
            return: "Oops reached rate limit of this api"
        });
    } else {
        res.status(200).json([getSources]);
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`);
});