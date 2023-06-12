import React, {Component} from 'react';
import { Grid } from 'semantic-ui-react';
import PropertiesBar from "../../components/PropertiesBar/PropertiesBar";
import ResultPanel from "../../components/ResultPanel/ResultPanel";

class DeepLearning extends Component {



    render() {
        return (
            <div>
                <Grid celled='internally'>
                    <Grid.Row>
                        <Grid.Column width={13}>
                        </Grid.Column>
                        <Grid.Column width={3}>
                            <PropertiesBar/>
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
}

export default DeepLearning;
