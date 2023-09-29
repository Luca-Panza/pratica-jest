import app from "app";
import fruits from "data/fruits";
import supertest from "supertest";
import { createRandomFruit } from "./factories/fruit.factory";
import { Fruit } from "repositories/fruits-repository";

const api = supertest(app);

describe("GET /health", () => {
    it("when the api is running should respond with status 200", async () => {
      const {status} = await api.get("/health");
      expect(status).toBe(200);
    });
});

describe("POST /fruits", () => {
    it("should return 201 when inserting a fruit", async ()=>{
        const body = createRandomFruit();
        const {status} = await api.post("/fruits").send(body);
        expect(status).toBe(201);
    });
    it("should return 409 when inserting a fruit that is already registered", async ()=>{
        const body = createRandomFruit();
        fruits.push({id:10000,...body});
        const {status} = await api.post("/fruits").send(body);
        expect(status).toBe(409);
    });
    it("should return 422 when inserting a fruit with data missing",async ()=>{
        const {status} = await api.post("/fruits");
        expect(status).toBe(422);
    });
});



