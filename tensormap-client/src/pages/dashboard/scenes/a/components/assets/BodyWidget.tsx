import * as React from "react";
import { TrayWidget } from "./TrayWidget";
import { Application } from "./Application";
import { TrayItemWidget } from "./TrayItemWidget";
import { DefaultNodeModel, DiagramWidget, DefaultPortModel } from "storm-react-diagrams";
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';


import socketIOClient from "socket.io-client";

const endpoint = "ws://localhost:5000/nn";

export interface BodyWidgetProps {
  app: Application;
}

export interface BodyWidgetState {
  drawer: boolean;
  dialog: boolean;
  accuracy: boolean;
  neg_mean_square_error: boolean;
  tmp_id: string;
  node:
  {
    id: string;
    param: Array<any>;
  }[];
  tmp_form: {
    [key: string]: any;
  };
  config: {
    [key: string]: any;
  }
}

export default class BodyWidget extends React.Component<BodyWidgetProps, BodyWidgetState> {
  constructor(props: BodyWidgetProps) {
    super(props);
    this.state = {
      drawer: false,
      dialog: false,
      tmp_id: "",
      accuracy: false,
      neg_mean_square_error: false,
      node: [
        {
          id: "",
          param: [],
        }
      ]
      ,
      tmp_form:
      {
        param1: "",
        param2: "",
      },
      config: {
        "optimizer": "'Adam'",
        "loss": "'sparse_categorical_crossentropy'",
        "metrics": [],
      }
    };

    this.handleNodeDelete = this.handleNodeDelete.bind(this)
    this.handleNodeAdd = this.handleNodeAdd.bind(this)
    this.handleNodeEdit = this.handleNodeEdit.bind(this)
    this.handleCheckBoxChange = this.handleCheckBoxChange.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleExeConfig = this.handleExeConfig.bind(this)
  };

  componentDidMount() {
    const socket = socketIOClient(endpoint);
    socket.on("nn_execute", (data: any) => console.log(data));
  }

  toggleDrawer = (call_: boolean, node_id: string) => {
    this.setState({ drawer: call_ });
    console.log(node_id);
  };

  get_serialized() {
    var str = JSON.stringify(this.props.app.getDiagramEngine().getDiagramModel().serializeDiagram());
    console.log(str)
  }

  handleChange = (key: number, param_name: string, event: React.ChangeEvent<HTMLInputElement>) => {
    var tmp_form = this.state.tmp_form;
    tmp_form[param_name] = event.target.value
    this.setState({
      tmp_form
    } as any)
  };

  handleSave = () => {
    console.log(this.state.tmp_form);
    var param_ = [
      this.state.tmp_form,
    ]

    var new_val = [{
      id: this.state.tmp_id,
      param: param_,
    }];
    console.log(new_val);
    var joined = this.state.node.concat(new_val);
    console.log(joined);
    this.setState({ node: joined, });
    console.log(this.state.node);
  }

  handleExecute = () => {
    var json_graph = this.props.app.getDiagramEngine().getDiagramModel().serializeDiagram();
    var node_data = this.state.node
    var comp_data = {
      graph: [json_graph],
      node_param: node_data
    }
    console.log(comp_data);

    const socket = socketIOClient(endpoint);
    socket.emit('nn_execute', comp_data);

  }

  handleGetCode = () => {
    var json_graph = this.props.app.getDiagramEngine().getDiagramModel().serializeDiagram();
    var node_data = this.state.node
    var data = {
      graph: [json_graph],
      node_param: node_data
    }
    console.log(data);
    fetch('http://localhost:5000/getcode/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .catch(response => console.log(response));
  }

  handleExeConfig = () => {
    var data = [this.state.config]
    console.log(data);
    this.handleClose();
    fetch('http://localhost:5000/getcode/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .catch(response => console.log(response));
  }

  handleNodeDelete = (nodeid: string) => {
    var data = {
      layerID: nodeid
    }
    console.log(data);
    fetch('http://localhost:5000/delete/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .catch(response => console.log(response));
  }

  handleNodeAdd = (nodeid: string, layertype: string, layerSpec: Array<any>, parentnode: string) => {
    var data = {
      layerId: nodeid,
      layerType: layertype,
      layerSpec: layerSpec,
      parentNodeId: parentnode
    }
    // console.log(data);
    fetch('http://localhost:5000/add/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .catch(response => console.log(response));
  }

  handleNodeEdit = () => {
    this.handleSave()
    this.toggleDrawer(false, "close")
    var new_val = [this.state.tmp_form];
    console.log(new_val);
    var data = {
      layerId: this.state.tmp_id,
      layerSpec: new_val,
    }
    console.log(data);
    fetch('http://localhost:5000/edit/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .catch(response => console.log(response));
  }

  //Dialog functions

  handleClickOpen = () => {
    this.setState({
      dialog: true
    })
  }

  handleClose = () => {
    this.setState({
      dialog: false
    })
  }

  handleCheckBoxChange = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ [name]: event.target.checked } as any);
    var joined = this.state.config.metrics.concat(name);

    var tmp_form = this.state.config;
    tmp_form["metrics"] = joined
    this.setState({
      tmp_form
    } as any)

    console.log(tmp_form)
    console.log(tmp_form.metrics)
  };


  render() {
    return (
      <div>

      <Button className= { 'send_btn'} onClick = {() => this.handleGetCode()
  }> Get Code </Button>
    <Button className = { 'exe_config_btn'} onClick = { this.handleClickOpen } > Change Exe Config </Button>
      < Drawer anchor = "right" open = { this.state.drawer } onClose = {() => this.toggleDrawer(false, "close")}>

        <div
					role="presentation"
  >
  <form noValidate autoComplete = "off" >
    <TextField  id="standard-name" label = "param1" value = { this.state.tmp_form.param1 } onChange = {(event: React.ChangeEvent<HTMLInputElement>) => this.handleChange(0, "param1", event)} margin = "normal" >
      </TextField>
      <br/>
      <TextField  id="standard-name" label = "param2" value = { this.state.tmp_form.param2 } onChange = {(event: React.ChangeEvent<HTMLInputElement>) => this.handleChange(1, "param2", event)} margin = "normal" >
        </TextField>
        <br/>
        <Button onClick={ this.handleNodeEdit } > Save </Button>
        </form>
        </div>
        </Drawer>

        <Dialog open = { this.state.dialog } onClose = { this.handleClose } aria-labelledby="form-dialog-title" >
        <DialogTitle id="form-dialog-title" > Execution Configuration </DialogTitle>
        <DialogContent>
        <TextField
            autoFocus
						value = { this.state.config.optimizer.slice(1,-1) }
            margin = "dense"
            id = "name"
            label = "Optimizer"
            type = "text"
						onChange = {(e) => {
          var tmp_form = this.state.config;
          tmp_form["optimizer"] = "'"+e.target.value+"'"
							this.setState({
            tmp_form
          } as any)
        }}
        fullWidth
        />

        <TextField
            autoFocus
						value = { this.state.config.loss.slice(1,-1) }
            margin = "dense"
            id = "name"
            label = "loss"
            type = "text"
						onChange = {(e) => {
          var tmp_form = this.state.config;
          tmp_form["loss"] = "'"+e.target.value+"'"
							this.setState({
            tmp_form
          } as any)
        }}
        fullWidth
        />

        <FormControlLabel
			        control={
								< Checkbox
									onChange = { this.handleCheckBoxChange("'accuracy'") }
									value = "accuracy"
									color = "primary"
        />
			        }
        label = "Accuracy"
        />

        <FormControlLabel
								control={
									< Checkbox
										onChange = { this.handleCheckBoxChange("'neg_mean_square_error'") }
										value = "neg_mean_square_error"
										color = "primary"
        />
								}
        label = "Neg mean square error"
        />

        </DialogContent>
        < DialogActions >
        <Button onClick={ this.handleClose } color = "primary" >
        Cancel
        </Button>
        <Button onClick = { this.handleExeConfig } color = "primary" >
        Save
        </Button>
        </DialogActions>
        </Dialog>


        <div className = "body_wf" >
        <div className="content" >
        <TrayWidget>
        <TrayItemWidget model={{ type: "in", name: 'inp_layer' }} name = "Input Layer" color = "rgb(192,255,0)" />
        <TrayItemWidget model={{ type: "out", name: 'hid_layer' }} name = "Hidden Layer" color = "rgb(0,192,255)" />
        <TrayItemWidget model={{ type: "in", name: "out_layer" }} name = "Output Layer" color = "rgb(90,102,255)" />
        </TrayWidget>
        < div
						className = "diagram-layer"
						onDrop = {
          event => {
            var data = JSON.parse(event.dataTransfer.getData("storm-diagram-node"));

            var delete_node = this.handleNodeDelete
            var add_node = this.handleNodeAdd

            var node = null;
            if (data.name === "inp_layer") {
              node = new DefaultNodeModel("Input", "rgb(0,102,255)");
              node.addPort(new DefaultPortModel(false, "out-1", "out"));

              add_node(node.id, node.name, [], this.props.app.getDiagramEngine().getDiagramModel().id)
              // console.log(this.props.app.getDiagramEngine().getDiagramModel().id)

              node.addListener({
                entityRemoved: function(e) {
                  console.log("You deleted Input node");
                  delete_node(e.entity.id)
                }

              })
            } else if (data.name === "out_layer") {

              node = new DefaultNodeModel("Output", "rgb(90,102,255)");
              node.addPort(new DefaultPortModel(true, "in-1", "In"));
              add_node(node.id, node.name, [], this.props.app.getDiagramEngine().getDiagramModel().id)

              node.addListener({
                entityRemoved: function(e) {
                  delete_node(e.entity.id)
                }

              })

            }
            else {
              node = new DefaultNodeModel("Dense", "rgb(0,192,255)");
              node.addPort(new DefaultPortModel(true, "in-1", "In"));
              node.addPort(new DefaultPortModel(false, "out-1", "Out"));
              add_node(node.id, node.name, [], this.props.app.getDiagramEngine().getDiagramModel().id)

              node.addListener({
                entityRemoved: function(e) {
                  delete_node(e.entity.id)
                }
              })

            }
            var points = this.props.app.getDiagramEngine().getRelativeMousePoint(event);
            node.x = points.x;
            node.y = points.y;
            this.props.app
              .getDiagramEngine()
              .getDiagramModel()
              .addNode(node);
            this.forceUpdate();
          }
}
						onDragOver = {
		          event => {
		            event.preventDefault();
		          }
}

						onDoubleClick = {
          event => {
            var selected_node = document.getElementsByClassName("srd-node--selected");
            var selected_link = document.getElementsByClassName("srd-default-link--path-selected ")

            if (selected_node.length > 0) {
              console.log(selected_node);
              console.log(selected_link);
              // data-nodeid
              var node_id = selected_node[0].getAttribute("data-nodeid");
              console.log(selected_node[0].getAttribute("data-nodeid"));
              if (node_id !== null) {
                this.toggleDrawer(true, node_id);
                this.setState({
                  tmp_id: node_id,
                })
              }
            }
            else if (selected_link.length > 0) {
              console.log(selected_link);
              // data-nodeid
              var link_id = selected_link[1].getAttribute("data-linkid");
              console.log(selected_link[1].getAttribute("data-linkid"));
              if (link_id !== null) {
                this.toggleDrawer(true, link_id);
                this.setState({
                  tmp_id: link_id,
                })
              }
            }
          }
        }
        >
        <DiagramWidget
							className="srd-demo-canvas"
							diagramEngine = { this.props.app.getDiagramEngine() }
							maxNumberPointsPerLink = {0}
        />
        </div>
        </div>
        </div>
        </div>
      );
	}
}
