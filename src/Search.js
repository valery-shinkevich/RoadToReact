import React from "react"

const Search = ({ value, hitsPerPage, onChange, onHppChange, onSubmit, children }) => (
  <form onSubmit={onSubmit}>
    <input type="text" value={value} onChange={onChange} />
    Строк на странице:
    <input style={{width: 20}} type="text" value={hitsPerPage} onChange={onHppChange} />
    <button type="submit">{children}</button>
  </form>
)

export default Search