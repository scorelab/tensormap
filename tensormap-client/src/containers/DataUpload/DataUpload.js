import React, {Component} from 'react';
import { Grid, Segment, Divider, Dimmer, Loader } from 'semantic-ui-react';
import FilesList from "../../components/Upload/FilesList/FilesList";
import * as strings from "../../constants/Strings";
import NewFile from "../../components/Upload/NewFile/NewFile";
import axios from "../../shared/Axios";
import * as urls from "../../constants/Urls";

class DataUpload extends Component {

    state = {fileList:null}

    componentDidMount() {
        /*
        * GET data from backend save them in the states => fileList
        *
        * */

        axios.get(urls.BACKEND_GET_ALL_FILES)
            .then(resp => {
                if (resp.data.success === true){
                    this.setState(
                        {...this.state, fileList: resp.data.data.map(item =>(
                            {"SavedFileName": item.file_name, "SavedFileType": item.file_type}
                            ) ) }
                    );
                }
            });
    }

    render() {

        /*
        *  fileItem is a component that can represent as loading component and after file list is loaded to
        *  state, it will convert to proper file list
        *
        * */

        let fileListItem = (
            <Segment style={{marginLeft: "10px", marginRight: "10px", height:"400px"}}>
                <Dimmer active inverted>
                    <Loader size='large'>{strings.UPLOAD_FILES_LOADING} </Loader>
                </Dimmer>
            </Segment>
        );

        if (this.state.fileList){
            fileListItem = (
                <FilesList fileList={this.state.fileList} />
            );
        }

        return (
            <div>
                <Grid columns={2} relaxed='very' stackable>
                        <Grid.Column >
                            <Segment textAlign='center' size='huge'>{"mdskafjkjdsakfljkl"}</Segment>
                            <NewFile/>
                        </Grid.Column>
                        <Grid.Column >
                            <Segment textAlign='center' size='huge'>{strings.UPLOAD_FILE_TITLE}</Segment>
                            {fileListItem}
                        </Grid.Column>
                </Grid>
                <Divider vertical>OR</Divider>
            </div>
        );
    }
}

export default DataUpload;