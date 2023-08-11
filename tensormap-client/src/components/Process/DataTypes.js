import React from 'react'
import { Table,Header } from 'semantic-ui-react';


const DataTypes = ({ dataTypes }) => {
  return (
    <div>
        <Header size='medium' textAlign='center' style={{ marginTop: '20px' }} >Datatypes</Header>
        <Table style={{ fontSize: '0.8em' }}>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Column Name</Table.HeaderCell>
        <Table.HeaderCell>Data Type</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      {Object.entries(dataTypes).map(([column, dtype]) => (
        <Table.Row key={column}>
          <Table.Cell>{column}</Table.Cell>
          <Table.Cell>{dtype}</Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  </Table></div>
  )
}

export default DataTypes