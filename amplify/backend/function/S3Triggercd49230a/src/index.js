// const { findByPlaceholderText } = require("@testing-library/react");

// eslint-disable-next-line
exports.handler = function(event, context) {
  console.log('Received S3 event:', JSON.stringify(event, null, 2));
  // Get the object from the event and show its content type
  const bucket = event.Records[0].s3.bucket.name; //eslint-disable-line
  const key = event.Records[0].s3.object.key; //eslint-disable-line


  const [folder, imageName] = key.split('/');

  if (imageName) {
    // Added a new image.
    
    // Extract data values from image.
    const [timeString, speedString, directionCode, vehicleTypeCode] = imageName.split('_');
    const [year, month, day, hour, minute] = timeString.split('%3A');
    const date = new Date(year, month-1, day, hour, minute);

    // Add data to vehicle speed table
    console.log('create:', timeString, speedString, directionCode, vehicleTypeCode);
    console.log(date.toISOString());
  }
  else {
    // deleted an image
  }

  console.log(`Bucket: ${bucket}`, `Key: ${key}`);
  context.done(null, 'Successfully processed S3 event'); // SUCCESS with message
};
