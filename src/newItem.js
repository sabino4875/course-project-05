"use strict";

const {v4: nid} = require("uuid");
const aws = require("aws-sdk")

const newItem = async (event) => {
    const item = JSON.parse(event.body);
    const createdAt = new Date().toISOString();
    const id = nid()
    
    const dynamodb = new aws.DynamoDB.DocumentClient();
    
    const newItem = {
        id,
        item,
        createdAt,
        itemStatus: false
    }
    
    await dynamodb.put({
        TableName: "ProductTable",
        Item: newItem
    }).promise()
    
    return {
        statusCode: 200,
        body: JSON.stringify(newItem),
    };
};
    
    
module.exports = {
    handler:newItem
}
        