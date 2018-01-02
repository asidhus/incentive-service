const geodist = require('geodist');


const calculate = (location, cart, client, send, body) => {
  client.search(cart)
    .then((results) => {
      const { rows } = results;
      let dist = 0;
      let temp;
      for (let i = 0; i < rows.length; i += 1) {
        let findSmallest;
        let val;
        for (let j = 0; j < rows[i].warehouses.length; j += 1) {
          const check = rows[i].warehouses[j];
          const checkdist = geodist(
            { lat: location.latitude, lon: location.longitude },
            { lat: check.latitude, lon: check.longitude },
            { exact: true, unit: 'km' },
          );
          if (checkdist <= findSmallest || findSmallest === undefined) {
            findSmallest = checkdist;
            val = rows[i];
          }
          if (findSmallest > dist && j === rows[i].warehouses.length - 1) {
            dist = findSmallest;
            temp = val;
          }
        }
      }
      if (dist > 4000) {
        send(body, 5);
      } else if (dist > 3000) {
        send(body, 4);
      } else if (dist > 2000) {
        send(body, 3);
      } else if (dist > 1000) {
        send(body, 2);
      } else if (dist > 0) {
        send(body, 1);
      }
    })
    .catch((results) => { console.log(results); });


  return 0;
};

module.exports = calculate;
