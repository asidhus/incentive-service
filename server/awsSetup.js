const AWS = require('aws-sdk');
AWS.config.loadFromPath('./config/staging.json');
const Consumer = require('sqs-consumer');

// const sqs = new AWS.SQS();


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

const app = Consumer.create({
  queueUrl: 'https://sqs.us-west-1.amazonaws.com/016977445519/IncecntiveProduct',
  handleMessage: (message, done) => {
    console.log(message);
    done();
  },
  sqs: new AWS.SQS(),
});

app.on('error', (err) => {
  console.log(err.message);
});
app.start();
