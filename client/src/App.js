import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from './actions';

import ProductList from './components/productList';

class App extends Component {
    render() {
        return (
            <ProductList/>
        );
    }
}

export default connect(null, actions)(App);
