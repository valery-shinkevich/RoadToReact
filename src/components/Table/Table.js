import React from 'react'
import Button from '../Buttons'
import PropTypes from 'prop-types'

const largeColumn = {
    width: '40%',
}

const midColumn = {
    width: '30%',
}

const smallColumn = {
    width: '10%',
}

const Table = ({list, onDismiss}) => 
    <div className="table">{
        list
            .map(item => {
            const onHandleDismiss = () => onDismiss(item.objectID)
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
            )
        })
    }
    </div>

Table.propTypes = {
    list: PropTypes.arrayOf(
        PropTypes.shape({
            objectID: PropTypes.string.isRequired,
            author: PropTypes.string,
            num_comments: PropTypes.number,
            points: PropTypes.number
        })
    ).isRequired,
    onDismiss: PropTypes.func.isRequired,
}

export default Table