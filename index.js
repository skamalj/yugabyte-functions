const yargs = require('yargs');
var faker = require('faker');

var cities_and_sensors = [];
var sensor_data = [];

//Define and Accept arguments;
const argv = yargs
    .option('cities', {
        alias: 'c',
        description: 'Number of cities to generate data',
        type: 'integer',
    })
    .option('sensor_index', {
        alias: 's',
        description: 'Start index for sensor ids',
        type: 'integer',
    })
    .option('rate', {
        alias: 'r',
        description: 'Number of records per second ',
        type: 'integer',
    })
    .option('duration', {
        alias: 'd',
        description: 'How long to generate records for in mins ',
        type: 'integer',
    })
    .demandOption(['cities','sensor_index','rate'])
    .help()
    .alias('help', 'h')
    .argv;

//Function to generate cities and sensorids
//This is our reference data
function generateCitiesAndSensors(num_of_cities, start_sensor_id) {
    console.time('GENERATE_REF_CITIES_AND_SENSORS_DURATION')
    var i = 0;
    for (i=0; i < num_of_cities; i++) 
        cities_and_sensors[i] = {'city': faker.address.city(), 'sensor': start_sensor_id + i};
    console.timeEnd('GENERATE_REF_CITIES_AND_SENSORS_DURATION')    
}

//Interval in millisecond to generate at required rps.
const rate_interval = (1000 * argv.cities) / argv.rate; 
//duration in millisecond
const duration = argv.duration*1000; 

//Function to generate seiemic data
function generateSiesmicData() {
    var time_now = Date.now();
    var data  = cities_and_sensors.map(city => {
        return {'city':city.city,'sensor':city.sensor,'time_created': time_now, 'value': Math.random() * 7.0 + 1.0} ;
        });     
    sensor_data = data.concat(sensor_data); 
}


//Generate reference city and sensor data
generateCitiesAndSensors(argv.cities,argv.sensor_index);
console.log("Starting data generation")
console.time('START_GEN_DURATION')
var genData = setInterval(generateSiesmicData,rate_interval);

setInterval(() => {
    clearInterval(genData);
    console.timeEnd('START_GEN_DURATION')
    console.log(`Total records generated: ${sensor_data.length}`)
    return process.exit();
}, duration);
