import React from 'react';
import { Message, Segment, Grid, Header, Icon, Button } from 'semantic-ui-react';
import { useHistory } from "react-router";
import * as urls from '../../constants/Urls';
import {TENSOR_MAP_URL} from "../../constants/Urls";

const Home = () => {

    const history = useHistory();

    const handleButtonUpload = ()=> {
        history.push(urls.DATA_UPLOAD_URL);
    };

    const handleButtonNewProject = ()=> {
        history.push(urls.DEEP_LEARN_URL);
    };

    const handleButtonGoToGit = ()=> {
        window.location.replace(TENSOR_MAP_URL);
    }

    return (
        <div>
            <Message size='huge'
                icon='cogs'
                header='TensorMap'
                content='TensorMap is a web application that enables you to create deep learning models using a
                graphical interface without having to know how to code. It is an open-source application.'
            />

            <Message size='big'
                success
                header='You can'
                list={[
                    'Upload Data for Preprocessing.',
                    'Make Neural Network Models using Drag and Drop Feature.',
                    'Visualise uploaded Data.',
                    'Change Data Columns,Rows etc.',
                    'Get Generated Code for Neural Network Model Made.'
                ]}
            />

            <Segment placeholder>
                <Grid columns={3} stackable textAlign='center'>


                    <Grid.Row verticalAlign='middle'>
                        <Grid.Column>
                            <Header icon>
                                <Icon name='cloud upload' />
                                Upload Data
                            </Header>
                            <Button color='yellow' onClick={handleButtonUpload}>Upload</Button>
                        </Grid.Column>

                        <Grid.Column>
                            <Header icon>
                                <Icon name='file' />
                                Create new Project
                            </Header>
                            <Button color='blue' onClick={handleButtonNewProject}>Create</Button>
                        </Grid.Column>

                        <Grid.Column>
                            <Header icon>
                                <Icon name='github' />
                                Contribute at:
                            </Header>
                            <Button color='olive' onClick={handleButtonGoToGit}>Contribute</Button>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
        </div>
    );
};

export default Home;