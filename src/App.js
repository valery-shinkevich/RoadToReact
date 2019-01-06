import React, { Component } from "react";
import "./App.css";
import Search from './Search'
import Table from './Table'
import DemoData from './DemoData'

class App extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      list: DemoData,
      searchTerm: '',
    };

    this.onSearchChange = this.onSearchChange.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
  }

  onSearchChange(event){
    this.setState({searchTerm: event.target.value});
  }

  render() {

    const {list, searchTerm} = this.state;

    return (
      <div className="page">
        <div className="interactions"><Search value={searchTerm} onChange={this.onSearchChange}>Поиск</Search></div>
        <Table list={list} pattern={searchTerm} onDismiss={this.onDismiss}/>       
      </div>
    );
  }

  onDismiss(id) {
    const isNotId = item => item.objectID !== id;
    const updatedList = this.state.list.filter(isNotId);
    this.setState({ list: updatedList });
  }
}

export default App;