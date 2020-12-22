/* src/App.jsx */
import React from 'react'
import Amplify from 'aws-amplify'
import Traffic from './components/Traffic'

import awsExports from "./aws-exports";
Amplify.configure(awsExports);

function App () {
  return (<Traffic />)
}

export default App