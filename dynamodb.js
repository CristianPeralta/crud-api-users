const AWS = require('aws-sdk');
require('dotenv').config();

AWS.config.update({
    region: process.env.AWS_DEFAULT_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const ddb = new AWS.DynamoDB({ apiVersion: "2012-08-10" });

// Call DynamoDB to retrieve the list of tables
const listTables = () => {
    ddb.listTables({ Limit:10 }, function(err, data) {
        if (err) {
            console.log("Error", err.code);
        } else {
            console.log("Tables names are ", data.TableNames);
        }
    });
};

module.exports = {
    listTables
};