import v from "voca"

export class Model {
  constructor({ model, tc, name }) {
    this.model = model
    this.tc = tc
    this.name = name
  }

  _addResolver(type, options) {
    if(!["query", "mutation"].includes(type)) {
      throw new Error("Model._addResolver invalid type argument")
    }

    const accessor = `${type}Operations`

    this.tc.addResolver(options)

    const resolverDef = [
      v.capitalize(options.name),
      v.camelCase(options.name)
    ]
    
    if(Array.isArray(this.tc[accessor])) {
      this.tc[accessor].push(resolverDef)
    } else {
      this.tc[accessor] = [resolverDef]
    }
  }

  addQuery(options) {
    this._addResolver("query", options)
    return this
  }

  addMutation(options) {
    this._addResolver("mutation", options)
    return this
  }
}
