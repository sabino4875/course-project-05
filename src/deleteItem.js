"use strict";
const aws = require("aws-sdk");

const deleteItem = async (event) => {
    const dynamodb = new aws.DynamoDB.DocumentClient();
    const {id} = event.pathParameters
    let item;

    try {
        const result = await dynamodb.delete({
            TableName: "TableItems",
            Key: {id}
        }).promise();
    } catch (error) {
        console.log(error)
        return {
            statusCode: 400,
            body: JSON.stringify(error),
        };
    }

    return {
        statusCode: 200,
        body: JSON.stringify({'message':'Registro excluído com sucesso.'}),
    };
};

module.exports = {
    handler: deleteItem,
};
