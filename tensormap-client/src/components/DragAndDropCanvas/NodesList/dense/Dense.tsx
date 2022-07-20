import React from 'react';
import { TrayItemWidget } from '../../components/TrayItemWidget';
import * as strings from "../../../../constants/Strings";
import { TrayWidget } from '../../components/TrayWidget';
import Paper from '@material-ui/core/Paper';
import { Dropdown } from 'semantic-ui-react';
import { SidebarWidget } from "../../components/SidebarWidget";
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';


const Dense = () => {
    return (
        <div style={{marginTop:"10px", marginBottom:"10px"}}>
            <TrayItemWidget
                model={{type:strings.DL_MODEL_DENSE_TYPE}}
                name={strings.DL_MODEL_DENSE_NAME}
                color={strings.DL_MODEL_DENSE_COLOR}
            />
             {/* <Paper square>
                  <SidebarWidget>
                <TrayWidget nntype="FDN">
                      <TrayItemWidget model={{ type: "in", name: 'inp_layer' }} name = "Input Node" color = "rgb(192,255,0)" />
                      <TrayItemWidget model={{ type: "out", name: 'hid_layer' }} name = "Hidden Node" color = "rgb(0,192,255)" />
                      <TrayItemWidget model={{ type: "in", name: "out_layer" }} name = "Output Node" color = "rgb(90,102,255)" />
                    </TrayWidget>

                    <TrayWidget nntype="FDN">
                      <TrayItemWidget model={{ type: "in", name: 'inp_layer' }} name = "Input Node" color = "rgb(192,255,0)" />
                      <TrayItemWidget model={{ type: "out", name: 'hid_layer' }} name = "Hidden Node" color = "rgb(0,192,255)" />
                      <TrayItemWidget model={{ type: "in", name: "out_layer" }} name = "Output Node" color = "rgb(90,102,255)" />
                    </TrayWidget>
                    </SidebarWidget>


            </Paper> */}



        </div>
    );
};

export default Dense;
