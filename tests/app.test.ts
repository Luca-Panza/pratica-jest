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

        const { status } = await api.post("/fruits").send(body);

        expect(status).toBe(201);
    });

    it("should return 409 when inserting a fruit that is already registered", async ()=>{
        const body = createRandomFruit();
        fruits.push({id:10000,...body});

        const { status } = await api.post("/fruits").send(body);

        expect(status).toBe(409);
    });

    it("should return 422 when inserting a fruit with data missing",async ()=>{
        const { status } = await api.post("/fruits");

        expect(status).toBe(422);
    });
});

describe("GET /fruits", () => {
    it("shoud return 404 when trying to get a fruit by an id that doesn't exist", async ()=>{
        const queryParams = 99999;

        const { status } = await api.get(`/fruits/${queryParams}`);

        expect(status).toBe(404);
    });

    it("should return 400 when id param is present but not valid", async ()=>{
        const queryParams = "test";

        const { status } = await api.get(`/fruits/${queryParams}`);

        expect(status).toBe(400);
    });

    it("should return one fruit when given a valid and existing id", async ()=>{
        const fruit = createRandomFruit();
        fruits.push({id:10001,...fruit});

        const { body } = await api.get(`/fruits/10001`);

        expect(body).toEqual(
            expect.objectContaining({
              id: expect.any(Number),
              name: expect.any(String),
              price: expect.any(Number)
            }));
    });

    it("should return all fruits if no id is present", async ()=>{
        const { body } = await api.get("/fruits");

          expect(body).toEqual(
              expect.arrayContaining([
                  expect.objectContaining({
                    id: expect.any(Number),
                    name: expect.any(String),
                    price: expect.any(Number)
                  })
              ])
          )
      });
    });

