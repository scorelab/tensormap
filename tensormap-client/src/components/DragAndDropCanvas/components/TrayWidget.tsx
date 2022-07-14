import * as React from 'react';
import styled from '@emotion/styled';

namespace S {
	export const Tray = styled.div`
		min-width: 200px;
		background: rgb(20, 20, 20);
		flex-grow: 0;
		flex-shrink: 0;
	`;
}

export function TrayWidget(props:any){

		const {childern}=props
		return <S.Tray>{childern}</S.Tray>;

}
