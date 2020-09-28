import { ApolloServer } from "apollo-server"
import { schemaFactory } from "./helpers/schema-factory"
import mongoose from "mongoose"

export class Mongolens {
  constructor({
    uris,
    mongooseOptions,
    schemaDefs,
    apolloOptions,
    createHandler
  }) {
    this._uris = uris
    this._mongooseOptions = mongooseOptions
    this._schemaDefs = schemaDefs
    this._apolloOptions = apolloOptions
    this._createHandler = createHandler

    if(uris) {
      this.connect()
    }
  }

  async connect() {
    try {
      console.info("Establishing connection to database...")
      await mongoose.connect(
        this._uris, 
        this._mongooseOptions
      )
      console.info("Connected to database.")
    }
    catch(e) {
      console.error(e)
    }
  }

  createHandler() {
    const schema = Object
      .keys(this._schemaDefs)
      .reduce((schemaBuilder, key) => {
        const schemaDef = this._schemaDefs[key]
        return schemaFactory(schemaDef.name, schemaDef.tc)
      }, {})

    if(typeof this._createHandler === "function") {
      return this._createHandler(schema)
    }

    return new ApolloServer({
      schema: schema.buildSchema()
    });
  }
}
