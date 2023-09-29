import { FruitInput } from "services/fruits-service";
import { faker } from '@faker-js/faker';
import { Fruit } from "repositories/fruits-repository";

export function createRandomFruit(): FruitInput{
    const fruit: FruitInput = {
        name: faker.commerce.product(),
        price: Number((Math.random() * (100 - 1) + 1).toFixed(2))
    }
    return fruit;
}