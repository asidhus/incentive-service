const AWS = require('aws-sdk');

AWS.config.loadFromPath('./config/staging.json');
const Consumer = require('sqs-consumer');
const client = require('../database/index.js');
const calculate = require('./calculateIncentive.js');

// client.generate();

const sqs1 = new AWS.SQS();

const send = (body, incent) => {
  const sqsParamsRecommendations = {
    MessageBody: JSON.stringify({
      ID: body.ID,
      incentive: incent,
    }),
    QueueUrl: 'https://sqs.us-west-1.amazonaws.com/016977445519/IncentiveCalculated',
  };
  console.log('IM here');
  sqs1.sendMessage(sqsParamsRecommendations, (err) => {
    if (err) {
      console.log('Error', err);
      throw err;
    }
  });
};

const app = Consumer.create({
  queueUrl: 'https://sqs.us-west-1.amazonaws.com/016977445519/IncecntiveProduct',
  handleMessage: (message, done) => {
    let body = String(message.Body);
    body = JSON.parse(body);
    calculate(body.location, body.array, client, send, body);
    done();
  },
  sqs: new AWS.SQS(),
});

app.on('error', (err) => {
  console.log(err.message);
});
app.start();

const change = Consumer.create({
  queueUrl: 'https://sqs.us-west-1.amazonaws.com/016977445519/ChangeDB',
  handleMessage: (message, done) => {
    let body = String(message.Body);
    body = JSON.parse(body);
    client.update([body.PID, body.quantity]);
    done();
  },
  sqs: new AWS.SQS(),
});

change.on('error', (err) => {
  console.log(err.message);
});
change.start();

// const params = {
//   AttributeNames: [
//     'SentTimestamp',
//   ],
//   MaxNumberOfMessages: 1,
//   MessageAttributeNames: [
//     'All',
//   ],
//   QueueUrl: 'https://sqs.us-west-1.amazonaws.com/016977445519/IncecntiveProduct',
//   VisibilityTimeout: 0,
//   WaitTimeSeconds: 0,
// };
// sqs.receiveMessage(params, (err, data) => {
//   if (err) {
//     console.log("Receive Error", err);
//   } else if (data.Messages) {
//     console.log(data.Messages);
//     var deleteParams = {
//       QueueUrl: 'https://sqs.us-west-1.amazonaws.com/016977445519/IncecntiveProduct',
//       ReceiptHandle: data.Messages[0].ReceiptHandle
//     };
//     sqs.deleteMessage(deleteParams, function(err, data) {
//       if (err) {
//         console.log("Delete Error", err);
//       } else {
//         console.log("Message Deleted", data);
//       }
//     });
//   }
// });

