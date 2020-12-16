// const { findByPlaceholderText } = require("@testing-library/react");

// Load the AWS SDK for Node.js
import { DynamoDB } from 'aws-sdk';

function createVehicleSpeedData(imageFilename, date, speed, direction, vehicleType) {
  console.log('createVehicleSpeedData:', date.toISOString(), speed, direction, vehicleType);

  // Create the DynamoDB service object
  const ddb = new DynamoDB({apiVersion: '2012-08-10'});
  
  var params = {
    TableName: 'Vehicle-pgvfaidzgzfdhkhg5mjgdvaheu-dev',
    Item: {
      'id': {S: imageFilename},
      'time' : {S: date.toISOString()},
      'speed': {N: speed},
      'direction': {S: direction},
      'vehicle': {S: vehicleType}
    },
  };
  
  // Add the items to the DynamoDB table
  ddb.putItem(params, function(err, data) {
    if (err) {
      console.log('Error: ', err);
    }
    else {
      console.log('Vehicle item entered successfully:', data);
    }
  });
}

// eslint-disable-next-line
export function handler(event, context) {
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
    const [timeString, speedString, directionCode, vehicleTypeCode] = imageFilename.split('_');
    const [year, month, day, hour, minute] = timeString.split('%3A');
    const date = new Date(year, month-1, day, hour, minute);
    const speed = +speedString; // convert to number

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

    // Add data to vehicle speed table
    createVehicleSpeedData(imageFilename, date, speed, direction, vehicleType);
  }

  console.log(`Bucket: ${bucket}`, `Key: ${key}`);
  context.done(null, 'Successfully processed S3 event'); // SUCCESS with message
}

