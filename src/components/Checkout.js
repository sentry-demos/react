/*global undefinedVariable:false Sentry:false*/
/*eslint no-unused-vars:0 no-eval:0*/

import React, {Component} from 'react';

class Checkout extends Component {
componentDidMount() {
    Sentry.configureScope((scope) => {
        scope.setTag("feature", "checkout");
    });
}

constructor(props) {
    super(props);
    this.state = {color: 'black', email: '', submitted_email: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
}

handleChange(event) {
    this.setState({email: event.target.value});
}

handleSubmit(event) {
    var email = this.state.email;
    this.setState({submitted_email: email});
    Sentry.configureScope((scope) => {
        scope.setUser({email});
    });
}

// ERRORS
notAFunctionError() {
    var obj = {
        validFunction: function () {}
    };
    obj.invalidFunction();
}

showError(color) {
    var that = this;
    that.setState({color: color});
    setTimeout(function () {
        that.setState({color: 'black'});
    }, 1500);
}


    render() {
        return (
          <div>
            <h1>Checkout Cart</h1>
            <div>
                <ul className="center list-group " onClick={this.showError.bind(this, 'red')}>
                    <div className="btn btn-success" onClick={this.notAFunctionError}>
                      <b>Checkout</b>
                    </div>
                </ul>
            </div>
          </div>

        );
    }
}

export default Checkout;
