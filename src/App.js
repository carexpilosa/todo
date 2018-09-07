import React, { Component } from 'react';
import Item from './Item';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addMode: false,
      items: [
        {
          text: 'Blumen gießen',
          checked: true,
          strikethrough: false,
          id: 0
        },
        {
          text: 'Bücher lesen',
          checked: true,
          strikethrough: false,
          id: 1
        }
      ]
    };
  }
  render() {
    return (
      <div className="App" style={{
        textAlign: 'left', marginLeft: '20px',
        display: 'grid',
        gridTemplateColumns: '30px 200px 30px'
        }}>
        <div></div><div><h4>Todo-List</h4></div><div></div>
        {
          this.state.items.map((item) => {
            return (
              <Item
                key={item.id}
                item={item}
                onClick={this._onClick.bind(this)}
                onCheck={this._onCheck.bind(this)}
                onXClick={this._onXClick.bind(this)}
              />
            );
          })
        }
        {
          this.state.addMode
            ? <div>
                <br/><br/>
                <input id="addInput" type="text"
                  autoFocus
                  onKeyPress={this._onKeyPress.bind(this)}
                ></input>
                <button onClick={this._onAdd.bind(this)}>add</button>
              </div>
            :
              <div style={{
                fontSize: '30px',
                cursor: 'pointer'
              }} id="plus"
                onClick={this._onPlusClick.bind(this)}
              ><br/><br/>+</div>
        }
      </div>
    );
  }

  _onKeyPress(e) {
    if (e.key === 'Enter') {
      this.addItem(e.target.value);
    }
  }

  _onAdd(e) {
    this.addItem(e.target.previousSibling.value);
  }

  _onPlusClick(e) {
    this.setState({addMode: true});
  }

  _onClick(e) {
    let items = [ ...this.state.items ];
    items[parseInt(e.target.parentElement.id, 10)].strikethrough
      = ! items[parseInt(e.target.parentElement.id, 10)].strikethrough
    this.setState({items});
  }

  _onCheck(e) {
    let items = [ ...this.state.items ];
    items[parseInt(e.target.parentElement.id, 10)].checked
      = ! items[parseInt(e.target.parentElement.id, 10)].checked;
    this.setState({items});
  }

  _onXClick(e) {
    console.log(e.target.parentElement.id);
    this.deleteItem(e.target.parentElement.id);
  }

  deleteItem(id) {
    const items = this.state.items.filter(item => {
      return parseInt(item.id, 10) !== parseInt(id, 10);
    });
    this.setState({
      items
    });
  }

  addItem(text) {
    if (!text) {
      this.setState({
        addMode: false
      });
      return;
    }
    const newId = this.highestId(this.state.items) + 1;
    
    this.setState({
      addMode: false,
      items: [ ...this.state.items, {
        text,
        checked: true,
        strikethrough: false,
        id: newId
      }]
    })
  }

  highestId(arr) {
    return arr.reduce((accumulator, currentElm) => {
      return currentElm.id > accumulator ? currentElm.id : accumulator;
    }, 0 );
  }
}

export default App;
