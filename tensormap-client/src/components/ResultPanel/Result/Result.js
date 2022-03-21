import React from 'react';
import {Message} from 'semantic-ui-react';

const Result = (props) => {
    return (
        <div style={{marginLeft: "10px", marginRight: "10px", marginTop:"10px"}}>
            <Message
                success
                content={props.result}
            />
        </div>
    );
};

export default Result;