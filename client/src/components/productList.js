import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import classnames from 'classnames';
import {fetchProduct} from '../actions';

class ProductList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            term: '',
            productAvailable: [],
            currentPage: 1,
            productsPerPage: 10,
            active: ''
        };
        this.handleClick = this.handleClick.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.products !== this.props.products) {
            this.setState({productAvailable: nextProps.products});
        }
    }

    componentDidMount() {
        this.props.fetchProduct();
    }

    handleClick(event) {
        this.setState({
            currentPage: Number(event.target.id),
            active: 'active'
        });
    }

    renderProduct() {
        const {productAvailable, currentPage, productsPerPage} = this.state;

        const indexOfLastProduct = currentPage * productsPerPage;
        const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
        const currentProducts = productAvailable.slice(indexOfFirstProduct, indexOfLastProduct);

        return currentProducts.map(product => {
            return (
                <tr key={product._id}>
                    <td>{product.productName}</td>
                    <td>{product.category}</td>
                    <td>{product.details}</td>
                </tr>

            );
        });
    }

    renderPageNumber() {
        const {productAvailable, productsPerPage} = this.state;

        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(productAvailable.length / productsPerPage); i++) {
            pageNumbers.push(i);
        }

        return pageNumbers.map(number => {
            let classes = classnames('waves-effect', this.state.currentPage===number ? 'active' : '');
            return (
                <li
                    key={number}
                    className={classes}><a id={number} onClick={this.handleClick}>{number}</a></li>
            );
        });
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <h3>ATS - Product List</h3>
                </div>
                <div className="search-bar">
                    <label htmlFor="search">Search by category</label>
                    <input id="search" value={this.state.term}
                           onChange={event => this.onInputChange(event.target.value)}/>
                </div>
                <table className="striped">
                    <thead>
                    <tr>
                        <th> Name</th>
                        <th>Category</th>
                        <th> Details</th>
                    </tr>
                    </thead>

                    <tbody>
                    {this.renderProduct()}
                    </tbody>
                </table>
                <ul className="pagination">
                    {this.renderPageNumber()}
                </ul>
            </div>
        );
    }

    onInputChange(term) {
        const newAvailableProducts = _.filter(this.props.products, product => product.category.includes(term));
        this.setState({term, productAvailable: newAvailableProducts, currentPage: 1});
        console.log(this.state.productAvailable.length);
    }
}

function mapStateToProps({products}) {
    return {products};
}

export default connect(mapStateToProps, {fetchProduct})(ProductList);