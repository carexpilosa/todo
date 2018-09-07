import React, { Component } from 'react';
import Item from './Item';
import logo from './logo.svg';
import './App.css';
import {
  _onKeyPress, 
  _onAdd,
  _onPlusClick,
  _onStrikeClick, 
  _onCheck,
  _onXClick,
  deleteItem,
  addItem,
  highestId
} from './appMethods';

   
  

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addMode: false,
      items: JSON.parse(localStorage.getItem('myTodoList')) || []
    };
    this._inputRef = React.createRef();
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
                onClick={this._onStrikeClick.bind(this)}
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
                  ref={this._inputRef}
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
    this.addItem(this._inputRef.current.value);
  }

  _onPlusClick(e) {
    console.log('--');
    this.setState({addMode: true});
  }

  _onStrikeClick(e) {
    //const id = e.target.id.replace(/^txt(.+$)/, "$1");
    const id = e.target.id.replace(/^txt(.+)$/, "$1");
    console.log(id);
    let items = [ ...this.state.items ];
    items[parseInt(id, 10)].strikethrough
      = ! items[parseInt(id, 10)].strikethrough;
    this.storeItems(items);
    this.setState({items});
  }

  _onCheck(e) {
    let items = [ ...this.state.items ];
    const id = e.target.id.replace(/^cbox(.+)$/, "$1");
    items[parseInt(id, 10)].checked
      = ! items[parseInt(id, 10)].checked;
    this.storeItems(items);
    this.setState({items});
  }

  _onXClick(e) {
    const id = e.target.id.replace(/^x(.+)$/, "$1");
    this.deleteItem(id);
  }

  deleteItem(id) {
    const items = this.state.items.filter(item => {
      return parseInt(item.id, 10) !== parseInt(id, 10);
    });
    this.storeItems(items);
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
    const newItems = [
      ...this.state.items,
      {
        text,
        checked: true,
        strikethrough: false,
        id: newId
      }];

    this.storeItems(newItems);
    
    this.setState({
      addMode: false,
      items: newItems
    });
  }

  highestId(arr) {
    return arr.reduce((accumulator, currentElm) => {
      return currentElm.id > accumulator ? currentElm.id : accumulator;
    }, -1 );
  }

  storeItems(items) {
    localStorage.setItem('myTodoList', JSON.stringify(items));
  }
}

export default App;
