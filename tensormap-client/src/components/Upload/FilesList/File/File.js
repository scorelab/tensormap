import React from 'react';
import { Segment } from 'semantic-ui-react';

const File = (props) => {
    return (
        <div>
            <Segment.Group horizontal raised>
                <Segment>{props.savedFileName}</Segment>
                <Segment>{props.savedFileType}</Segment>
            </Segment.Group>
        </div>
    );
};

export default File;