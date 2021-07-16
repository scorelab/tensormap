import * as React from 'react';

import BodyWidget from './components/BodyWidget';
import { Application } from './Application';

const Canvas = ( )=> {
	const app = new Application();
	return (
		<div>
			<BodyWidget app={app} />
		</div>
	);
};

export default Canvas;
