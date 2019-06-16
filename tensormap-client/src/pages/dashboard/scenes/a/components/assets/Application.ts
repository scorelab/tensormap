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

		var node1 = new SRD.DefaultNodeModel("Input", "rgb(0,192,255)");
		let port = node1.addOutPort("Out");
		node1.setPosition(100, 100);

		var node2 = new SRD.DefaultNodeModel("Hidden 0", "rgb(192,255,0)");
		let port2 = node2.addInPort("In");
		node2.addPort(new SRD.DefaultPortModel(false, "out-1", "Out"));
		node2.setPosition(400, 100);

		let link1 = port.link(port2);

		this.activeModel.addAll(node1, node2, link1);
	}

	public getActiveDiagram(): SRD.DiagramModel {
		return this.activeModel;
	}

	public getDiagramEngine(): SRD.DiagramEngine {
		return this.diagramEngine;
	}
}
