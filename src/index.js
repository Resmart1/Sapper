import React from 'react';
import ReactDOM from 'react-dom/client';
import Rules from './components/Rules';
import Board from './components/Board';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<div className='container'>
		<Rules />
		<Board />
	</div>
);
