const methods = {
  // these functions have to be NO arrow functions because this has to be
  // bound when calling them
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
    const id = e.target.id.replace(/^txt(.+)$/, "$1");
    const items = this.state.items.map(item => {
      if (parseInt(item.id, 10) === parseInt(id, 10)) {
        item.strikethrough = ! item.strikethrough;
      }
      return item;
    });
    methods.storeItems(items);
    this.setState({items});
  },

  _onCheck: function(e) {
    const id = e.target.id.replace(/^cbox(.+)$/, "$1");
    const items = this.state.items.map(item => {
      if (parseInt(item.id, 10) === parseInt(id, 10)) {
        item.checked = ! item.checked;
      }
      return item;
    });
    methods.storeItems(items);
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
    methods.storeItems(items);
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
    const items = [
      ...this.state.items, {
        text,
        checked: true,
        strikethrough: false,
        id: newId
      }
    ];

    methods.storeItems(items);
    this.setState({
      addMode: false,
      items
    });
  },

  highestId: function(arr) {
    return arr.reduce((accumulator, currentElm) => {
      return currentElm.id > accumulator ? currentElm.id : accumulator;
    }, -1 );
  },

  storeItems: function(items) {
    localStorage.setItem('myTodoList', JSON.stringify(items));
  },

  sortByChecked: function() {
    const items = this.state.items.sort((a, b) => {
      return this.state.sortCheckedDesc
        ? a.checked
        : !a.checked;
    });

    this.setState({
      items,
      sortCheckedDesc: this.state.sortCheckedDesc ? false : true
    });
  },

  sortByText: function() {
    console.log('sortByText');
    const items = this.state.items.sort((a, b) => {
      return this.state.sortTextAsc
        ? a.text.toLowerCase() > b.text.toLowerCase()
        : a.text.toLowerCase() < b.text.toLowerCase();
    });
    this.setState({
      items,
      sortTextAsc: this.state.sortTextAsc ? false : true
    });
  },

  sortByStrikeThrough: function() {
    const items = this.state.items.sort((a, b) => {
      return this.state.sortStrikeThrough
        ? a.strikethrough
        : !a.strikethrough;
    });

    this.setState({
      items,
      sortStrikeThrough: this.state.sortStrikeThrough ? false : true
    });
  }
};

export default methods;