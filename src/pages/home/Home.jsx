import React from 'react'
import { PageHeader } from 'antd';
import TrafficTable from '../../components';

function Home () {
  return (
    <div style={styles.container}>
      <PageHeader title="Benton Street Traffic">
        Welcome to Benton Street - a quiet, tree-lined, residential, neighborhood street.
        <p>(with a 25 mph speed limit)</p>
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

export default Home