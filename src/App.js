import React, { Component } from 'react';
import Item from './Item';
import methods from './appMethods';

const {
  _onKeyPress, 
  _onAdd,
  _onPlusClick,
  _onStrikeClick, 
  _onCheck,
  _onXClick
} = methods; 

   
  

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
                onClick={_onStrikeClick.bind(this)}
                onCheck={_onCheck.bind(this)}
                onXClick={_onXClick.bind(this)}
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
                  onKeyPress={_onKeyPress.bind(this)}
                  ref={this._inputRef}
                ></input>
                <button onClick={_onAdd.bind(this)}>add</button>
              </div>
            :
              <div style={{
                fontSize: '30px',
                cursor: 'pointer'
              }} id="plus"
                onClick={_onPlusClick.bind(this)}
              ><br/><br/>+</div>
        }
      </div>
    );
  }

}

export default App;
