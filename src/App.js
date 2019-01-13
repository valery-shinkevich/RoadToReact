import React, { Component } from "react"
import axios from 'axios'
import "./App.css"
import Search from "./Search"
import Table from "./Table"
import Button from "./Button"

const DEFAULT_QUERY = "redux"
const DEFAULT_HPP = "5"

const PATH_BASE = "https://hn.algolia.com/api/v1"
const PATH_SEARCH = "/search"
const PARAM_SEARCH = "query="
const PARAM_PAGE = "page="
const PARAM_HPP = "hitsPerPage="

class App extends Component {

  _isMounted = false

  state = {
      results: null,
      searchKey: "",
      searchTerm: DEFAULT_QUERY,
      hitsPerPage: DEFAULT_HPP,
      error: null,
    }

  render() {
    const { searchTerm, results, searchKey, hitsPerPage, error } = this.state
    const resultByKey = results && results[searchKey]
    const page = (resultByKey && resultByKey.page) || 0
    const list = (resultByKey && resultByKey.hits) || []

    return (
      <div className="page">
        <div className="interactions">
          <Search
            value={searchTerm}
            hitsPerPage={hitsPerPage}
            onChange={this.onSearchChange}
            onSubmit={this.onSearchSubmit}
            onHppChange={this.onHppChange}
          >
            Поиск
          </Search>
        </div>
        { error
          ? <div className="interactions"><p>Что-то пошло не так...</p></div>
          : <Table list={list} onDismiss={this.onDismiss} />}
            <div className="interactions">
              <Button
                onClick={() => this.fetchSearchTopStories(searchKey, hitsPerPage, page + 1)}
              >
              Больше историй
              </Button>
            </div>
      </div>
    )
  }

  componentDidMount() {
    this._isMounted = true

    const { searchTerm, hitsPerPage } = this.state
    this.setState({
      searchKey: searchTerm
    })
    this.fetchSearchTopStories(searchTerm, hitsPerPage)
  }

  componentWillUnmount(){
    this._isMounted = false
  }

  onDismiss = (id) => {
    const { searchKey, results } = this.state
    const { hits, page } = results && results[searchKey]
    const isNotId = item => item.objectID !== id
    const updatedHits = hits.filter(isNotId)
    this.updateStateResults(results, searchKey, updatedHits, page)
  }

  onSearchSubmit = (event) => {
    const {searchTerm,hitsPerPage} = this.state
    
    this.setState({searchKey: searchTerm})
    
    if (this.needsToSearchTopStories(searchTerm)) {
      this.fetchSearchTopStories(searchTerm, hitsPerPage)
    }
    
    event.preventDefault()
  }

  onSearchChange = (event) => {
    this.setState({
      searchTerm: event.target.value
    })
  }

  onHppChange = (event) => {
    this.setState({
      hitsPerPage: event.target.value
    })
  }

  needsToSearchTopStories = (searchTerm) => {
    return !this.state.results[searchTerm]
  }

  fetchSearchTopStories = (term, hitsPerPage, page = 0) => {
    axios.get(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${term}&${PARAM_PAGE}${page}&${PARAM_HPP}${hitsPerPage}`)
      .then(result => this._isMounted && this.setSearchTopStories(result.data))
      .catch(error => this._isMounted && this.setState({ error }))
  }

  setSearchTopStories = (founded) => {
    const { hits, page } = founded
    const { searchKey, results } = this.state
    const oldHits =
      (results && results[searchKey] && results[searchKey].hits) || []
    const newHits = [...oldHits, ...hits]

    this.updateStateResults(results, searchKey, newHits, page)
  }

  updateStateResults = (results, searchKey, updatedHits, page) => {
    this.setState({
      results: {
        ...results,
        [searchKey]: {
          hits: updatedHits,
          page
        }
      }
    })
  }
}

export default App
