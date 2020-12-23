/* src/App.jsx */
import React, { useEffect, useState } from 'react'
import { API, graphqlOperation } from 'aws-amplify'
import { listVehicles } from '../graphql/queries'
import { PageHeader, Table } from 'antd';

function formatTime(isoTimeString) {
  return (new Date(isoTimeString).toLocaleString('en-US', {
    timezone: 'UTC',
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'    
  }))
}

// Table column definitions
const columns = [
  {title: 'Time', dataIndex: 'time',
    sorter: (a, b) => new Date(a.time) - new Date(b.time),
    render: time => <span>{formatTime(time)}</span>
  },
  {title: 'Vehicle', dataIndex: 'photoUrl', 
    render: photoUrl => <img alt={photoUrl} src={photoUrl} />
  },
  {title: 'Speed', dataIndex: 'speed',
    sorter: (a, b) => a.speed - b.speed,
    sortDirections: ['descend', 'ascend'],
    render: speed => <span>{speed} mph</span>
  },
  {title: 'Direction', dataIndex: 'direction'},
]

function Traffic () {
  const [vehicles, setVehicles] = useState([])
  const [loading, setLoading] = useState([])

  useEffect(() => {
    fetchVehicles()
  }, [])

  async function fetchVehicles() {
    try {
      setLoading(true)
      const vehicleData = await API.graphql(graphqlOperation(listVehicles, {limit: 10000}))
      setLoading(false)
      const vehicles = vehicleData.data.listVehicles.items
      setVehicles(vehicles);
      
    } catch (err) { console.log('error fetching vehicles', err) }
  }

  return (
    <div style={styles.container}>
      <PageHeader title="Benton Street Traffic">
        Welcome to Benton Street - a quiet, tree-lined, residential, neighborhood street.
        <p>(with a 25 mph speed limit)</p>
      </PageHeader> 
      <Table
        columns={columns}
        dataSource={vehicles}
        rowKey="id"
        sticky="true"
        loading={loading}
        pagination={{defaultPageSize: 5, pageSizeOptions: [5, 10, 25, 50, 100]}}
      />
    </div>
  )
}

const styles = {
  container: { width: '100%', margin: '0 auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 40 },
}

export default Traffic