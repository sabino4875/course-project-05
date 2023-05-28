"use strict";
const aws = require("aws-sdk");

const loadItems = async (event) => {
    const dynamodb = new aws.DynamoDB.DocumentClient();
    let items;
    try {
        const results = await dynamodb.scan({
            TableName: "ProductTable"
        }).promise();
        items = results.Items;
    } catch (error) {
        console.log(error)
        return {
            statusCode: 400,
            body: JSON.stringify(error),
        };
    }

    return {
        statusCode: 200,
        body: JSON.stringify(items),
    };
};

module.exports = {
    handler: loadItems,
};
