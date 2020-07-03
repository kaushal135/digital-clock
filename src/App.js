import React from 'react';
import './App.css';

class TimeComponent extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      hours : 0,
      mins : 0,
      sec : 0
    };
  }

  render(){
    const time = this.formatTime(this.state.hours,this.state.mins,this.state.sec);
    return (
      <div className="App">
        <header className="App-header">
            {time}
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
