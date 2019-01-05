import React, { Component } from "react";
import "./App.css";
import Button from './Button'

const list = [
  {
    title: "React",
    url: "https://reactjs.org/",
    author: "Jordan Walke",
    num_comments: 3,
    points: 4,
    objectID: 0
  },
  {
    title: "Redux",
    url: "https://redux.js.org/",
    author: "Dan Abramov, Andrew Clark",
    num_comments: 2,
    points: 5,
    objectID: 1
  },
  {
    title: "Lombard-Service",
    url: "https://lombard-service.ru/",
    author: "Valeriy Shinkevich",
    num_comments: 1,
    points: 10,
    objectID: 2
  }
];

const Search = ({value,onChange,children}) => 
  <form>
    <span>{children}</span>
    <input type="text" value={value} onChange={onChange} />
  </form>;

const termFilter = term => ({title}) => term === '' || title.toLowerCase().includes(term.toLowerCase());

const Table = ({list, pattern, onDismiss}) => list
  .filter(termFilter(pattern))
  .map(item => {
    const onHandleDismiss = () => onDismiss(item.objectID);
    return (
      <div key={item.objectID}>
        <span>
          <a href={item.url}>
            {item.title}
          </a>
        </span>
        <span>{item.author}</span>
        <span>{item.num_comments}</span>
        <span>{item.points}</span>
        <span>
          <Button onClick={onHandleDismiss}>X</Button>
        </span>
      </div>
    );
  })

class App extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      list,
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
      <div className="App">
        <Search value={searchTerm} onChange={this.onSearchChange}>Поиск</Search>
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