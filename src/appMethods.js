const methods = {
  _onKeyPress: function(e) {
    if (e.key === 'Enter') {
      methods.addItem.bind(this)(e.target.value);
    }
  },

  _onAdd: function(e) {
    methods.addItem.bind(this)(this._inputRef.current.value);
  },

  _onPlusClick: function(e) {
    this.setState({addMode: true});
  },

  _onStrikeClick: function(e) {
    //const id = e.target.id.replace(/^txt(.+$)/$1/);
    const id = e.target.id.replace(/^txt(.+)$/, "$1");
    let items = [ ...this.state.items ];
    items[parseInt(id, 10)].strikethrough
      = ! items[parseInt(id, 10)].strikethrough
    this.setState({items});
  },

  _onCheck: function(e) {
    let items = [ ...this.state.items ];
    const id = e.target.id.replace(/^cbox(.+)$/, "$1");
    items[parseInt(id, 10)].checked
      = ! items[parseInt(id, 10)].checked;
    this.setState({items});
  },

  _onXClick: function(e) {
    const id = e.target.id.replace(/^x(.+)$/, "$1");
    methods.deleteItem.bind(this)(id);
  },

  deleteItem: function(id) {
    const items = this.state.items.filter(item => {
      return parseInt(item.id, 10) !== parseInt(id, 10);
    });
    this.setState({
      items
    });
  },

  addItem: function(text) {
    if (!text) {
      this.setState({
        addMode: false
      });
      return;
    }
    const newId = methods.highestId.bind(this)(this.state.items) + 1;
    
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

  highestId: function(arr) {
    return arr.reduce((accumulator, currentElm) => {
      return currentElm.id > accumulator ? currentElm.id : accumulator;
    }, -1 );
  },

  storeItems(items) {
    localStorage.setItem('myTodoList', JSON.stringify(items));
  }
};

export default methods;