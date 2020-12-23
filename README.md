# Street Traffic data viewer

This project was bootstrapped with
[Create React App](https://github.com/facebook/create-react-app)
and
[AWS Amplify CLI](https://github.com/aws-amplify/amplify-cli)

## History

I was recently curious about computer vision so thought it would be fun to get a Raspberry Pi and camera, dust off my python, and learn some OpenCV to play around.
My first experiment was to measure the traffic on the street where I live. That project lives here: https://github.com/bill-z/street-traffic

*This* project is to create a React app to view the data collected by the street-traffic project.

## Overview
1) The street-traffic app running on the Raspberry Pi saves vehicle photos with date, time, speed and direction embedded in the image filename.
2) The photos are uploaded to an AWS S3 bucket.
3) When a file is added to the S3, a JS/Node Lambda function is executed.
4) The trigger function extracts the data from the image file name and create a vehicle speed record in a DynamoDB table.
5) The React application fetches and displays speed data from the DynamoDB table using a GraphQL query.

![project overview diagram](/doc/speed-data-overview.png?raw=true "Project Overview")
