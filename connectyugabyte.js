var pg = require('pg');

var conString = "postgres://postgres@35.187.233.72:30944/postgres";
const insertstmt = "INSERT INTO sensordata (time_created, city, sensor_id, time_generated, value) " +
                      "SELECT now(), $1, $2,TO_TIMESTAMP($3), TRUNC($4,3)";
const client = new pg.Client(conString);

var message = { city: 'West Kayliside',sensor: 10,time_created: 1591072244732,value: 4.594680830166862 };
var values = [];
values.push(message.city);
values.push(message.sensor);
values.push(message.time_created/1000);
values.push(message.value);
console.log(values);
client.connect()
.then(() => client.query(insertstmt, values))
.then((result) =>  {
  console.log(result); 
  process.exit();
})
.catch((err) => console.log(err))

