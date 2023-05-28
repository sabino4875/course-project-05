"use strict";

const aws = require("aws-sdk")

const updateItem = async (event) => {
  const {itemStatus} = JSON.parse(event.body);
  const {id} = event.pathParameters
  const dynamodb = new aws.DynamoDB.DocumentClient();

  await dynamodb.update({
    TableName: "ProductTable",
    Key: {id},
    UpdateExpression: 'set itemStatus = :itemStatus',
    ExpressionAttributeValues: {
      ':itemStatus': itemStatus
    },
    ReturnValues: "ALL_NEW"
  }).promise()

  return {
    statusCode: 200,
    body: JSON.stringify(
      { msg: 'Item atualizado com sucesso.'}
    ),
  };
};


module.exports = {
    handler:updateItem
}


