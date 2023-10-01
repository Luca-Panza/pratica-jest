import { Fruit } from "@prisma/client";
import { FruitInput } from "@/protocols/protocols";
import prisma from "@/database/database";

async function getFruits() {
  const result: Fruit[] = await prisma.fruit.findMany({});
  return result;
}

async function getSpecificFruit(id: number): Promise<Fruit | undefined> {
  const result: Fruit | undefined = await prisma.fruit.findUnique({where:{id}});
  return result;
}

async function getSpecificFruitByName(name: string): Promise<Fruit | undefined> {
  const result: Fruit | undefined = await prisma.fruit.findFirst({where:{name}});
  return result;
}

async function insertFruit(fruit: FruitInput) {
  await prisma.fruit.create({data:fruit});
}

const fruitsRepository = { getFruits, getSpecificFruit, getSpecificFruitByName, insertFruit }

export default fruitsRepository;