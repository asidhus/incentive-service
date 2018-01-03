require('./awsSetup.js');
const express = require('express');
const parser = require('body-parser');


const port = process.env.PORT || 8080;
const app = express();

app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));

app.listen(port);

console.log('server started on port ', port);
// app.post('/calculateIncentive', (request, response) => {
//   calculate(request.body.location, request.body.cart, client, response);
// });

// CREATE TABLE Products(id uuid, quantity int, name text, price double, primeEligible boolean, weight double, height double, width double, length double, warehouses list <frozen <warehouses>> , PRIMARY KEY(id));
