import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from "react-redux";

class ConnectedMoviesList extends React.Component {

	constructor() {
		super();
		this.state = {
			element_hovered: '',
			show_synopsis_for_this_movie: '',
			row_where_info_will_be_shown: null,
		};
	}

	showMovieInfo (movieId, row) {
		if (this.props.stored_movies_info[movieId] === undefined) {
			this.props.search_movie_info(movieId);
		}
		if (this.state.show_synopsis_for_this_movie === movieId) {
			this.setState({show_synopsis_for_this_movie: '', row_where_info_will_be_shown: null});
		} else {
			this.props.updateLastClicked(movieId);
			this.setState({show_synopsis_for_this_movie: movieId, row_where_info_will_be_shown: row});
		}
	}

	elementHovered(movieId) {
		this.setState({element_hovered: movieId});
	}

	componentDidUpdate(prevProps) {
		if (this.props.list_title === 'Resultados' && prevProps.list_title !== 'Resultados') {
			this.setState({show_synopsis_for_this_movie: '', row_where_info_will_be_shown: null});
		}
	}

	returnSynopsis(key) {
		if (this.props.stored_movies_info[this.state.show_synopsis_for_this_movie] === undefined) {
			return (
				<div style={{border: '4px solid #737373',padding: '20px', borderRadius: '11px', margin: '15px 0'}} key={key}>Cargando...</div>
			);
		}
		const info = this.props.stored_movies_info[this.state.show_synopsis_for_this_movie];
		return(
			<div key={key} style={{border: '4px solid #737373',padding: '20px', borderRadius: '11px', margin: '15px 0'}}>
				<div>
					Country: <div>{info.Country}</div>
				</div>
				<div>
					Actors: <div>{info.Actors}</div>
				</div>
				<div>
					Awards: <div>{info.Awards}</div>
				</div>
				<div>
					Plot: <div>{info.Plot}</div>
				</div>
			</div>
		);
	}

	returnSingleMovieColumn(movie, row) {
		if (movie) {
			return (
				<div className='movie_image_preview_container' onClick={this.showMovieInfo.bind(this, movie.imdbID, row)}
						onMouseEnter={this.elementHovered.bind(this, movie.imdbID)}
						onMouseLeave={this.elementHovered.bind(this, '')}
						style={{position: 'relative'}}
				>
					<img src={movie.Poster !== 'N/A' ? movie.Poster : 'img/placeholder.png'} style={{width: '100%'}} />
					<div style={{display: this.state.element_hovered===movie.imdbID || this.state.show_synopsis_for_this_movie===movie.imdbID ? 'block' : 'none', position: 'absolute',top: 0,bottom: 0,left: 0,width: '100%',color:'#fff',backgroundColor: 'rgba(0,0,0,0.7)', cursor: 'pointer'}}>
						{
							<div className='movie_info_preview'>
								<div className='movie_name_preview' style={{fontSize: '19px', fontWeight: 800}}>{movie.Title}</div>
								<div className='movie_year_preview'>{movie.Year}</div>
							</div>
						}
					</div>
				</div>
			);
		}
		return null;
	}

	createMoviesList() {
		if (!this.props.movies_list) {
			return null;
		}
		if (this.props.movies_list.length) {

			const number_of_rows = Math.ceil(this.props.movies_list.length/3);
			const rows = [];

			for (let i = 0; i < number_of_rows; i++) {
				rows.push(
					<div className='row' key={'movies_row_'+i} style={{marginBottom: '20px'}}>
						<div className='col-sm'>{this.returnSingleMovieColumn(this.props.movies_list[(i*3)], i)}</div>
						<div className='col-sm'>{this.returnSingleMovieColumn(this.props.movies_list[(i*3)+1], i)}</div>
						<div className='col-sm'>{this.returnSingleMovieColumn(this.props.movies_list[(i*3)+2], i)}</div>
					</div>
				);
				if (this.state.row_where_info_will_be_shown === i) {
					rows.push(this.returnSynopsis('movies_plot_row_'+i));
				}
			};

			return(
				<div className='container'>
					<h1 style={{margin: '40px 0'}}>{this.props.list_title}</h1>
					{rows}
				</div>
			);
		} else {
			return null;
		}
	}

	render() {
		return(
			<div>
				{this.createMoviesList()}
			</div>
		);
	}
}

export default ConnectedMoviesList;