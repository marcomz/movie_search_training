export default function updateSearch(payload) {
	return { type: "UPDATE_SEARCH", payload }
};

export function updateMoviesList(payload) {
	return { type: "UPDATE_MOVIES_LIST", payload }
};

export function updateMoviesSearchPage(payload) {
	return { type: "UPDATE_SEARCH_PAGE", payload }
};

export function updateMoviesInfo(payload) {
	return { type: "UPDATE_MOVIES_INFO", payload }
};

export function fetchSearch(payload) {
	return { type: "FETCH_SEARCH", payload }
};

export function searchMovieInfo(payload) {
	return { type: "SEARCH_MOVIE_INFO", payload }
};