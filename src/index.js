import React from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './components/SearchBar';
import MainContent from './components/MainContent';
import store from './redux/store/index.js';
import {Provider} from 'react-redux';
import './css/bootstrap.css';
import './index.css';

import * as serviceWorker from './serviceWorker';

class MainApp extends React.Component {
	render() {
		return(
			<Provider store={store}>
				<SearchBar />
				<MainContent />
			</Provider>
		);
	}
}

ReactDOM.render(<MainApp />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
