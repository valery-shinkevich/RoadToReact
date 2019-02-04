import React from "react"
import PropTypes from 'prop-types'

const Search = ({ value, hitsPerPage, onChange, onHppChange, onSubmit, children }) => (
  <form onSubmit={onSubmit}>
    <input type="text" value={value} onChange={onChange} />
    Строк на странице:
    <input style={{width: 20}} type="text" value={hitsPerPage} onChange={onHppChange} />
    <button type="submit">{children}</button>
  </form>
)

Search.defaultProps = {
  hitsPerPage: 5
}

Search.propTypes = {
  value: PropTypes.string,
  hitsPerPage: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  onHppChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  children:PropTypes.node.isRequired,
}

export default Search