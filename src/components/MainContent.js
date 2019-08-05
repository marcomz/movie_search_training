import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import MoviesList from './MoviesList';
import Pagination from './Pagination';
import getCookie, {setCookie, deleteCookie} from '../helper_functions/index.js';

const mapStateToProps = state => {
	return {
		movies_list: state.movies_list_from_search,
		stored_movies_info: state.stored_movies_info,
		search_string: state.search,
		top_rated: state.top_rated,
		total_results_from_search: state.total_results_from_search,
		search_page: state.search_page
	};
};

const mapDispatchToProps = dispatch => {
	return {
		search_movie_info: movie_id => {dispatch({ type: 'SEARCH_MOVIE_INFO', payload: movie_id })},
		fetch_top_rated: () => {dispatch({ type: 'FETCH_TOP_RATED', payload: '' })},
		fetch_search: searchData => dispatch({ type: "FETCH_SEARCH", payload: searchData }),
		update_search_page: page => dispatch({ type: "UPDATE_SEARCH_PAGE", payload: page })
	};
};

const ConnectedMainContent = (WrappedComponent) => {

	class WrapperComponent extends React.Component {

		constructor(props) {
			super(props);
			this.state = {last_clicked: []};
		}

		componentDidMount() {
			let last_clicked;
			try {
				last_clicked = JSON.parse(getCookie('last_clicked'));
			} catch(er){
				last_clicked = [];
			}

			this.setState({last_clicked});
			if (this.props.top_rated.length) {
				this.props.top_rated.map((id) => {
					if (!this.props.stored_movies_info[id]) {
						this.props.search_movie_info(id);
					}
				});
			}

			setTimeout(() => {
				last_clicked.map((id) => {
					if (!this.props.stored_movies_info[id]) {
						this.props.search_movie_info(id);
					}
				});
			},500);
		}

		updateLastClicked(new_id) {
			let last_clicked;
			try {
				last_clicked = JSON.parse(getCookie('last_clicked'));
			} catch(er){
				last_clicked = [];
			}
			if (last_clicked.indexOf(new_id) === -1) {
				last_clicked.unshift(new_id);
				if (last_clicked.length > 3) {last_clicked.length = 3}
				setCookie('last_clicked', JSON.stringify(last_clicked), 60);
				this.setState({last_clicked});
			}
		}

		changeSearchPage(new_page) {
			this.props.fetch_search({searchString: this.props.search_string, page: new_page});
			this.props.update_search_page(new_page);
		}

		returnUIMoviesList(source) {
			const array = source === 'last_clicked' ? this.state.last_clicked : this.props.top_rated
			const {stored_movies_info} = this.props;
			const l = array.length;
			const list = [];
			for (let i = 0; i < l; i++) {
				if(stored_movies_info[array[i]]) {
					list.push(stored_movies_info[array[i]]);
				}
			};
			return list;
		}

		render() {
			return (
				<div>{
					this.props.search_string ?

						<div>
							<WrappedComponent
								list_title='Resultados'
								movies_list={this.props.movies_list}
								stored_movies_info={this.props.stored_movies_info}
								search_movie_info={this.props.search_movie_info}
								updateLastClicked={this.updateLastClicked.bind(this)} />
							<Pagination
								total_results={this.props.total_results_from_search}
								search={this.props.search_string}
								page={this.props.search_page}
								changeSearchPage={this.changeSearchPage.bind(this)} />
						</div> :

						<div>
							<WrappedComponent
								list_title='Mejor Valoradas'
								movies_list={this.returnUIMoviesList('top_rated')}
								stored_movies_info={this.props.stored_movies_info}
								search_movie_info={this.props.search_movie_info}
								updateLastClicked={this.updateLastClicked.bind(this)} />

							<WrappedComponent
								list_title='Últimas Visitadas'
								movies_list={this.returnUIMoviesList('last_clicked')}
								stored_movies_info={this.props.stored_movies_info}
								search_movie_info={this.props.search_movie_info}
								updateLastClicked={this.updateLastClicked.bind(this)} />
						</div>

				}</div>
			);
		}
	}

	return WrapperComponent;
}

const MainContent = connect(mapStateToProps, mapDispatchToProps)(ConnectedMainContent(MoviesList));
export default MainContent;