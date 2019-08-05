import apikey from '../../apikey';
const axios = require('axios');

export default function searchDataWithAPI({ dispatch }) {
	return function(next){
		return function(action){
			if (action.type === 'FETCH_SEARCH') {
				return axios.get('http://www.omdbapi.com/?apikey='+apikey+'&s='+action.payload.searchString+'&page='+action.payload.page)
					.then(function(response){
						if (response.data.Response === 'True') {
							return dispatch({ type: "UPDATE_MOVIES_LIST", payload: {list: response.data.Search, total: response.data.totalResults} });
						}
					})
					.catch(function(error){
						console.log(error);
					});
			}
			if (action.type === 'SEARCH_MOVIE_INFO') {
				return axios.get('http://www.omdbapi.com/?apikey='+apikey+'&i='+action.payload+'&plot=full')
					.then(function(response){
						if (response.status === 200) {
							return dispatch({ type: "UPDATE_MOVIES_INFO", payload: response.data });
						}
					})
					.catch(function(error){
						console.log(error);
					});
			}
			return next(action);
		}
	}
}