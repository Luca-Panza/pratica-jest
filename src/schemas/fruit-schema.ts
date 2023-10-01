import joi from "joi";
import { FruitInput } from "@/protocols/protocols";

export const fruitSchema = joi.object<FruitInput>({
  name: joi.string().required(),
  price: joi.number().required()
});
