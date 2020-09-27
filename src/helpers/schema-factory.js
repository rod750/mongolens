import { schemaComposer } from "graphql-compose"

export function schemaFactory(modelName, ModelTC) {
  const defineFields = (fields, operation) => {
    fields[`${modelName}${operation[0]}`] = ModelTC.getResolver(operation[1], operation[3])
    return fields
  }

  let queryOperations = [
    ["ById", "findById"],
    ["ByIds", "findByIds"],
    ["One", "findOne"],
    ["Many", "findMany"],
    ["Count", "count"],
    ["Connection", "connection"],
    ["Pagination", "pagination"]
  ]

  if(ModelTC.queryOperations)
    queryOperations = queryOperations.concat(ModelTC.queryOperations)

  const queryFields = queryOperations.reduce(defineFields, {})
  schemaComposer.Query.addFields(queryFields);

  let mutationOperations = [
    ["CreateOne", "createOne"],
    ["CreateMany", "createMany"],
    ["UpdateById", "updateById"],
    ["UpdateOne", "updateOne"],
    ["UpdateMany", "updateMany"],
    ["RemoveById", "removeById"],
    ["RemoveOne", "removeOne"],
    ["RemoveMany", "removeMany"]
  ]

  if(ModelTC.mutationOperations)
    mutationOperations = mutationOperations.concat(ModelTC.mutationOperations)

  const mutationFields = mutationOperations.reduce(defineFields, {})
  schemaComposer.Mutation.addFields(mutationFields)

  return schemaComposer
}
