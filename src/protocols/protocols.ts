import { Fruit } from "@prisma/client";

export type FruitInput = Omit<Fruit, "id">;