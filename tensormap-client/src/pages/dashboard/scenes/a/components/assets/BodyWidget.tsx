import * as React from "react";
import { TrayWidget } from "./TrayWidget";
import { Application } from "./Application";
import { TrayItemWidget } from "./TrayItemWidget";
import { DefaultNodeModel, DiagramWidget, DefaultPortModel } from "storm-react-diagrams";
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

const _ = require("lodash")


export interface BodyWidgetProps {
	app: Application;
}

export interface BodyWidgetState {
	drawer:boolean;
	hidden:{
		param1:string,
	}
}

export default class BodyWidget extends React.Component<BodyWidgetProps,BodyWidgetState> {
	constructor(props: BodyWidgetProps) {
		super(props);
		this.state = {
			drawer:false,
			hidden:{
				param1:"",
			}
		};
	};

  toggleDrawer = (call_ : boolean, node_id : string) => {
    this.setState({drawer:call_});
		console.log(node_id);
  };

	get_serialized(){
		var str = JSON.stringify(this.props.app.getDiagramEngine().getDiagramModel().serializeDiagram());
		console.log(str);
		// var getnode = ReactDOM.findDOMNode().getElementsByClassName('srd-node--selected');

	}

	handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		console.log(event.target.value);
		this.setState({
			hidden:{
				param1:event.target.value
			}
		})
  };


	render() {
		return (
			<div>
			<Button onClick={this.get_serialized.bind(this)}>Send Graph</Button>
			<Button onClick={() => this.toggleDrawer(true, "durgesh")}>Open Right</Button>
			<Drawer anchor="right" open={this.state.drawer} onClose={() => this.toggleDrawer(false, "close")}>
				<div
					role="presentation"
				>
					<form noValidate autoComplete="off">
						<TextField value = {this.state.hidden.param1} onChange={(event: React.ChangeEvent<HTMLInputElement>) => this.handleChange(event)}>
						</TextField>
						</form>
				</div>
      </Drawer>

			<div className="body_wf">
				<div className="content">
					<TrayWidget>
						<TrayItemWidget model={{ type: "in",name:'inp_layer' }} name="Input Layer" color="rgb(192,255,0)" />
						<TrayItemWidget model={{ type: "out",name:'hid_layer' }} name="Hidden Layer" color="rgb(0,192,255)" />
						<TrayItemWidget model={{ type: "in",name:"out_layer" }} name="Output Layer" color="rgb(90,102,255)" />
					</TrayWidget>
					<div
						className="diagram-layer"
						onDrop={event => {
							var data = JSON.parse(event.dataTransfer.getData("storm-diagram-node"));
							var nodesCount = _.keys(
								this.props.app
									.getDiagramEngine()
									.getDiagramModel()
									.getNodes()
							).length;

							var node = null;
							if (data.name === "inp_layer") {
								node = new DefaultNodeModel("Input " + (nodesCount + 1), "rgb(192,255,0)");
								node.addInPort("In");
							} else if (data.name === "out_layer") {
								node = new DefaultNodeModel("Output " + (nodesCount + 1), "rgb(90,102,255)");
								node.addPort(new DefaultPortModel(true, "in-1", "In"));
							}
							else {
								node = new DefaultNodeModel("Hidden " + (nodesCount + 1), "rgb(0,192,255)");
								node.addPort(new DefaultPortModel(true, "in-1", "In"));
								node.addPort(new DefaultPortModel(false, "out-1", "Out"));
							}
							var points = this.props.app.getDiagramEngine().getRelativeMousePoint(event);
							node.x = points.x;
							node.y = points.y;
							this.props.app
								.getDiagramEngine()
								.getDiagramModel()
								.addNode(node);
							this.forceUpdate();
						}}
						onDragOver={event => {
							event.preventDefault();
						}}

						onDoubleClick={event => {
								var selected_node =	document.getElementsByClassName("srd-node--selected");
								if (selected_node.length > 0){
									console.log(selected_node);
									// data-nodeid
									var node_id = selected_node[0].getAttribute("data-nodeid");
									console.log(selected_node[0].getAttribute("data-nodeid"));
									if (node_id !== null){
										this.toggleDrawer(true,node_id);
									}
								}
						}}
					>
						<DiagramWidget className="srd-demo-canvas" diagramEngine={this.props.app.getDiagramEngine()} />
					</div>
				</div>
			</div>
			</div>
		);
	}
}
