/* 
stateful functional container component responsible for rendering 
as many SchemaDisplay components as the uploaded Schema require
*/ 

import React from 'react';
import SchemaDisplay from './SchemaDisplay';
import Container from 'react-bootstrap/Container';
import makeJsonSchema from '../relay/makeJsonSchema';
import InputGqlSchema from './InputGqlSchema';

// calls makeJsonSchema to generate a js array of objects we can render from schema.graphql
const jsonSchema = makeJsonSchema(); 

const SchemaDisplayContainer = () => {
    // list of Schema to be rendered by SchemaDisplay
    // const [schemaList, setSchemaList] = useState([jsonSchema]);

    return (
        <Container fluid>
            <InputGqlSchema className='mb-1' />
            <div id="schema-display-container"  className='mb-4'>
                <ul style={{overflow: scroll}}>
                    {jsonSchema.map(schema => {
                        return <SchemaDisplay 
                        key={schema.name} 
                        schemaName={schema.name}
                        schemaFields={schema.fields}/>
                    })}
                </ul>
                <div className="_inputButton"></div>
            </div>
        </Container>
    )
}

export default SchemaDisplayContainer;
