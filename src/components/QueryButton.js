import React from 'react';
// import db from '../database/db';
import Button from 'react-bootstrap/Button';

const QueryButton = ({query, setQueryToLoad, loadQuery, variables}) =>  {

    return (
        <div>
            <Button 
                style={{width: '95%'}}
                variant="secondary"
                className="_queryButton my-1"
                onClick={() => {
                    setQueryToLoad(query);
                    loadQuery(JSON.parse(variables));
<<<<<<< HEAD
                    console.log('text in QueryButton', query.params.text);
                    // db.addQuery(query.params.text);
                    //! setEditorState(query.params.text);
                    //! setQueryKey(key);
=======
                    // ! setEditorState(query.params.text);
                    // ! setQueryKey(key);
>>>>>>> one-app-swapped
                }}>
                  {query.params.text}
            </Button>
        </div>
    )
}

export default QueryButton;