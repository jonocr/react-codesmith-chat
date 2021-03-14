import React, { Component } from 'react';
import { render } from 'react-dom';

class App extends Component {
  render() {
    return (
      <div>
        <h1>Chat 42</h1>
        <Screen/>
        <Input/>
      </div>
    );
  }
}

class Screen extends Component {
   constructor(props){
     super()
     this.state = { messages : []}
     this.getMessages = this.getMessages.bind(this);
   }

   componentDidMount() {
     console.log("componentDidMount");
    //  this.getMessages();
     setInterval(this.getMessages, 2500);
   }

   getMessages() {
      fetch('https://curriculum-api.codesmith.io/messages')
            .then(response => response.json())
            .then((data) => {
              console.log("messages: ", data);
              const filtered = data.slice(0,20);
              this.setState({messages: filtered.reverse()});
                
      });
   }

   componentDidUpdate() {
    console.log("componentDidUpdate");

   }

   componentWillUnmount() {
    console.log("componentWillUnmount");

   }

  render(){
    console.log("render");
    const msgs = this.state.messages;
    const html = [];

    for (let i = 0; i < msgs.length; i += 1){
      html.push(<div key={`msg${i}`} className="message-container">
        <div className="user">{msgs[i]['created_by']}</div>
        <div className="message">{msgs[i]['message']}</div>
      </div>)
    }
    return (
      <div>
        {html}
      </div>
      
    )
  }
}


class Input extends Component {
    constructor(props) {
      super();
      this.onEnter = this.onEnter.bind(this);
    }


  //Render ()
  onEnter(e){
    // console.log(e.key);
    if (e.key === 'Enter'){
      const data = JSON.stringify({
        'created_by': 'Jono',
        'message': e.target.value
        })
      fetch('https://curriculum-api.codesmith.io/messages', {
      method: 'POST',
      headers: {
          'content-type': 'application/json'
      },
      body: data
      })
      .then(response => {
          // console.log(response)
      })
      .catch(err => {
          // console.log(err)
      })
      e.target.value = '';
    }

  }
  render(){
    return (
      <div>  
        <input type="text" onKeyDown={this.onEnter}></input>
     
      </div> 
    )
  }

}

//Add ids to the boxes


// Let's make a new component called Row that renders 3 Box components.

// Pull the state out of each Box and into the higher level Row component.

//     Don't forget to pass each child Box a key property.

//Rig up the event handling so that clicks on a Box component change the state on their parent Row component.



render(<App />, document.querySelector('#root'));
