/* Amplify Params - DO NOT EDIT
	API_SPEEDDATAAPI_GRAPHQLAPIIDOUTPUT
	API_SPEEDDATAAPI_VEHICLETABLE_ARN
	API_SPEEDDATAAPI_VEHICLETABLE_NAME
	ENV
	REGION
Amplify Params - DO NOT EDIT */

// const { findByPlaceholderText } = require("@testing-library/react");

// Load the AWS SDK for Node.js
const AWS = require('aws-sdk');

const extractVehicleSpeedDataFromImageFilename = (imageFilename) => {
    const [timeString, speed, directionCode, vehicleTypeCode] = imageFilename.split('_');
    const [year, month, day, hour, minute] = timeString.split('-');
    const date = new Date(year, month-1, day, hour, minute);

    const direction = {
      'N': 'north',
      'S': 'south'
    }[directionCode];

    const vehicleType = {
      'V': '',
      'B': 'bus',
      'P': 'police',
      'F': 'fire',
      'D': 'delivery'
    }[vehicleTypeCode];

    return {
      id: imageFilename,
      date,
      speed,
      direction,
      vehicleType
    };
}

const storeVehicleSpeedData = async (vehicleSpeedData) => {
  console.log('createVehicleSpeedData:', JSON.stringify(vehicleSpeedData));

  // Create the DynamoDB service object
  const ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});
  
  const {id, date, speed, direction, vehicleType} = vehicleSpeedData;

  var params = {
    TableName: 'Vehicle-pgvfaidzgzfdhkhg5mjgdvaheu-dev',
    Item: {
      'id': {S: id},
      'time' : {S: date.toISOString()},
      'speed': {N: speed},
      'direction': {S: direction},
      'vehicle': {S: vehicleType}
    },
  };

  // Add the item to the DynamoDB table
  try {
    console.log('calling ddb.putItem', params);
    const result = await ddb.putItem(params).promise();

    console.log('ddb.putItem Success:', result);
  }
  catch (err) {
    console.log('ddb.putItem Error: ', err);
  }
}

// eslint-disable-next-line
exports.handler = async (event, context) => {
  console.log('Received S3 event:', JSON.stringify(event, null, 2));

  const bucket = event.Records[0].s3.bucket.name;
  const key = event.Records[0].s3.object.key;
  const eventName = event.Records[0].eventName; 

  const [/*folder*/, imageFilename] = key.split('/');

  if (eventName.startsWith('ObjectRemoved')) {
    console.log('Removed', key);
  }
  else {
    // A new image was added to the S3 bucket.
    
    // Extract data values from image filename.
    const vehicleSpeedData = extractVehicleSpeedDataFromImageFilename(imageFilename);

    // Add data to vehicle speed table
    await storeVehicleSpeedData(vehicleSpeedData);
  }

  context.done(null, 'Successfully processed S3 event'); // SUCCESS with message
}

