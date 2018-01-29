/*global undefinedVariable:false Raven:false*/
/*eslint no-unused-vars:0 no-eval:0*/

import React, { Component } from 'react';
import logo from '../assets/sentry-glyph-black.png';

class Errors extends Component {
    constructor(props) {
        super(props);
        this.state = {color: 'black', email: '', submitted_email: ''};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        Raven.setTagsContext({ sampleTag: "Checkout" });
    }

    handleChange(event) {
        this.setState({email: event.target.value});
    }

    handleSubmit(event) {
        var email = this.state.email;
        this.setState({submitted_email: email});
        Raven.setUserContext({email});
    }

    // ERRORS
    notAFunctionError() {
        var obj = {
            notTheRightFunction: function () {}
        };
        obj.doesNotExist();
    }

    uriError() {
        decodeURIComponent('%');
    }

    typeError() {
        null.f();
    }

    syntaxError() {
        eval('foo bar');
    }

    referenceError() {
        var a = undefinedVariable;
    }

    rangeError() {
        throw new RangeError('Parameter must be between 1 and 100');
    }

    evalError() {
        throw new EvalError('Hello', 'someFile.js', 10);
    }
    // ERRORS (end)

    showError(color) {
        var that = this;
        that.setState({color: color});
        setTimeout(function () {
            that.setState({color: 'black'});
        }, 1500);
    }

    render() {

        return (
            <div style={{
                color: this.state.color
            }}>
            <div className="center">
            <form onSubmit={(e) => { e.preventDefault();}}>
                <div className="form-group">
                    <input type="email" className="form-control" onChange={this.handleChange} placeholder="Enter email"/>
                </div>
                <button type="submit" onClick={this.handleSubmit} className="btn btn-primary">Submit</button>                
            </form>
            </div>

                <h2>Hi, {this.state.submitted_email
                        ? this.state.submitted_email
                        : "Guest"}.</h2>
                <div>
                    <ul className="center list-group " onClick={this.showError.bind(this, 'red')}>
                        <li className="list-group-item list-group-item-danger">
                            <h3>ERRORS</h3>
                        </li>
                        <li className="list-group-item" onClick={this.notAFunctionError}>
                            <h3>TypeError</h3>
                            <p>obj.attributeInvalid is not a function</p>
                        </li>
                        <li className="list-group-item" onClick={this.uriError}>
                            <h3>URIError</h3>
                            <p>URI malformed
                            </p>
                        </li>
                        <li className="list-group-item" onClick={this.typeError}>
                            <h3>Uncaught TypeError</h3>
                            <p>Cannot read property 'f' of null</p>
                        </li>
                        <li className="list-group-item" onClick={this.syntaxError}>
                            <h3>SyntaxError</h3>
                            <p>Unexpected identifier</p>
                        </li>
                        <li className="list-group-item" onClick={this.referenceError}>
                            <h3>ReferenceError</h3>
                            <p>undefinedVariable is not defined</p>
                        </li>
                        <li className="list-group-item" onClick={this.rangeError}>
                            <h3>RangeError</h3>
                            <p>Parameter must be between 1 and 100</p>
                        </li>
                        <li className="list-group-item" onClick={this.evalError}>
                            <h3>EvalError</h3>
                            <p>Hello</p>
                        </li>
                    </ul>
                </div>
            </div>

        );
    }
}

export default Errors;
