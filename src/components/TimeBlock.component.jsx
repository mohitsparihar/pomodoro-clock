import React from 'react'
import timeLib from './../utils/time';
import './TimeBlock.component.css';

const TimeBlock = (props) => {
  function add() {
    props.handlerAdd(props.label);
  }
  function sub() {
    props.handlerSub(props.label);
  }

  let lowerCaseLabel = props.label.toLowerCase();
  return (
    <div className="container" style={{ display: "flex" }}>
      <div className="label" id={lowerCaseLabel + '-label'}>{props.label + '  Length'}</div>
      <div className="controls">
        <button id={lowerCaseLabel + '-decrement'} onClick={sub}><i class="arrow left"></i></button>
        <div className="time-length" id={lowerCaseLabel + '-length'}>{timeLib.toMM(props.length)}</div>
        <button id={lowerCaseLabel + '-increment'} onClick={add}><i class="arrow right"></i></button>
      </div>
    </div>
  )
}
export default TimeBlock;