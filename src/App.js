import React, { Component } from "react";
import "./App.css";
import Search from './Search';
import Table from './Table';

const DEFAULT_QUERY = 'redux';
const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';

class App extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      list: null,
      result: null,
      searchTerm: DEFAULT_QUERY,
    };

    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
  }

onSearchSubmit(event){
  const {searchTerm} = this.state;
  this.fetchSearchTopStories(searchTerm);
  event.preventDefault();
}

  onSearchChange(event){
    console.log(event);
    this.setState({searchTerm: event.target.value});
  }

  setSearchTopStories(result) {
    this.setState({ result });
  }

  componentDidMount() {
    const { searchTerm } = this.state;
    this.fetchSearchTopStories(searchTerm)
  }

  fetchSearchTopStories(searchTerm){
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
    .then(response => response.json())
    .then(result => this.setSearchTopStories(result))
    .catch(error => error);
  }

  render() {

    const {searchTerm, result} = this.state;

    console.log(result);
    
    return (
      <div className="page">
        <div className="interactions">
          <Search
            value={searchTerm}
            onChange={this.onSearchChange}
            onSubmit={this.onSearchSubmit}>
          Поиск
          </Search>
        </div>
        {result && 
          <Table
            list={result.hits}
            onDismiss={this.onDismiss}
          />
        }
      </div>
    );
  }

  onDismiss(id) {
    const isNotId = item => item.objectID !== id;
    const current = this.state.result
    const updatedHits = current.hits.filter(isNotId);
    this.setState({
      result: { 
        ...current,
        hits: updatedHits
      }
    });
  }
}

export default App;