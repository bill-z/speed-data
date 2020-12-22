/* src/App.jsx */
import React, { useEffect, useState } from 'react'
import { API, graphqlOperation } from 'aws-amplify'
import { listVehicles } from '../graphql/queries'

function Traffic () {
  const [vehicles, setVehicles] = useState([])

  useEffect(() => {
    fetchVehicles()
  }, [])

  async function fetchVehicles() {
    try {
      const vehicleData = await API.graphql(graphqlOperation(listVehicles))
      const vehicles = vehicleData.data.listVehicles.items
      setVehicles(vehicles)
    } catch (err) { console.log('error fetching vehicles', err) }
  }

  return (
    <div style={styles.container}>
      <h2>Benton Street Traffic</h2>
      {vehicles.map((vehicle, index) => (
        <div key={vehicle.id} style={styles.vehicle}>
          <img className="vehicle-photo" src={vehicle.photoUrl} alt="Vehicle driving by"/>
          <span style={styles.vehicleTime}>{
            new Date(vehicle.time).toLocaleString('en-US', {
              weekday: 'short',
              month: 'short',
              day: 'numeric',
              hour: 'numeric',
              minute: 'numeric'
            })
          }: </span>
          <span style={styles.vehicleSpeed}>{vehicle.speed} mph </span>
          <span style={styles.vehicleDirection}>heading {vehicle.direction}</span>
        </div>
      ))}
    </div>
  )
}

const styles = {
  vehicle: {  marginBottom: 15 },
  vehicleTime: { marginBottom: 0 },
  vehicleSpeed: { marginBottom: 0 },
  vehicleDirection: { marginBottom: 0 },
}

export default Traffic