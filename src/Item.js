import React from 'react';

class Item extends React.Component {
  render() {
    const item = this.props.item;
    const style = item.strikethrough
      ? {textDecoration: 'line-through'} : {};
    return (
      <React.Fragment key={item.id} id={item.id}>
      <div>
        <input
          type="checkbox"
          defaultChecked={item.checked}
          onClick={this.props.onCheck}>
        </input></div>
        <div style={style} onClick={this.props.onClick}>{item.text}</div>
        <div style={{color: 'red', cursor: 'pointer'}} onClick={this.props.onXClick}>x</div>
      </React.Fragment>
    );

  }
}

export default Item;