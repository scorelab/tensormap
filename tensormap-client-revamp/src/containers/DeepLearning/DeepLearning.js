import React, {Component} from 'react';
import { Grid } from 'semantic-ui-react'
import Canvas from "../../components/DragAndDropCanvas/canvas";
import {subject} from "../../services";
import PropertiesBar from "../../components/PropertiesBar/PropertiesBar";
import ResultPanel from "../../components/ResultPanel/ResultPanel";

class DeepLearning extends Component {


    componentDidMount() {
        this.subscription = subject.subscribe(res => {
            console.log(res);
        });
    }

    componentWillUnmount() {
        this.subscription.unsubscribe();
    }

    render() {
        return (
            <div>
                <Grid celled='internally'>
                    <Grid.Row>
                        <Grid.Column width={13}>
                            <Canvas/>
                        </Grid.Column>
                        <Grid.Column width={3}>
                            <PropertiesBar/>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <ResultPanel/>
                    </Grid.Row>
                </Grid>
            </div>
        );
    }
}

export default DeepLearning;