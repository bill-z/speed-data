/* src/App.js */
import React, { useEffect, useState } from 'react'
import Amplify, { API, graphqlOperation } from 'aws-amplify'
import { createVehicle } from './graphql/mutations'
import { listVehicles } from './graphql/queries'

import awsExports from "./aws-exports";
Amplify.configure(awsExports);

const initialState = {
  id: 'test id 1',
  time: new Date('2020-12-13T14:29:53.000Z'),
  speed: 22.0,
  direction: 'north'
};

const App = () => {
  const [formState, setFormState] = useState(initialState)
  const [vehicles, setVehicles] = useState([])

  useEffect(() => {
    fetchVehicles()
  }, [])

  function setInput(key, value) {
    setFormState({ ...formState, [key]: value })
  }

  async function fetchVehicles() {
    try {
      const vehicleData = await API.graphql(graphqlOperation(listVehicles))
      const vehicles = vehicleData.data.listVehicles.items
      setVehicles(vehicles)
    } catch (err) { console.log('error fetching vehicles') }
  }

  async function addVehicle() {
    try {
      if (!formState.id || !formState.time || !formState.speed || !formState.direction) return
      const vehicle = { ...formState }
      setVehicles([...vehicles, vehicle])
      setFormState(initialState)
      await API.graphql(graphqlOperation(createVehicle, {input: vehicle}))
    } catch (err) {
      console.log('error creating vehicle:', err)
    }
  }

  return (
    <div style={styles.container}>
      <h2>Amplify Vehicles</h2>
      <input
        onChange={event => setInput('id', event.target.value)}
        style={styles.input}
        value={formState.id}
        placeholder="Id"
      />
      {/* <input
        onChange={event => setInput('time', new Date(event.target.value))}
        style={styles.input}
        value={formState.time}
        placeholder="Time"
      /> */}
      <input
        onChange={event => setInput('speed', event.target.value)}
        style={styles.input}
        value={formState.speed}
        placeholder="Speed"
      />
      <input
        onChange={event => setInput('direction', event.target.value)}
        style={styles.input}
        value={formState.direction}
        placeholder="Direction"
      />
      <button style={styles.button} onClick={addVehicle}>Create Vehicle</button>
      {
        vehicles.map((vehicle, index) => (
          <div key={vehicle.id ? vehicle.id : index} style={styles.vehicle}>
            <p style={styles.vehicleId}>{vehicle.id}</p>
            {/* <p style={styles.vehicleTime}>{vehicle.time.toISOString()}</p> */}
            <p style={styles.vehicleSpeed}>{vehicle.speed}</p>
            <p style={styles.vehicleDirection}>{vehicle.direction}</p>
          </div>
        ))
      }
    </div>
  )
}

const styles = {
  container: { width: 400, margin: '0 auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 20 },
  vehicle: {  marginBottom: 15 },
  input: { border: 'none', backgroundColor: '#ddd', marginBottom: 10, padding: 8, fontSize: 18 },
  vehicleId: { fontSize: 20, fontWeight: 'bold' },
  vehicleTime: { marginBottom: 0 },
  vehicleSpeed: { marginBottom: 0 },
  vehicleDirection: { marginBottom: 0 },
  button: { backgroundColor: 'black', color: 'white', outline: 'none', fontSize: 18, padding: '12px 0px' }
}

export default App