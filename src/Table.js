import React from 'react'
import Button from './Button'

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
        <Button onClick={onHandleDismiss} className="dismiss">X</Button>
        </span>
    </div>
    );
})

export default Table