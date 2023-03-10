import {Component} from 'react'

import './index.css'

class DigitalTimer extends Component {
  constructor(props) {
    super(props)
    this.state = {timeLimit: 25, timeElapsedInSeconds: 0, isTimerRunning: false}
  }

  componentWillUnmount() {
    this.clearTimerInterval()
  }

  onClickDecrementTime = () => {
    this.setState(prevState => ({
      timeLimit: prevState.timeLimit - 1,
    }))
  }

  onClickIncrementTime = () => {
    this.setState(prevState => ({
      timeLimit: prevState.timeLimit + 1,
    }))
  }

  renderTimerInterval = () => {
    const {timeElapsedInSeconds, timeLimit} = this.state
    const buttonsDisabled = timeElapsedInSeconds > 0
    return (
      <div className="set-timer-controller">
        <p className="set-time">Set Timer Limit</p>
        <div className="timer-buttons-container">
          <button
            className="timer-btn"
            type="button"
            disabled={buttonsDisabled}
            onClick={this.onClickDecrementTime}
          >
            -
          </button>
          <div className="set-timer-icon">
            <p className="time-interval">{timeLimit}</p>
          </div>
          <button
            className="timer-btn"
            type="button"
            disabled={buttonsDisabled}
            onClick={this.onClickIncrementTime}
          >
            +
          </button>
        </div>
      </div>
    )
  }

  clearTimerInterval = () => clearInterval(this.intervalId)

  onReset = () => {
    this.clearTimerInterval()
    this.setState({
      timeLimit: 25,
      timeElapsedInSeconds: 0,
      isTimerRunning: false,
    })
  }

  incrementedTimeElapseInSeconds = () => {
    const {timeLimit, timeElapsedInSeconds} = this.state
    const isTimerCompleted = timeElapsedInSeconds === timeLimit * 60
    if (isTimerCompleted) {
      this.clearTimerInterval()
      this.setState({isTimerRunning: false})
    } else {
      this.setState(prevState => ({
        timeElapsedInSeconds: prevState.timeElapsedInSeconds + 1,
      }))
    }
  }

  onStartAndPause = () => {
    const {timeLimit, timeElapsedInSeconds, isTimerRunning} = this.state
    const isTimerCompleted = timeElapsedInSeconds === timeLimit * 60
    if (isTimerCompleted) {
      this.setState({timeElapsedInSeconds: 0})
    }
    if (isTimerRunning) {
      this.clearTimerInterval()
    } else {
      this.intervalId = setInterval(this.incrementedTimeElapseInSeconds, 1000)
    }
    this.setState(prevState => ({
      isTimerRunning: !prevState.isTimerRunning,
    }))
  }

  renderTimerController = () => {
    const {isTimerRunning} = this.state
    const imageUrl = isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const imageText = isTimerRunning ? 'pause icon' : 'play icon'
    const statusText = isTimerRunning ? 'Pause' : 'Start'
    return (
      <div className="controller-options">
        <button
          className="btn-control"
          type="button"
          onClick={this.onStartAndPause}
        >
          <img src={imageUrl} alt={imageText} className="icon" />
          <p className="icon-text">{statusText}</p>
        </button>
        <button className="btn-control" type="button" onClick={this.onReset}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
            alt="reset icon"
            className="icon"
          />
          <p className="icon-text">Reset</p>
        </button>
      </div>
    )
  }

  getElapsedTimer = () => {
    const {timeLimit, timeElapsedInSeconds} = this.state
    const timeRemainingInSeconds = timeLimit * 60 - timeElapsedInSeconds
    const minutes = Math.floor(timeRemainingInSeconds / 60)
    const seconds = Math.floor(timeRemainingInSeconds % 60)
    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`
    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  render() {
    const {isTimerRunning} = this.state
    const timerStatus = isTimerRunning ? 'Running' : 'Paused'
    return (
      <div className="digital-bg-container">
        <h1 className="heading">Digital Timer</h1>
        <div className="timer-display-container">
          <div className="elapsed-timer-container">
            <div className="elapsed-time-card">
              <h1 className="elapsed-time">{this.getElapsedTimer()}</h1>
              <p className="timer-status">{timerStatus}</p>
            </div>
          </div>
          <div className="timer-controller-options">
            {this.renderTimerController()}
            {this.renderTimerInterval()}
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
