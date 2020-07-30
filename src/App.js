import React from 'react';
import './App.css';

//controlled component
class ToggleButton extends React.Component{
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  //will call the onChange passed in as a prop
  handleChange(event){
    this.props.onChange(event.target.checked);
  }

  render(){
    return(
      <div className="Menu">
        12 Hour Mode:
        <label className="switch">
          <input type="checkbox" onChange={this.handleChange} checked={this.props.value}/>
          <span className="slider"></span>
        </label>
      </div>
    );
  }
}

class TimeComponent extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      hours : 0,
      mins : 0,
      sec : 0,
      is12hrMode : false
    };

    this.handleChange = this.handleChange.bind(this);
  }

  //handle change method to set the state of the toggle button
  handleChange(value){
    this.setState({is12hrMode:value});
  }

  render(){

    const time = this.formatTime(this.state.hours,this.state.mins,this.state.sec);
    return (
      <div className="App">
        <header className="App-header">
            <ToggleButton value={this.state.is12hrMode} onChange={this.handleChange}/>
            <div className="Time">
              {time}
            </div>
        </header>
      </div>
      );
  }

  //returns a string representation of time in the HH:MM:SS format
  formatTime(hours,mins,sec){
    return [hours,mins,sec]
      .map((x) => ('' + x).padStart(2,'0')) //returns a new array with each thing thats a string and padded with a '0' if required
      .join(':');                           //joins all elements and add a ':' in between them
  }

  //get the date and update the state accordingly
  tick(){
    const date = new Date();

    this.setState({
      hours : date.getHours(), 
      mins : date.getMinutes(), 
      sec : date.getSeconds()
    });

    //if we want to set this to 12 hours mode we simply subtract 12 if the hours is greater than 12
    if(this.state.is12hrMode && this.state.hours > 12){
      this.setState({
        hours : this.state.hours - 12 
      });
    }
  }

  //register a callback method which will call tick every 100 milliseconds
  componentDidMount(){
    this.interval = setInterval(() => this.tick(), 100);
  }

  //unregister the call back
  componentWillUnmount(){
    clearInterval(this.interval);
  }
}


export default TimeComponent;
