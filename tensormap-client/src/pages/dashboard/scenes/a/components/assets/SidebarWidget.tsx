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


export interface SidebarWidgetProps {
}

export interface SidebarWidgetState {}

export class SidebarWidget extends React.Component<SidebarWidgetProps, SidebarWidgetState> {

	constructor(props: SidebarWidgetProps) {
		super(props);
		this.state = {};
	}

	render() {
		console.log(this.props.children);
		return (
			<div className="tray">
				{this.props.children}
			</div>);
	}
}
