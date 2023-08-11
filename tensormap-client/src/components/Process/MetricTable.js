import React from 'react';
import { Table,Header } from 'semantic-ui-react';

const MetricTable = ({ metrics }) => {

    const roundValue = (value) => {
        return typeof value === 'number' ? value.toFixed(2) : value;
      };
    
  return (
    <div>
        <Header size='medium' textAlign='center' style={{ marginTop: '20px' }} >Dataset Metrics</Header>
    <Table celled style={{ fontSize: '0.7em' }}>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Feature</Table.HeaderCell>
          <Table.HeaderCell>Count</Table.HeaderCell>
          <Table.HeaderCell>Mean</Table.HeaderCell>
          <Table.HeaderCell>Standard Deviation</Table.HeaderCell>
          <Table.HeaderCell>Min</Table.HeaderCell>
          <Table.HeaderCell>25%</Table.HeaderCell>
          <Table.HeaderCell>50%</Table.HeaderCell>
          <Table.HeaderCell>75%</Table.HeaderCell>
          <Table.HeaderCell>Max</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {Object.entries(metrics).map(([feature, values]) => (
          <Table.Row key={feature}>
            <Table.Cell>{roundValue(feature)}</Table.Cell>
            <Table.Cell>{roundValue(values.count)}</Table.Cell>
            <Table.Cell>{roundValue(values.mean)}</Table.Cell>
            <Table.Cell>{roundValue(values.std)}</Table.Cell>
            <Table.Cell>{roundValue(values.min)}</Table.Cell>
            <Table.Cell>{roundValue(values["25%"])}</Table.Cell>
            <Table.Cell>{roundValue(values["50%"])}</Table.Cell>
            <Table.Cell>{roundValue(values["75%"])}</Table.Cell>
            <Table.Cell>{roundValue(values.max)}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
    </div>
  );
}

export default MetricTable;
