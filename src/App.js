import React from 'react';
import './App.css';
import TimeBlock from './components/TimeBlock.component'
import Timer from './components/Timer.component';
import beep from './assets/beep.wav';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      session: 1500,
      break: 300,
      time: 1500,
      isInSession: true,
      isRunning: false
    }
    this.handleTime = this.handleTime.bind(this);
    this.handleStart = this.handleStart.bind(this);
    this.handlePause = this.handlePause.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleSub = this.handleSub.bind(this);

    this.timerChange = '';
  }

  playBeep() {
    let x = document.getElementById("beep");
    x.play();
  }

  stopBeep() {
    let x = document.getElementById("beep");
    x.pause();
    x.currentTime = 0;
  }

  handleTime() {
    this.timerChange = setInterval(() => {
      // let runningTime = this.state.currentTime 
      let counter = this.state.time;
      if (counter > 0) {
        this.setState({
          time: counter - 1,
        })
      } else {
        if (this.state.isInSession) {
          this.setState({
            time: this.state.break,
            isInSession: false
          })
        } else (
          this.setState({
            time: this.state.session,
            isInSession: true
          })
        )
        this.playBeep();
      }
    }, 1000)
  }

  handleStart() {
    if (!this.state.isRunning) {
      this.handleTime();
      this.setState({
        isRunning: true
      })
    }
  }

  handlePause() {
    if (this.state.isRunning) {
      clearInterval(this.timerChange);
      this.setState({
        isRunning: false
      })
    }
  }

  handleReset() {
    this.handlePause();
    this.setState({
      session: 1500,
      break: 300,
      time: 1500,
      isInSession: true,
      isRunning: false
    })
    this.stopBeep();
  }

  handleAdd(label) {
    if (!this.state.isRunning) {
      if (label === 'Session') {
        console.log(label)
        let val = this.state.session + 60
        if (val > 3600) {
          return;
        }
        this.setState({
          session: val,
        })
        if (this.state.isInSession) {
          this.setState({
            time: val
          })
        }
      } else {
        console.log(label)
        let val = this.state.break + 60
        if (val > 3600) return;
        this.setState({
          break: val,
        })
        if (!this.state.isInSession) {
          this.setState({
            time: val
          })
        }
      }
    }
  }

  handleSub(label) {
    if (!this.state.isRunning) {
      if (label === 'Session') {
        if (this.state.session > 60) {
          let val = this.state.session - 60
          this.setState({
            session: val,
          })
          if (this.state.isInSession) {
            this.setState({
              time: val
            })
          }
        }
      } else {
        if (this.state.break > 60) {
          let val = this.state.break - 60
          this.setState({
            break: val,
          })
          if (!this.state.isInSession) {
            this.setState({
              time: val
            })
          }
        }
      }
    }
  }

  render() {

    return (
      <div className="App">
        <h1>Pomodoro Clock</h1>
        <div className="change-div">
          <TimeBlock
            label="Break"
            length={this.state.break}
            handlerAdd={this.handleAdd}
            handlerSub={this.handleSub} />
          <TimeBlock
            label="Session"
            length={this.state.session}
            handlerAdd={this.handleAdd}
            handlerSub={this.handleSub} />
        </div>
        <Timer idName="timer-label"
          status={this.state.isRunning}
          time={this.state.time}
          label={this.state.isInSession ? "SESSION" : "BREAK"}
          startHandler={this.handleStart}
          pauseHandler={this.handlePause}
          resetHandler={this.handleReset} />
        <audio id="beep" src={beep}></audio>
      </div>
    );
  }
}

export default App;
