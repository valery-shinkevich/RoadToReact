import React from 'react'

const Search = ({value,onChange,children}) => 
<form>
    <span>{children}</span>
    <input type="text" value={value} onChange={onChange} />
</form>;

export default Search