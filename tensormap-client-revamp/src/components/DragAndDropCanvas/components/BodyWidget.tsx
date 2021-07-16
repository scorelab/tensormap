import * as React from 'react';
import * as _ from 'lodash';
import { TrayWidget } from './TrayWidget';
import { Application } from '../Application';
import { DefaultNodeModel } from '@projectstorm/react-diagrams';
import { CanvasWidget } from '@projectstorm/react-canvas-core';
import { DemoCanvasWidget } from '../helpers/DemoCanvasWidget';
import styled from '@emotion/styled';
import NodeList from "../NodesList/NodeList";
import * as strings from "../../../constants/Strings";
import {subject} from "../../../services";

export interface BodyWidgetProps {
	app: Application;
}

namespace S {
	export const Body = styled.div`
		flex-grow: 1;
		display: flex;
		flex-direction: column;
		min-height: 60vh;
		min-width: 50vw;
		max-width: 60vw;
	`;

	export const Header = styled.div`
		display: flex;
		background: rgb(30, 30, 30);
		flex-grow: 0;
		flex-shrink: 0;
		color: white;
		font-family: Helvetica, Arial, sans-serif;
		padding: 10px;
		align-items: center;
	`;

	export const Content = styled.div`
		display: flex;
		flex-grow: 1;
	`;

	export const Layer = styled.div`
		position: relative;
		flex-grow: 1;
	`;
}

class BodyWidget extends React.Component<BodyWidgetProps> {

	state ={inputNodes:[], flattenNodes:[], denseNodes:[]}

	inputNodesHandler = (nodeID : string)=> {
		let currentNodes = [...this.state.inputNodes];
		// @ts-ignore
		currentNodes.push(nodeID);
		this.setState({...this.state, inputNodes: currentNodes}, ()=>{subject.next(this.state)});
	}

	flattenNodesHandler = (nodeID : string)=> {
		let currentNodes = [...this.state.flattenNodes];
		// @ts-ignore
		currentNodes.push(nodeID);
		this.setState({...this.state, flattenNodes: currentNodes}, ()=>{subject.next(this.state)});
	}

	denseNodesHandler = (nodeID : string)=> {
		let currentNodes = [...this.state.denseNodes];
		// @ts-ignore
		currentNodes.push(nodeID);
		this.setState({...this.state, denseNodes: currentNodes}, ()=>{subject.next(this.state)});
	}


	render() {
		return (
			<S.Body>
				<S.Header>
					<div className="title"> Model Deep neural network</div>
				</S.Header>
				<S.Content>
					<TrayWidget>
						<NodeList/>
					</TrayWidget>
					<S.Layer
						onDrop={(event) => {
							let data = JSON.parse(event.dataTransfer.getData('storm-diagram-node'));
							let nodesCount = _.keys(this.props.app.getDiagramEngine().getModel().getNodes()).length;


							let node: DefaultNodeModel;
							if (data.type === strings.DL_MODEL_INPUT_TYPE) {
								const nodeID = strings.DL_MODEL_INPUT_NAME + " " + (nodesCount + 1);
								node = new DefaultNodeModel(nodeID,strings.DL_MODEL_INPUT_COLOR);
								node.addOutPort(strings.DL_NODE_OUT);
								this.inputNodesHandler(nodeID);


							}else if (data.type === strings.DL_MODEL_FLATTEN_TYPE) {
								const nodeID = strings.DL_MODEL_FLATTEN_NAME + " " + (nodesCount + 1);
								node = new DefaultNodeModel(nodeID,strings.DL_MODEL_FLATTEN_COLOR);
								node.addInPort(strings.DL_NODE_IN);
								node.addOutPort(strings.DL_NODE_OUT);
								this.flattenNodesHandler(nodeID)

							}else {
								const nodeID = strings.DL_MODEL_DENSE_NAME + " " + (nodesCount + 1);
								node = new DefaultNodeModel(nodeID,strings.DL_MODEL_DENSE_COLOR);
								node.addInPort(strings.DL_NODE_IN);
								node.addOutPort(strings.DL_NODE_OUT);
								this.denseNodesHandler(nodeID)
							}
							let point = this.props.app.getDiagramEngine().getRelativeMousePoint(event);
							node.setPosition(point);
							this.props.app.getDiagramEngine().getModel().addNode(node);
							this.forceUpdate();
						}}
						onDragOver={(event) => {
							event.preventDefault();
						}}>
						<DemoCanvasWidget>
							<CanvasWidget engine={this.props.app.getDiagramEngine()} />
						</DemoCanvasWidget>
					</S.Layer>
				</S.Content>
			</S.Body>
		);
	}
}

export default BodyWidget;
