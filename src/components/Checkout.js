/*global undefinedVariable:false Raven:false*/
/*eslint no-unused-vars:0 no-eval:0*/

import React, {Component} from 'react';

class Checkout extends Component {
componentDidMount() {
  Raven.setTagsContext({
      feature: "checkout"
  });
}


    render() {
        return (
            <h1>Checkout Cart</h1>
        );
    }
}

export default Checkout;
