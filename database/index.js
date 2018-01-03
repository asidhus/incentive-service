const cassandra = require('cassandra-driver');
const helper = require('./dataGenFunctions');

const client = new cassandra.Client({ contactPoints: ['54.215.136.227'], keyspace: 'inventory' });

client.connect((err) => {
  if (err) {
    console.log('Cassandra connection failed!!', err);
  } else {
    console.log('Cassandra connected!!');
  }
});

const clearDB = () => {
  helper.clearDB(client);
};
const generate = () => {
  helper.insertMany(client, 3875600);
};
const update = (arr) => {
  helper.update(client, arr);
};
const search = arr =>
  helper.search(client, arr);
//
module.exports = {
  generate, clearDB, search, update,
};

