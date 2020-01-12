import React, { Component } from 'react'
import { processedData as data } from '../constants/ProcessData';
import { SankeyData } from '../constants/SankeyData';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import Details from './Details';

import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';

import { Trans } from "react-i18next";

import { sankey, sankeyLinkHorizontal } from "d3-sankey";

const SankeyNode = ({ name, x0, x1, y0, y1, color, text, selected }) => {
  return(
    text ?
      <OverlayTrigger
        placement="auto"
        delay={{ show: 200, hide: 200 }}
        text={text}
        overlay={
          <Tooltip>
            <Trans>{text}</Trans>
          </Tooltip>
        }
      >
        <g>
          <rect x={x0} y={y0} width={x1 - x0} height={y1 - y0} fillOpacity={selected ? ".75":".5"} fill={color}></rect>
          <text x={x0+10} y={y0+((y1-y0)/2)+5} fill={selected ? "blue":"white"} fontSize="15" fontWeight="600">
            <Trans>{name}</Trans>
          </text>
        </g>
      </OverlayTrigger>
      : 
      <g>
        <rect x={x0} y={y0} width={x1 - x0} height={y1 - y0} fillOpacity=".3" fill={color}></rect>
        <text x={x0+10} y={y0+((y1-y0)/2)+5} fill="white" fontSize="15" fontWeight="3">
          <Trans>{name}</Trans>
        </text>
      </g>
  )
};

const SankeyLink = ({ link, color }) => (
  <path
    d={sankeyLinkHorizontal()(link)}
    style={{
      fill: "none",
      strokeOpacity: ".3",
      stroke: color,
      strokeWidth: Math.max(1, link.width)
    }}
  />
);

const getNode = (i) => {
  var type = null;
  var id = null;
  const midPoint = SankeyData.expenditures.length;
  
  if(i>midPoint){
    return{
      type: "incomes",
      id: i-midPoint-1
    }
  }
  else{
    if(i===midPoint){
      return{
        type: type,
        id: id
      }
    }
    else{
      return{
        type: "expenditures",
        id: i
      }
    }
  }
}

class Landing extends Component {
  constructor(props){
    super(props);
    this.state = {
      selectedIndex: SankeyData.expenditures.length
    }
  }

  selectTile = (index) => {
    this.setState({
      selectedIndex: index
    })
  }

  render(){
    var margin = { top: 10, right: 0, bottom: 10, left: 0 };
    var width = 700 - margin.left - margin.right;
    var height = 600 - margin.top - margin.bottom;
  
    const { nodes, links } = sankey()
      .nodeWidth(120)
      .nodePadding(20)
      .extent([[1, 1], [width - 1, height - 5]])(data);
    
    const midPoint = SankeyData.expenditures.length-1;
    const {selectedIndex} = this.state;
    
    const selectedData = getNode(selectedIndex).type ? 
                          SankeyData[getNode(selectedIndex).type][getNode(selectedIndex).id] 
                          : 
                          null;
    
    return (
      <div className="row container-fluid p-30">
          <div style={{width: "75%", maxWidth: "800px", marginLeft: "100px"}}>
            <h2><Trans>Sankey Diagram</Trans></h2>
            <svg width="100%" height="600">
                <g style={{ mixBlendMode: "multiply" }}>
                    {nodes.map((node, i) => {
                      var s = getNode(i);
                      return(
                        <g
                          key={i}
                          onClick={() => this.selectTile(i)}
                          className="cursor-pointer">
                          <SankeyNode
                          {...node}
                          color={i>midPoint ? i===midPoint+1 ? "url(#gradient)" : "red" : "green"}
                          x0={node.x0}
                          x1={node.x1}
                          y0={node.y0}
                          y1={node.y1}
                          name={node.name}
                          selected={selectedIndex===i}
                          text = {s.type ? SankeyData[s.type][s.id].text : null}
                          />
                        </g>
                    )})}
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="green" />
                        <stop offset="100%" stopColor="red" />
                      </linearGradient>
                    </defs>
                    {links.map((link, i) => (
                        <SankeyLink
                        key={i}
                        link={link}
                        color={i>midPoint ? "red" : "green"}
                        />
                    ))}
                </g>
            </svg>
          </div>
          <div className="col-lg-3 p-0">
              <TransitionGroup style={{position: 'sticky', top: '3em'}}>
                <CSSTransition
                    key={selectedIndex}
                    timeout={300}
                    classNames="fade"
                  >
                  <Details data={selectedData}/>  
                </CSSTransition>
              </TransitionGroup>
          </div>
      </div>
    );
  }  
  
};

export default Landing;
