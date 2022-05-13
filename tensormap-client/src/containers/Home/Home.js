import React from 'react';
import { Message, Segment, Grid, Header, Icon, Button } from 'semantic-ui-react';
import { useHistory } from "react-router";
import * as urls from '../../constants/Urls';
import * as strings from '../../constants/Strings';

const Home = () => {

    const history = useHistory();

    const handleButtonUpload = ()=> {
        history.push(urls.DATA_UPLOAD_URL);
    };

    const handleButtonNewProject = ()=> {
        history.push(urls.DEEP_LEARN_URL);
    };

    const handleButtonGoToGit = ()=> {
        window.location.replace(urls.TENSOR_MAP_URL);
    }

    return (
        <div>
            <Message size='huge'
                icon='cogs'
                header={strings.HOME_MAIN_TITLE}
                content={strings.HOME_MAIN_CONTENT}
            />

            <Message size='big'
                success
                header={strings.HOME_ABILITY_TITLE}
                list={[strings.HOME_ABILITY_CONTENT_1, strings.HOME_ABILITY_CONTENT_2, strings.HOME_ABILITY_CONTENT_3,
                    strings.HOME_ABILITY_CONTENT_4, strings.HOME_ABILITY_CONTENT_5]}
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
