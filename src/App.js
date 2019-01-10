import React, { Component } from "react";
import "./App.css";
import Search from './Search';
import Table from './Table';
import Button from './Button';

const DEFAULT_QUERY = 'redux';
const DEFAULT_HPP = '5';

const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page=';
const PARAM_HPP = 'hitsPerPage=';

class App extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      result: null,
      searchTerm: DEFAULT_QUERY,
      hitsPerPage: DEFAULT_HPP
    };

    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onHppChange = this.onHppChange.bind(this);
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
  }

  onSearchSubmit(event){
    const {searchTerm, hitsPerPage} = this.state;
    this.fetchSearchTopStories(searchTerm, hitsPerPage);
    event.preventDefault();
  }

  onSearchChange(event){
    console.log(event);
    this.setState({searchTerm: event.target.value});
  }

  onHppChange(event){
    console.log(event);
    this.setState({hitsPerPage: event.target.value});
  }

  setSearchTopStories(result) {
    const {hits, page} = result;
    const oldHits = page!==0
      ? this.state.result.hits
      : [];
    const updatedHits = [
      ...oldHits,
      ...hits
    ];
    this.setState({ result: {...result, hits: updatedHits}, page });
  }

  componentDidMount() {
    const { searchTerm, hitsPerPage } = this.state;
    this.fetchSearchTopStories(searchTerm, hitsPerPage)
  }

  fetchSearchTopStories(searchTerm, hitsPerPage, page =  0){
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${hitsPerPage}`)
    .then(response => response.json())
    .then(result => this.setSearchTopStories(result))
    .catch(error => error);
  }

  render() {
    const { searchTerm, result, hitsPerPage } = this.state;
    const page = (result && result.page) || 0;
    
    console.log(result);
    
    return (
      <div className="page">
        <div className="interactions">
          <Search
            value={searchTerm}
            hitsPerPage={hitsPerPage}
            onChange={this.onSearchChange}
            onSubmit={this.onSearchSubmit}
            onHppChange={this.onHppChange}>
          Поиск
          </Search>          
        </div>
        {result && 
          <Table
            list={result.hits}
            onDismiss={this.onDismiss}
          />
        }
        <div className="interactions">
          <Button onClick={() => this.fetchSearchTopStories(searchTerm, page + 1)}>
            Больше историй
          </Button>
        </div>
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