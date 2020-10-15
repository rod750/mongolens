import mongoose from "mongoose"
import { composeWithMongoose } from "graphql-compose-mongoose"
import { Model } from "../classes/model"

export function modelFactory(name, schema, options) {
  const modelSchema = new mongoose.Schema(schema, options)

  const model = mongoose.model(name, modelSchema)
  const modelTC = composeWithMongoose(model, {})

  return new Model({
    model: model,
    tc: modelTC,
    name: name
  })
}
