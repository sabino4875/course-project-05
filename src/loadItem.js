"use strict";
const aws = require("aws-sdk");

const loadItem = async (event) => {
    const dynamodb = new aws.DynamoDB.DocumentClient();
    const {id} = event.pathParameters
    let item;

    try {
        const result = await dynamodb.get({
            TableName: "ProductTable",
            Key: {id}
        }).promise();
        item = result.Item;
    } catch (error) {
        console.log(error)
        return {
            statusCode: 400,
            body: JSON.stringify(error),
        };
    }

    return {
        statusCode: 200,
        body: JSON.stringify(item),
    };
};

module.exports = {
    handler: loadItem,
};
