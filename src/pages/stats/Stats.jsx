import React from 'react'
import { PageHeader } from 'antd';

function Stats () {
  return (
    <div style={styles.container}>
      <PageHeader title="Benton Street Traffic - (future) Stats page">
        Coming soon: pretty graphs and stuff
      </PageHeader> 
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

export default Stats