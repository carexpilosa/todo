import React from 'react';

class Item extends React.Component {
  render() {
    const item = this.props.item;
    const style = item.strikethrough
      ? {textDecoration: 'line-through'} : {};
    return (
      <div key={item.id} id={item.id}>
        <input
          type="checkbox"
          defaultChecked={item.checked}
          onClick={this.props.onCheck}>
        </input>
        <span style={style} onClick={this.props.onClick}>{item.text}</span>&nbsp;
        <span style={{color: 'red', cursor: 'pointer'}} onClick={this.props.onXClick}>x</span>
      </div>
    );

  }
}

export default Item;