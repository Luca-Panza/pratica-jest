import app from "app";
import supertest from "supertest";
import httpStatus from "http-status";
import prisma from "@/database/database";
import { Fruit } from "@prisma/client";
import { FruitInput } from "@/protocols/protocols";
import { createRandomFruit, createQueryParamsTest } from "./factories/fruit-factory";

const api = supertest(app);

beforeEach(async () => {
    await prisma.fruit.deleteMany();
  });

describe("GET /health", () => {
    it("when the api is running should respond with status 200", async () => {
      const { status } = await api.get("/health");

      expect(status).toBe(httpStatus.OK);
    });
});

describe("POST /fruits", () => {
    it("should return 201 when inserting a fruit", async ()=>{
        const body = createRandomFruit();

        const { status } = await api.post("/fruits").send(body);

        expect(status).toBe(httpStatus.CREATED);
    });

    it("should return 409 when inserting a fruit that is already registered", async ()=>{
        const body = createRandomFruit();
        
        await prisma.fruit.create({data:body});

        const { status } = await api.post("/fruits").send(body);

        expect(status).toBe(httpStatus.CONFLICT);
    });

    it("should return 422 when inserting a fruit with data missing",async ()=>{
        const { status } = await api.post("/fruits");

        expect(status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
    });
});

describe("GET /fruits", () => {
    it("shoud return 404 when trying to get a fruit by an id that doesn't exist", async ()=>{
        const body = createRandomFruit();        
        const fruit: Fruit = await prisma.fruit.create({data:body});

        await prisma.fruit.delete({where:{id: fruit.id}});

        const { status } = await api.get(`/fruits/${fruit.id}`);

        expect(status).toBe(httpStatus.NOT_FOUND);
    });

    it("should return 400 when id param is present but not valid", async ()=>{
        const queryParams = createQueryParamsTest();

        const { status } = await api.get(`/fruits/${queryParams}`);

        expect(status).toBe(httpStatus.BAD_REQUEST);
    });

    it("should return one fruit when given a valid and existing id", async ()=>{
        const createFruit = createRandomFruit();        
        const fruit: Fruit = await prisma.fruit.create({data:createFruit});

        const { body } = await api.get(`/fruits/${fruit.id}`);

        expect(body).toEqual(
            expect.objectContaining({
              id: expect.any(Number),
              name: expect.any(String),
              price: expect.any(Number)
        }));
    });

    it("should return all fruits if no id is present", async ()=>{
        const createFruit1 = createRandomFruit();        
        await prisma.fruit.create({data:createFruit1});
        
        const createFruit2 = createRandomFruit();        
        await prisma.fruit.create({data:createFruit2});

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

