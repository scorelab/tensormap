import * as React from "react";
import { TrayWidget } from "./TrayWidget";
import { Application } from "./Application";
import { TrayItemWidget } from "./TrayItemWidget";
import { DefaultNodeModel,NodeModel, DiagramWidget, DefaultPortModel,PortModel } from "storm-react-diagrams";
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import socketIOClient from "socket.io-client";

const _ = require("lodash")

const endpoint  = "ws://localhost:5000/nn";

export interface BodyWidgetProps {
	app: Application;
}

export interface BodyWidgetState {
	drawer:boolean;
	tmp_id:string;
	node:
		{
			id:string;
			param:Array<any>;
		}[];
	tmp_form:{
		[key:string]: any;
	}
}

export default class BodyWidget extends React.Component<BodyWidgetProps,BodyWidgetState> {
	constructor(props: BodyWidgetProps) {
		super(props);
		this.state = {
			drawer:false,
			tmp_id:"",
			node:[
				{
					id:"",
					param:new Array(),
				}
			]
			,
			tmp_form:
			{
				param1:"",
				param2:"",
			}
		};

		this.handleNodeDelete = this.handleNodeDelete.bind(this)
		this.handleNodeAdd = this.handleNodeAdd.bind(this)
	};

	componentDidMount(){
    const socket = socketIOClient(endpoint);
    socket.on("nn_execute", (data:any) => console.log(data));
	}

  toggleDrawer = (call_ : boolean, node_id : string) => {
    this.setState({drawer:call_});
		console.log(node_id);
  };

	get_serialized(){
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
			id:this.state.tmp_id,
			param:param_,
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
			graph:[json_graph],
			node_param:node_data
		}
		console.log(comp_data);
		const socket = socketIOClient(endpoint);
	 	socket.emit('nn_execute', comp_data)
	}

	handleNodeDelete = (nodeid:string) => {
		var data = {
			layerID:nodeid
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

	handleNodeAdd = (nodeid:string, layertype:string, layerSpec:Array<any>, parentnode:string) => {
		var data = {
			layerId:nodeid,
			layerType:layertype,
			layerSpec:layerSpec,
			parentNodeId:parentnode
		}
		console.log(data);
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



	render() {
		return (
			<div>

			<Button className={'send_btn'} onClick={() => this.handleExecute()}>Send</Button>
			<Drawer anchor="right" open={this.state.drawer} onClose={() => this.toggleDrawer(false, "close")}>

				<div
					role="presentation"
				>
					<form noValidate autoComplete="off">
						<TextField  id="standard-name" label="param1" value = {this.state.tmp_form.param1} onChange={(event: React.ChangeEvent<HTMLInputElement>) => this.handleChange(0, "param1", event)} margin="normal">
						</TextField>
						<br/>
						<TextField  id="standard-name" label="param2" value = {this.state.tmp_form.param2} onChange={(event: React.ChangeEvent<HTMLInputElement>) => this.handleChange(1, "param2", event)} margin="normal">
						</TextField>
						<br/>
						<Button onClick={() => this.handleSave()}>Save</Button>
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

							var delete_node = this.handleNodeDelete
							var add_node = this.handleNodeAdd

							var node = null;
							if (data.name === "inp_layer") {
								node = new DefaultNodeModel("Input " + (nodesCount + 1), "rgb(0,102,255)");
								node.addPort(new DefaultPortModel(false, "out-1", "out"));


								// add_node()
								console.log(node)

								node.addListener({
									entityRemoved: function(e){
										console.log("You deleted Input " + (nodesCount + 1));
										delete_node(e.entity.id)
									}

								})
							} else if (data.name === "out_layer") {
								node = new DefaultNodeModel("Output " + (nodesCount + 1), "rgb(90,102,255)");
								node.addPort(new DefaultPortModel(true, "in-1", "In"));

								node.addListener({
									entityRemoved: function(e){
										console.log("You deleted Output " + (nodesCount + 1))
									}
								})

							}
							else {
								node = new DefaultNodeModel("Hidden " + (nodesCount + 1), "rgb(0,192,255)");
								node.addPort(new DefaultPortModel(true, "in-1", "In"));
								node.addPort(new DefaultPortModel(false, "out-1", "Out"));

								node.addListener({
									entityRemoved: function(e){
										console.log("You deleted Hidden " + (nodesCount + 1))
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
										this.setState({
											tmp_id : node_id,
										})
									}
								}
						}}
					>
						<DiagramWidget
							className="srd-demo-canvas"
							diagramEngine={this.props.app.getDiagramEngine()}
							 />
					</div>
				</div>
			</div>
			</div>
		);
	}
}
