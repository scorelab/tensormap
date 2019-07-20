import * as React from "react";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import List from '@material-ui/core/List';
import ListItem, { ListItemProps } from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';


export interface TrayWidgetProps {
	nntype:string;
}

export interface TrayWidgetState {}

export class TrayWidget extends React.Component<TrayWidgetProps, TrayWidgetState> {

	constructor(props: TrayWidgetProps) {
		super(props);
		this.state = {};
	}

	render() {
		return(
				<ExpansionPanel square>
	        <ExpansionPanelSummary
	          expandIcon={<ExpandMoreIcon />}
	          aria-controls="panel1a-content"
	          id="panel1a-header"
	        >
	          <Typography>{this.props.nntype}</Typography>
	        </ExpansionPanelSummary>
	        <ExpansionPanelDetails>
							<Typography>
								<List component="nav" aria-label="Main mailbox folders">
									{this.props.children}
								</List>
							</Typography>
	        </ExpansionPanelDetails>
	      </ExpansionPanel>);

	}
}
