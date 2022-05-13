import React, {Component} from 'react';
import { Grid, Menu, Segment } from 'semantic-ui-react';
import * as constants from '../../../constants/Strings';
import * as urls from '../../../constants/Urls';
import { withRouter } from "react-router-dom";

class SideBar extends Component {

    state = { activeItem: constants.HOME_SIDEBAR };

    handleItemClick = (e, { name }) => {
        this.setState({ activeItem: name });
        if (name === constants.HOME_SIDEBAR){
            this.props.history.push(urls.HOME_URL);
        }else if (name === constants.DATA_UPLOAD_SIDEBAR){
            this.props.history.push(urls.DATA_UPLOAD_URL);
        }else if (name === constants.DATA_PROCESS_SIDEBAR){
            this.props.history.push(urls.DATA_PROCESS_URL);
        }else {
            this.props.history.push(urls.DEEP_LEARN_URL);
        }
    };

    render() {
        return (
            <div>
                <Grid style={{"marginTop":"0.5%"}}>
                    <Grid.Column width={3}>
                        <Menu fluid vertical tabular size='massive' >
                            <Menu.Item
                                name={constants.HOME_SIDEBAR}
                                active={this.state.activeItem === constants.HOME_SIDEBAR}
                                onClick={this.handleItemClick}
                                style={{"fontWeight":"bold"}}
                            />
                            <Menu.Item
                                name={constants.DATA_UPLOAD_SIDEBAR}
                                active={this.state.activeItem === constants.DATA_UPLOAD_SIDEBAR}
                                onClick={this.handleItemClick}
                                style={{"fontWeight":"bold"}}
                            />
                            <Menu.Item
                                name={constants.DATA_PROCESS_SIDEBAR}
                                active={this.state.activeItem === constants.DATA_PROCESS_SIDEBAR}
                                onClick={this.handleItemClick}
                                style={{"fontWeight":"bold"}}
                            />
                            <Menu.Item
                                name={constants.DEEP_LEARNING_SIDEBAR}
                                active={this.state.activeItem === constants.DEEP_LEARNING_SIDEBAR}
                                onClick={this.handleItemClick}
                                style={{"fontWeight":"bold"}}
                            />
                        </Menu>
                    </Grid.Column>

                    <Grid.Column stretched width={13} >
                        <Segment style={{minHeight:"90vh", marginRight: "10px", marginBottom:"10px"}}>
                            {this.props.mainProps.children}
                        </Segment>
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}

export default withRouter(SideBar);
