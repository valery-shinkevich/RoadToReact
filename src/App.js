import React, { Component } from "react"
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
  constructor(props) {
    super(props)

    this.state = {
      results: null,
      searchKey: "",
      searchTerm: DEFAULT_QUERY,
      hitsPerPage: DEFAULT_HPP
    }

    this.needsToSearchTopStories = this.needsToSearchTopStories.bind(this)
    this.setSearchTopStories = this.setSearchTopStories.bind(this)
    this.onSearchChange = this.onSearchChange.bind(this)
    this.onHppChange = this.onHppChange.bind(this)
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this)
    this.onSearchSubmit = this.onSearchSubmit.bind(this)
    this.onDismiss = this.onDismiss.bind(this)
  }

  needsToSearchTopStories(searchTerm) {
    return !this.state.results[searchTerm]
  }

  onSearchSubmit(event) {
    const {searchTerm,hitsPerPage} = this.state
    
    this.setState({searchKey: searchTerm})
    
    if (this.needsToSearchTopStories(searchTerm)) {
      this.fetchSearchTopStories(searchTerm, hitsPerPage)
    }
    
    event.preventDefault()
  }

  onSearchChange(event) {
    this.setState({
      searchTerm: event.target.value
    })
  }

  onHppChange(event) {
    this.setState({
      hitsPerPage: event.target.value
    })
  }

  setSearchTopStories(founded) {
    const { hits, page } = founded
    const { searchKey, results } = this.state
    const oldHits =
      (results && results[searchKey] && results[searchKey].hits) || []
    const newHits = [...oldHits, ...hits]

    this.updateStateResults(results, searchKey, newHits, page)
  }

  componentDidMount() {
    const { searchTerm, hitsPerPage } = this.state
    this.setState({
      searchKey: searchTerm
    })
    this.fetchSearchTopStories(searchTerm, hitsPerPage)
  }

  fetchSearchTopStories(term, hitsPerPage, page = 0) {
    fetch(
      `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${term}&${PARAM_PAGE}${page}&${PARAM_HPP}${hitsPerPage}`
    )
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result))
      .catch(error => error)
  }

  render() {
    const { searchTerm, results, searchKey, hitsPerPage } = this.state
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
        {list && <Table list={list} onDismiss={this.onDismiss} />}
        <div className="interactions">
          <Button
            onClick={() =>
              this.fetchSearchTopStories(searchKey, hitsPerPage, page + 1)
            }
          >
            Больше историй
          </Button>
        </div>
      </div>
    )
  }

  onDismiss(id) {
    const { searchKey, results } = this.state
    const { hits, page } = results && results[searchKey]
    const isNotId = item => item.objectID !== id
    const updatedHits = hits.filter(isNotId)
    this.updateStateResults(results, searchKey, updatedHits, page)
  }

  updateStateResults(results, searchKey, updatedHits, page) {
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
