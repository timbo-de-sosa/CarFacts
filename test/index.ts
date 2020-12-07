import 'mocha';
import fetch from "node-fetch";
import { expect } from 'chai';
import { testData } from "./testData";

const baseUrl = `http://localhost:8080/cars`


describe('API Tests', () => {
    it('should get all cars', async () => {
        const result = await getAllCars();
        expect(result.status).equals(200, `Expected 200 but received ${result.status}`);
        expect(Array.isArray(result.body)).equals(true)
        expect(result.body.length).equals(testData.length);
        expect(result.body[0].id).equals(testData[0].id);
        // in a real situation I'd test the rest of the response format here
    });

    it('should return 404 with message when getting nonexistent car', async () => {
        const result = await getSingleCar('fakeCar');
        expect(result.status).equals(404, `Expected 404 but received ${result.status}`);
        expect(result.body.error).to.be.ok;
    });

    it('should return 200 and data when getting car that exists', async () => {
        const expectedId = testData[0].id;
        const result = await getSingleCar(expectedId);
        expect(result.status).equals(200, `Expected 200 but received ${result.status}`);
        expect(result.body.id).equals(expectedId)
        expect(result.body.make).equals(testData[0].make);
        // in a real situation I'd test the rest of the response format here
    });

    it('should not allow sql injection', async () => {
        const result = await getSingleCar(`abc'; DROP TABLE cars;`);
        expect(result.status).equals(404, `Expected 404 but received ${result.status}`);
        expect(result.body.error).to.be.ok;

        // make sure you can still get data from a table that has not been dropped
        const secondResult = await getAllCars();
        expect(secondResult.status).equals(200, `Expected 200 but received ${result.status}`);
        expect(Array.isArray(secondResult.body)).equals(true)
        expect(secondResult.body.length).equals(testData.length);
    });
});

interface ApiTestResponse {
    status: number,
    body: any
}

async function getSingleCar(id: string): Promise<ApiTestResponse> {
    return performTestRequest(`${baseUrl}/${id}`);
}

async function getAllCars(): Promise<ApiTestResponse> {
    return performTestRequest(`${baseUrl}`);
}

async function performTestRequest(url: string): Promise<ApiTestResponse> {
    const response = await fetch(url);
    const status = response.status;
    const body = await response.json();
    return {
        status,
        body
    }
}