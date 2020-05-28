/*global Sentry*/
import React, { Component } from "react";
import { connect } from 'react-redux';

import "./App.css";
import wrenchImg from "../assets/wrench.png";
import nailsImg from "../assets/nails.png";
import hammerImg from "../assets/hammer.png";
import * as actions from '../store/actions/index';

const PORT = process.env.REACT_APP_PORT || 3001;
const BACKEND = process.env.REACT_APP_BACKEND || `http://localhost:${PORT}`;
const IS_WORKFLOW_DEMO = process.env.REACT_APP_WORKFLOW !== "false";

const request = require('request');


const monify = n => (n / 100).toFixed(2);
const getUniqueId = () => '_' + Math.random().toString(36).substr(2, 9);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      success: false,
      hasError: false
    };

    // generate random email
    this.email =
      Math.random()
        .toString(36)
        .substring(2, 6) + "@yahoo.com";

    this.store = [
      {
        id: "wrench",
        name: "Wrench",
        price: 500,
        img: wrenchImg
      },
      {
        id: "nails",
        name: "Nails",
        price: 25,
        img: nailsImg
      },
      {
        id: "hammer",
        name: "Hammer",
        price: 1000,
        img: hammerImg
      }
    ];

    this.checkout = this.checkout.bind(this);

    // generate unique sessionId and set as Sentry tag
    this.sessionId = getUniqueId();
    Sentry.configureScope(scope => {
      scope.setTag("session_id", this.sessionId);
    });
  }

  componentDidMount() {
    const defaultError = window.onerror;
    window.onerror = error => {
      this.setState({ hasError: true, success: false });
      defaultError(error);
    };
    // Add context to error/event
    Sentry.configureScope(scope => {
      scope.setUser({ email: this.email }); // attach user/email context
      scope.setTag("customerType", this.getPlanName()); // custom-tag
    });

    //Will add an XHR Sentry breadcrumb
    this.performXHRRequest();
  }

   getPlanName() {
     const plans = ["medium-plan", "large-plan", "small-plan", "enterprise"];
     return plans[Math.floor(Math.random() * plans.length)];
   }

  performXHRRequest(){
    fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then(response => response.json())
      .then(json => console.log(json));
  }

  checkout() {
    Sentry.addBreadcrumb({
      category: 'cart',
      message: 'User clicked on Checkout',
      level: 'info'
    });

    if (IS_WORKFLOW_DEMO) {
      this.myCodeIsPerfect();
    }

    /*
      POST request to /checkout endpoint.
        - Custom header with transactionId for transaction tracing
        - throw error if response !== 200
    */
    const order = {
      email: this.email,
      cart: this.props.cart
    };

    // generate unique transactionId and set as Sentry tag
    const transactionId = getUniqueId();
    Sentry.configureScope(scope => {
      scope.setTag("transaction_id", transactionId);
    });
    // perform request (set transctionID as header and throw error appropriately)
    request.post({
        url: `${BACKEND}/checkout`,
        json: order,
        headers: {
          "X-Session-ID": this.sessionId,
          "X-Transaction-ID": transactionId

        }
      }, (error, response) => {
        if (error) {
          throw error;
        }
        if (response.statusCode === 200) {
          this.setState({ success: true });
        } else {
          throw new Error(response.statusCode + " - " + (response.statusMessage || response.body));
        }
      }
    );
  }

  render() {
    const total = this.props.cart.reduce((t, i) => t + i.price, 0);
    const cartDisplay = this.props.cart.reduce((c, { id }) => {
      c[id] = c[id] ? c[id] + 1 : 1;
      return c;
    }, {});

    return (
      <div className="App">
        <main>
          <header>
            <h1>Online Hardware Store</h1>
          </header>

          <div className="inventory">
            {this.store.map(item => {
              const { name, id, img, price } = item;
              return (
                <div className="item" key={id}>
                  <div className="thumbnail">
                    <img src={img} alt="" />
                  </div>
                  <p>{name}</p>
                  <div className="button-wrapper">
                    <strong>${monify(price)}</strong>
                    <button onClick={() => this.props.onBuyItem(item)}>Buy!</button>
                  </div>
                </div>
              );
            })}
          </div>
        </main>
        <div className="sidebar">
          <header>
            <h4>Hi, {this.email}!</h4>
          </header>
          <div className="cart">
            {this.props.cart.length ? (
              <div>
                {Object.keys(cartDisplay).map(id => {
                  const { name, price } = this.store.find(i => i.id === id);
                  const qty = cartDisplay[id];
                  return (
                    <div className="cart-item" key={id}>
                      <div className="cart-item-name">
                        {name} x{qty}
                      </div>
                      <div className="cart-item-price">
                        ${monify(price * qty)}
                      </div>
                    </div>
                  );
                })}
                <hr />
                <div className="cart-item">
                  <div className="cart-item-name">
                    <strong>Total</strong>
                  </div>
                  <div className="cart-item-price">
                    <strong>${monify(total)}</strong>
                  </div>
                </div>
              </div>
            ) : (
              "Your cart is empty"
            )}
          </div>
          {this.state.hasError && (
            <p className="cart-error">Something went wrong</p>
          )}
          {this.state.success && (
            <p className="cart-success">Thank you for your purchase!</p>
          )}
          <button
            onClick={this.checkout}
            disabled={this.props.cart.length === 0}
          >
            Checkout
          </button>{" "}
          {this.props.cart.length > 0 && (
            <button onClick={this.props.onResetCart} className="cart-reset">
              Empty cart
            </button>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
      cart: state.cart,
  };
};

const mapDispatchToProps = dispatch => {
  return {
      onBuyItem: (item) => dispatch(actions.buyItem(item)),
      onResetCart: () => dispatch(actions.resetCart()),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
