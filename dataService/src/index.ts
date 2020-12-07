import dotenv from "dotenv";
import express from "express";
import pgPromise from "pg-promise";

dotenv.config();

const serverPort = process.env.DATA_SERVICE_PORT;
const dbPort = parseInt(process.env.POSTGRES_PORT, 10);
const config = {
    database: process.env.POSTGRES_DB,
    host: process.env.POSTGRES_HOST,
    dbPort,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD
};

const pgp = pgPromise();
const db = pgp(config);
const app = express();

app.get(`/api/cars`, async (req: any, res) => {
    // in a real project, I wouldn't keep this SQL in the controller like this
    // but I thought I'd keep it here so you could see everything in one place
    try {
        const cars = await db.any(`
            SELECT
                id, 
                make, 
                model,
                package,
                color,
                year,
                category,
                mileage,
                price
            FROM cars` );
        return res.json(cars);
    } catch (err) {
        res.status(500).json({ error: err.message || err });
    }
});

app.get(`/api/cars/:id`, async (req: any, res) => {
    const id = req.params.id;
    try {
        const car = await db.oneOrNone(`
            SELECT
                id,
                make,
                model,
                package,
                color,
                year,
                category,
                mileage,
                price
            FROM cars
            WHERE id = $[id] LIMIT 1`, { id } );
        if (!car) {
            return (res.status(404).json({ error: `${id} not found` }))
        }
        return res.json(car);
    } catch (err) {
        res.status(500).json({ error: err.message || err });
    }
});

app.listen(serverPort, () => {
    // tslint:disable-next-line:no-console
    console.log(`server started at http://dataservice:${serverPort}`);
});