import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Highlight from 'react-highlight';
import Typography from '@material-ui/core/Typography';
// import hljs from 'highlight.js';
// import python from 'highlight.js/lib/languages/python';

// import 'highlight.js/styles/github.css';
// // import Highlight from 'react-highlight-js';
// var Highlight = require ('react-highlight-js');
// const hljs = require("highlight.js/lib/highlight.js");
// hljs.registerLanguage('python', require('highlight.js/lib/languages/python'));

const text_style = {
    color:"red"
  
}



// const highlightedCode = hljs.highlight('html', '<span>Hello World!</span>').value


// import hljs from 'highlight.js/lib/highlight';

// const hljs = require('./highlight.js');

interface TabContainerProps {
  children?: React.ReactNode;
}

interface SimpleTabsProps {
  code:string;
  runtimeData:string;
}

function TabContainer(props: TabContainerProps) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default function SimpleTabs(props: SimpleTabsProps) {
  const [value, setValue] = React.useState(0);

    

  function handleChange(event: React.ChangeEvent<{}>, newValue: number) {
    setValue(newValue);
  }

  let newText = props.code.split('\n').map((item, i) => {
  let color = {
      color:'rgb('+ Math.random()*255 +','+ Math.random()*255 +', '+ Math.random()*255 +' )' 
    };
    return <p key={i} style={color}>{item}</p>;
  });
  // const highlightedCode = hljs.highlightAuto(props.code).value;
  // const highlightedCode = hljs.highlight('python',(props.code)).value;

  return (
    <div className="log_main">
      <div>
        <AppBar position="static" color="default">
          <Tabs value={value} onChange={handleChange} >
            <Tab label="Logs" />
            <Tab label="Code" />
          </Tabs>
        </AppBar>
        
        {console.log(props.runtimeData)}
        {value === 0 && <TabContainer>{props.runtimeData}</TabContainer>}
        {console.log(props.code)}
  {value === 1 && <TabContainer>
    <div style = {text_style}>
    <Highlight >
   {/* {"html with multiple code snippets"} */}
    {newText}

  </Highlight>
    </div>
     
        </TabContainer>}
      </div>
    </div>
  );
}

SimpleTabs.propTypes = {
  code: PropTypes.string.isRequired,
  runtimeData: PropTypes.string.isRequired,
};
