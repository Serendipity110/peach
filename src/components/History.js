/* 
renders information about query history from the local database
*/

import React, { useState, useEffect } from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import db from '../database/db.js';

const History = ({setQuery, submitQuery}) => {

    const [history, setHistory] = useState(db.getHistory());
    // formatting for better UI
    const trimmedHistory = history.map(historyObject => {
        const optionObject = {};
        optionObject.label = historyObject.createdAt 
                           + '\n'
                           + historyObject.queryText.slice(0, 25) 
                           + '...';
        optionObject.value = historyObject.queryText;
        return optionObject;
    });

    const reloadHistory = (queryText) => {
        // console.log('reloaded history with', queryText);
        // submitQuery(); for now, we don't want to immediately submit
        setQuery(queryText);
    };



    return (
        <Dropdown 
            placeholder="Query History"
            options={trimmedHistory}
            defaultOption={''}
            onChange={(e) => reloadHistory(e.value)}
        />
    )
}

export default History;