import React from 'react';
import {TrayItemWidget} from "../../components/TrayItemWidget";
import * as strings from "../../../../constants/Strings";

const Input = () => {
    return (
        <div style={{marginTop:"10px", marginBottom:"10px"}}>
            <TrayItemWidget
                model={{type:strings.DL_MODEL_INPUT_TYPE}}
                name={strings.DL_MODEL_INPUT_NAME}
                color={strings.DL_MODEL_INPUT_COLOR}
            />
        </div>
    );
};

export default Input;
