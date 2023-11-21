const AWS = require('aws-sdk');
require('dotenv').config();

AWS.config.update({
    region: process.env.AWS_DEFAULT_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const dynamoClient = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});
const ddb = new AWS.DynamoDB({ apiVersion: "2012-08-10" });

const TABLE_USERS = "crud-api-users";

const listTables = () => {
    ddb.listTables({ Limit:10 }, function(err, data) {
        if (err) {
            console.log("Error", err.code);
        } else {
            console.log("Tables names are ", data.TableNames);
        }
    });
};

const addUser = async (user) => {
    const params = {
        TableName: TABLE_USERS,
        Item: user
    };
    return await dynamoClient.put(params).promise();
};

module.exports = {
    listTables,
    addUser
};