import { Grid } from 'semantic-ui-react'
import HeatMapComp from './HeatMapComp';
import DataTypes from './DataTypes';
import MetricTable from './MetricTable';

const Metrics = (props) => {
    return (
        <div>
            <Grid>
                    <Grid.Row centered style={{ display: 'flex', alignItems: 'stretch' }}>
                        <Grid.Column textAlign="center" width={4} style={{ backgroundColor: 'white', borderRadius: '10px',margin:'0px 20px',padding:'15px',display: 'flex', flexDirection: 'column'}}>
                            <DataTypes dataTypes={props.dataTypes} />
                        </Grid.Column>
                        <Grid.Column textAlign="center" style={{ backgroundColor: 'white', borderRadius: '10px',padding:'15px',display: 'flex', flexDirection: 'column',margin:'0px 11px' }} width={11}>
                            <MetricTable metrics={props.metrics} />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row centered>
                        <Grid.Column style={{ backgroundColor: 'white', borderRadius: '10px',margin:'0px 20px 0px 20px',padding:'15px' }} width={16}>
                            <HeatMapComp corrMatrix={props.corrMatrix}/>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
        </div>
    );
}

export default Metrics