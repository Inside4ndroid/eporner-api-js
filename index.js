import express from "express";
import { getVideoDetails } from "./src/eporner.js";
import { port } from "./src/constants.js";

const app = express()

app.get('/', (req, res) => {
    res.status(200).json({
        intro: "Welcome to the unofficial eporner provider: check the provider website @ https://www.eporner.com/ ",
        routes: {
            movie: "/v2/:epornerid"
        },
        author: "This api is developed and created by Inside4ndroid"
    });
});

app.get('/v2/:epornId', async (req, res) => {
    const id = req.params.epornId;

    const getSources = await getVideoDetails(id);
    
    if (getSources === null) {
        res.status(404).send({
            status: 404,
            return: "Oops reached rate limit of this api"
        })
    } else {
        res.status(200).json([getSources]);
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`);
});