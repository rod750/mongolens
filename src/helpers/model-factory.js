import mongoose from "mongoose"
import { composeWithMongoose } from "graphql-compose-mongoose"

export function modelFactory(name, schema, options) {
  const modelSchema = new mongoose.Schema(schema, options)

  const model = mongoose.model(name, modelSchema)
  const modelTC = composeWithMongoose(model, {})

  return {
    model: model,
    tc: modelTC,
    name: name
  }
}
