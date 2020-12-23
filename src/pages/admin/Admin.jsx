import React from 'react'
import { PageHeader } from 'antd';
import TrafficTable from '../../components'

function Admin () {
  return (
    <div style={styles.container}>
      <PageHeader title="Benton Street Traffic - (future) Admin page">
        Under Construction
      </PageHeader> 
      <TrafficTable />
    </div>
  )
}

const styles = {
  container: { 
    width: '100%',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 40
  },
}

export default Admin