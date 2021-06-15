/*
Currently responsible for rendering all the major components,
imports the importedQuery and holds the data that comes back from 
useLazyLoadQuery as state, which is passed and rendered in ResponseDisplay
*/ 

import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ImportedMode from './components/peach/ImportedMode';
// import logo from '../assets/PeachLogo.png';

import Navbar from './components/Navbar';
import SchemaDisplayContainer from './components/SchemaDisplayContainer';
import WrittenResponseDisplay from './components/WrittenResponseDisplay';
import QueryContainer from './components/QueryContainer';
import VariableInput from './components/VariableInput';
import ErrorBoundary from './components/ErrorBoundary';
import './styles/App.css';
import './styles/styles.css';

// import graphql from 'babel-plugin-relay/macro';


//useLazyLoadQuery relay imports
import { useLazyLoadQuery } from 'react-relay';
import writtenQuery from './relay/__generated__/writtenQuery.graphql'
import { Suspense } from 'react';


//Roland's imports:
import { graphql } from 'graphql';
import aliasID from './relay/aliasID';
import makeJsonSchema from './relay/makeJsonSchema';
const path = require('path');
const fs = require('fs');
const axios = require('axios').default;

//experimental hook for updating variable state. Currently breaks app when used.
const useJsonVariables = (input) => {
	const [variables, _setVariables] = useState(input);
	const setVariables = value => {
		const parser = JSON.parse(value)
		_setVariables(parser);
	}
	return [variables, setVariables];
}

const App = () => {
	const [response, setResponse] = useState('');
	const [query, setQuery] = useState('');
	const [variables, setVariables] = useState('');

	// Define the config we'll need for our Api request
	const url = 'https://graphql.anilist.co',
			options = {
					method: 'POST',
					headers: {
							'Content-Type': 'application/json',
							'Accept': 'application/json',
					},
					body: JSON.stringify({
							query: query,
							variables: variables
					})
			};
	
	// Make the HTTP Api request
	const submitTypedQuery = () => {
		fetch(url, options).then(handleResponse)
										 	 .then(handleData)
										   .catch(handleError);
	}
	
	//Helper functions for submitTypedQuery:
	function handleResponse(response) {
			return response.json().then(function (json) {
					return response.ok ? json : Promise.reject(json);
			});
	}
	function handleData(data) {
			setResponse(data.data);
	}
	function handleError(error) {
			console.error(error);
	}

	return (
		<Container className="App" fluid id="App1">
			<Row>
				<Col xs={12}>
					<Navbar />
				</Col>
			</Row>
			
			<Row className="mb-3">
				<Col xs={4}>
					<Row  className='my-2'>
						<Col>
							<Card className='_schemaDisplay'>
								<ErrorBoundary>
									<SchemaDisplayContainer/>
								</ErrorBoundary>
							</Card>	
						</Col>
					</Row>
					<Row>
						<Col>
							<Card className='_variableInput'>
								<ErrorBoundary>
									<VariableInput 
										variables={variables} 
										setVariables={setVariables}
									/>
								</ErrorBoundary>
							</Card>
						</Col>
					</Row>
				</Col>
				
				<Col xs={4} className='my-2'>
					<Card className='_queryContainer'>
						<ErrorBoundary>
							<QueryContainer
								submitTypedQuery={submitTypedQuery}
								query={query}
								setQuery={setQuery}
							/>
						</ErrorBoundary>
					</Card>
				</Col>

				<Col xs={4} className='my-2'>
					<Card className='_response'>
						<div id="ResponseDisplay">
							<ErrorBoundary>
								<Suspense>
									<WrittenResponseDisplay 
										response={response}
									/>
								</Suspense>
							</ErrorBoundary>
						</div>
					</Card>
				</Col>
			</Row>
			
			<Row>
				<ImportedMode className="importedMode" />
			</Row>

		</Container>
	)
}

export default App;


