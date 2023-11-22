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

const listTables = async (req, res) => {
    try {
        const tables = await ddb.listTables({ Limit: 10 }).promise();
        return res.status(200).json({ tables: tables.TableNames });
    } catch (error) {
        res.status(error.code || 400).json({
            errors: {
                msg: error.message,
            },
        });
    }
};

const addUser = async (req, res) => {
    try {
        const { name, lastName } = req.body;
        const date = new Date();
        const id = String(date.getTime());
        const params = {
            TableName: TABLE_USERS,
            Item: {
                id,
                name,
                lastName
            }
        };
        const newItem = await dynamoClient.put(params).promise();
        return res.status(200).json({ data: newItem });
    } catch (error) {
        res.status(error.code || 400).json({
            errors: {
                msg: error.message,
            },
        });
    }
};

const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const params = {
            TableName: TABLE_USERS,
            Key: {
                id
            }
        };
        const user = await dynamoClient.get(params).promise();
        return res.status(200).json({ user });
    } catch (error) {
        res.status(error.code || 400).json({
            errors: {
                msg: error.message,
            },
        });
    }
};

const getUsers = async (req, res) => {
    try {
        const params = { TableName: TABLE_USERS };
        const users = await dynamoClient.scan(params).promise();
        return res.status(200).json({ users });
    } catch (error) {
        res.status(error.code || 400).json({
            errors: {
                msg: error.message,
            },
        });
    }
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const  params = {
            TableName: TABLE_USERS,
            Key: {
                id
            }
        };
 
        const deletedUser = await dynamoClient.delete(params).promise();
        return res.status(200).json({ deletedUser });
    } catch (error) {
        res.status(error.code || 400).json({
            errors: {
                msg: error.message,
            },
        });
    }
};

module.exports = {
    listTables,
    addUser,
    getUser,
    getUsers,
    deleteUser
};