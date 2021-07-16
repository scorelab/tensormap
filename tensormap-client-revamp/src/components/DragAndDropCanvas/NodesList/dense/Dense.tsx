import React from 'react';
import { TrayItemWidget } from '../../components/TrayItemWidget';
import * as strings from "../../../../constants/Strings";


const Dense = () => {
    return (
        <div style={{marginTop:"10px", marginBottom:"10px"}}>
            <TrayItemWidget
                model={{type:strings.DL_MODEL_DENSE_TYPE}}
                name={strings.DL_MODEL_DENSE_NAME}
                color={strings.DL_MODEL_DENSE_COLOR}
            />
        </div>
    );
};

export default Dense;