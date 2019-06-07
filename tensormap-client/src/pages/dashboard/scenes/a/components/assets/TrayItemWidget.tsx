import * as React from "react";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


export interface TrayItemWidgetProps {
	model: any;
	color?: string;
	name: string;
}

export interface TrayItemWidgetState {}

export class TrayItemWidget extends React.Component<TrayItemWidgetProps, TrayItemWidgetState> {
	constructor(props: TrayItemWidgetProps) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div
					style={{ borderColor: '#fff' }}
					draggable={true}
					onDragStart={event => {
						event.dataTransfer.setData("storm-diagram-node", JSON.stringify(this.props.model));
					}}
					className="tray-item">
      <ExpansionPanel square>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>{this.props.name}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
						This is a {this.props.name}, drag it...
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
		);
	}
}
