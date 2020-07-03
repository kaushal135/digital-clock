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
    return (
      <div className="App">
        <header className="App-header">
            {this.state.hours} : {this.state.mins} : {this.state.sec}
        </header>
      </div>
      );
  }

  //get the date and update the state accordingly
  tick(){
    const d = new Date();
    
    this.setState({
      hours : d.getHours(), 
      mins : d.getMinutes(), 
      sec : d.getSeconds()
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
