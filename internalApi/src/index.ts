import dotenv from "dotenv";
import express from "express";
import fetch from "node-fetch";

dotenv.config();

const serverPort = process.env.API_PORT;
const app = express();

app.get(`/cars`, async (req: any, res) => {
    try {
        const response = await fetch('http://dataservice:8081/api/cars');
        const cars = await response.json();
        return res.json(cars);
    } catch (err) {
        res.status(500).json({ error: err.message || err });
    }
});

app.get(`/cars/:id`, async (req: any, res) => {
    const id = req.params.id;
    try {
        const response = await fetch(`http://dataservice:8081/api/cars/${id}`);
        if (response.status !== 200) {
            const errorResponse = await response.json();
            return res.status(response.status).json(errorResponse);
        }
        const car = await response.json();
        return res.json(car);
    } catch (err) {
        res.status(500).json({ error: err.message || err });
    }
});

app.listen(serverPort, () => {
    // tslint:disable-next-line:no-console
    console.log(`server started at http://localhost:${serverPort}`);
});