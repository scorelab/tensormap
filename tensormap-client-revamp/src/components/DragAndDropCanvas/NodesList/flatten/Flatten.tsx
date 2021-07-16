import React from 'react';
import { TrayItemWidget } from '../../components/TrayItemWidget';
import * as strings from "../../../../constants/Strings";

const Flatten = () => {
    return (
            <div style={{marginTop:"10px", marginBottom:"10px"}}>
                <TrayItemWidget
                    model={{type:strings.DL_MODEL_FLATTEN_TYPE}}
                    name={strings.DL_MODEL_FLATTEN_NAME}
                    color={strings.DL_MODEL_FLATTEN_COLOR}
                />
            </div>
    );
};

export default Flatten;
