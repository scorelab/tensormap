import * as SRD from "storm-react-diagrams";

export class Application {
	protected activeModel: SRD.DiagramModel;
	protected diagramEngine: SRD.DiagramEngine;

	constructor() {
		this.diagramEngine = new SRD.DiagramEngine();
		this.diagramEngine.installDefaultFactories();
    this.activeModel = new SRD.DiagramModel();
		this.newModel();
	}

	public newModel() {
		this.activeModel = new SRD.DiagramModel();
		this.diagramEngine.setDiagramModel(this.activeModel);

		//3-A) create a default node
		var node1 = new SRD.DefaultNodeModel("Input Layer", "rgb(192,255,0)");
		let port = node1.addOutPort("Out");
		node1.setPosition(100, 100);

		this.activeModel.addAll(node1);
	}

	public getActiveDiagram(): SRD.DiagramModel {
		return this.activeModel;
	}

	public getDiagramEngine(): SRD.DiagramEngine {
		return this.diagramEngine;
	}
}
