module.exports = {
  _onKeyPress: (e) => {
    if (e.key === 'Enter') {
      this.addItem(e.target.value);
    }
  },

  _onAdd: (e) => {
    this.addItem(this._inputRef.current.value);
  },

  _onPlusClick: (e) => {
    console.log('--------------');
    this.setState({addMode: true});
  },

  _onStrikeClick: (e) => {
    //const id = e.target.id.replace(/^txt(.+$)/$1/);
    const id = e.target.id.replace(/^txt(.+)$/, "$1");
    let items = [ ...this.state.items ];
    items[parseInt(id, 10)].strikethrough
      = ! items[parseInt(id, 10)].strikethrough
    this.setState({items});
  },

  _onCheck: (e) => {
    let items = [ ...this.state.items ];
    const id = e.target.id.replace(/^cbox(.+)$/, "$1");
    items[parseInt(id, 10)].checked
      = ! items[parseInt(id, 10)].checked;
    this.setState({items});
  },

  _onXClick: (e) => {
    const id = e.target.id.replace(/^x(.+)$/, "$1");
    this.deleteItem(id);
  },

  deleteItem: (id) => {
    const items = this.state.items.filter(item => {
      return parseInt(item.id, 10) !== parseInt(id, 10);
    });
    this.setState({
      items
    });
  },

  addItem: (text) => {
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
  },

  highestId: (arr) => {
    return arr.reduce((accumulator, currentElm) => {
      return currentElm.id > accumulator ? currentElm.id : accumulator;
    }, -1 );
  }
};