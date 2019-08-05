import React from 'react';
import ReactDOM from 'react-dom';

class Pagination extends React.Component {

	constructor() {
		super();
		this.state = {};
	}

	changePage(new_page) {
		if (this.props.page !== new_page) {
			this.props.changeSearchPage(new_page);
		}
	}

	componentDidUpdate(prevProps) {
		if (this.props.page !== prevProps.page) {
			window.scrollTo(0, 0);
		}
	}

	returnPaginationNumber(page, display_name) {
		return (
			<div
				onClick={this.changePage.bind(this, page)}
				key={'pagination_element_'+display_name}
				className='pagination_navigation'
				style={{backgroundColor: this.props.page === page ? '#848484' : '#fff'}}>{display_name}</div>
		);
	}

	createPages() {
		const total_results = parseInt(this.props.total_results);
		const results_per_page = 10;
		if (total_results) {
			const number_of_pages = Math.ceil(total_results/results_per_page);
			const result = [];
			if (number_of_pages > 5) {
				let starting_page = (this.props.page >= number_of_pages-1) ?
									number_of_pages-4 : this.props.page >= 3 ?
										this.props.page-2 : 1;
				let last_page = (this.props.page > (number_of_pages-2)) ? number_of_pages : starting_page+4;

				if (starting_page !== 1) {
					result.push(this.returnPaginationNumber(1, 'Inicio'));
				}
				for (let i = starting_page; i <= last_page; i++) {
					result.push(this.returnPaginationNumber(i, i));
				}
				if (last_page !== number_of_pages) {
					result.push(this.returnPaginationNumber(number_of_pages, 'Última'));
				}
			} else {
				for (let i = 1; i <= number_of_pages; i++) {
					result.push(this.returnPaginationNumber(i, i));
				};
			}
			return (
				<div className='pagination_container'>
					{result}
				</div>
			);
		}
		return null;
	}

	render() {
		return(
			<div className='container'>
				{this.createPages()}
			</div>
		);
	}
}

export default Pagination;