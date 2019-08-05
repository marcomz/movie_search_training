import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import updateSearch, { fetchSearch } from '../redux/actions/index.js';

function mapDispatchToProps(dispatch) {
	return {
		updateSearch: searchString => dispatch(updateSearch(searchString)),
		fetch_search: searchData => dispatch(fetchSearch(searchData))
	};
}

class ConnectedSearchBar extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			searchString: ''
		};
	}

	startSearch() {
		this.props.updateSearch(this.state.searchString);
		if (this.state.searchString) {
			this.props.fetch_search({searchString: this.state.searchString, page:1});
		}
	}

	handleKeyDown(event) {
		if (event.keyCode === 13) {
			this.startSearch();
		}
	}

	render() {
		return(
			<div className='container app_title_container'>
				<div className='app_title'>
					Movie Catalog
				</div>
				<div className='search_input'>
					<input type='text' placeholder='Buscar' onKeyUp={this.handleKeyDown.bind(this)} onChange={(event) => {this.setState({searchString: event.target.value})}} />
					<button className='search_button'>
						<i className='fas fa-search'></i>
					</button>
				</div>
			</div>
		);
	}
}

const SearchBar = connect(null, mapDispatchToProps)(ConnectedSearchBar);

export default SearchBar;