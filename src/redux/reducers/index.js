const initialState = {
	search: '',
	search_page: 1,
	movies_list_from_search: [],
	total_results_from_search: '0',
	top_rated: ['tt0111161','tt0068646','tt0071562','tt0468569','tt0050083','tt0108052'],
	stored_movies_info: {}
};

export default function rootReducer(state = initialState, action) {
	if (action.type === 'UPDATE_SEARCH') {
		return Object.assign({}, state, {
			search: action.payload
		});
	}
	if (action.type === 'UPDATE_MOVIES_LIST') {
		return Object.assign({}, state, {
			movies_list_from_search: action.payload.list,
			total_results_from_search: action.payload.total
		});
	}
	if (action.type === 'UPDATE_SEARCH_PAGE') {
		return Object.assign({}, state, {
			search_page: action.payload
		});
	}
	if (action.type === 'UPDATE_MOVIES_INFO') {
		const info = JSON.parse(JSON.stringify(state.stored_movies_info));
		info[action.payload.imdbID] = action.payload;
		return Object.assign({}, state, {
			stored_movies_info: info
		});
	}
	return state;
};