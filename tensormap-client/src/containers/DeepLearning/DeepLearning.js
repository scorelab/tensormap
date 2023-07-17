import React from 'react';
import { Grid } from 'semantic-ui-react';
import ResultPanel from "../../components/ResultPanel/ResultPanel";
import Canvas from '../../components/DragAndDropCanvas/Canvas';

const DeepLearning = () => {
        return (
            <div>
                <Grid celled='internally'>
                    <Grid.Row>
                        <Grid.Column width={16}>
                            <Canvas />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <ResultPanel/>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        );
}

export default DeepLearning;
