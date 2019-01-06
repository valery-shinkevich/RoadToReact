import React from 'react'
import Button from './Button'

const termFilter = term => ({title}) => term === '' || title.toLowerCase().includes(term.toLowerCase());

const largeColumn = {
    width: '40%',
};

const midColumn = {
    width: '30%',
};

const smallColumn = {
    width: '10%',
};

const Table = ({list, pattern, onDismiss}) => 
    <div className="table">{
        list
            .filter(termFilter(pattern))
            .map(item => {
            const onHandleDismiss = () => onDismiss(item.objectID);
            return (
            <div key={item.objectID} className="table-row">
                <span style= {largeColumn}>
                    <a href={item.url}>
                        {item.title}
                    </a>
                </span>
                <span style={midColumn}>{item.author}</span>
                <span style={smallColumn}>{item.num_comments}</span>
                <span style={smallColumn}>{item.points}</span>
                <span style={smallColumn}>
                    <Button onClick={onHandleDismiss} className="button-inline">X</Button>
                </span>
            </div>
            );
        })
    }
    </div>

export default Table