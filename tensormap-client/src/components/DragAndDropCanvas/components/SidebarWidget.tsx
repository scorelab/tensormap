import * as React from "react";

export interface SidebarWidgetProps {
	children: React.ReactNode;
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

// export const SidebarWidget =(props:any)=>{

// 	console.log(props.childern)
// 	return (
// 		<>
// 			<div className="tray">
// 				{props.children}
// 			</div>);
// 		</>
// 	);

// }

// export const DemoCanvasWidget =(props:any)=>{

// 	console.log(props)
// 	return (
// 		<>
// 			<Global styles={S.Expand} />
// 			<S.Container
// 				background={props.background || 'rgb(60, 60, 60)'}
// 				color={props.color || 'rgba(255,255,255, 0.05)'}>
// 				{props.childern}
// 			</S.Container>
// 		</>
// 	);

// }
// export class DemoCanvasWidget extends React.Component<DemoCanvasWidgetProps> {
// render() {
// 	return (
// 		<>
// 			<Global styles={S.Expand} />
// 			<S.Container
// 				background={this.props.background || 'rgb(60, 60, 60)'}
// 				color={this.props.color || 'rgba(255,255,255, 0.05)'}>
// 				{this.props.children}
// 			</S.Container>
// 		</>
// 	);
// }
// }
