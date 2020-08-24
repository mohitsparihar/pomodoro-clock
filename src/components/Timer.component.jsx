import React from 'react';
import timeLib from './../utils/time';
import './Timer.component.css'

const Timer = (props) => {
    return (
      <div id={props.idName} className="time-block">
        <div className="label">{props.label}</div>
        <div className="display" id="time-left">{timeLib.toMMSS(props.time)}</div>
        <div className="control-btn">
          {!props.status && <div id="start_stop" className="play-btn btn" onClick={props.startHandler}>Start</div>}
          {props.status && <div id="start_stop" className="pause-btn btn" onClick={props.pauseHandler}>Pause</div>}
          <div id="reset" className="reset-btn btn" onClick={props.resetHandler}>Reset</div>
        </div>
      </div>
    )
  }
  export default Timer;