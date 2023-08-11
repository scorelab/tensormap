import React from 'react'
import HeatMap from 'react-heatmap-grid'
import { Header} from 'semantic-ui-react'

const HeatMapComp = (props) => {
  console.log(props)
  const xLabels = Object.keys(props.corrMatrix);
    const data = xLabels.map(x => {
        return Object.keys(props.corrMatrix[x]).map(y => props.corrMatrix[x][y]);
    });
  return (
    <div><Header size='medium' textAlign='center' style={{ marginTop: '20px' }} >Co-relation Matrix</Header>
    <div style={{ display:'flex',flexDirection:'column',alignItems: 'center', justifyContent: 'center' ,fontSize: '10px',lineHeight:'1.8'}}>    
    <HeatMap
        xLabels={xLabels}
        yLabels={xLabels}
        xLabelWidth={80}
        yLabelWidth = {80}	
        xLabelsLocation={'bottom'}
        yLabelsLocation={'left'}
        data={data}
        height={30}
        cellStyle={(background, value, min, max, data, x, y) => ({
            background: `rgba(66, 86, 244, ${1 - (max - value) / (max - min)})`,
            fontSize: "11px",
        })}
        cellRender={value => value && `${value.toFixed(4)}`}
    />
</div></div>
  )
}

export default HeatMapComp