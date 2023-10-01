import { faker } from '@faker-js/faker';
import { Fruit } from "@prisma/client";
import { FruitInput } from "@/protocols/protocols";

export function createRandomFruit(): FruitInput{
    const fruit: FruitInput = {
        name: faker.commerce.product(),
        price: Number((Math.random() * (100 - 1) + 1).toFixed(2))
    }
    return fruit;
}

export function createQueryParamsTest(){
    return faker.animal.type();
}