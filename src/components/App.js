/*global Sentry*/

import React, { Component } from "react";
import "./App.css";
import wrenchImg from "../assets/wrench.png";
import nailsImg from "../assets/nails.png";
import hammerImg from "../assets/hammer.png";

const monify = n => (n / 100).toFixed(2);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: []
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
    this.buyItem = this.buyItem.bind(this);
    this.resetCart = this.resetCart.bind(this);
  }

  componentDidMount() {
    const defaultError = window.onerror;
    window.onerror = error => {
      this.setState({ hasError: true });
      defaultError(error);
    };
    // Add context to error/event
    Sentry.configureScope(scope => {
      scope.setUser({ email: this.email }); // attach user/email context
      scope.setTag("customerType", "medium-plan"); // custom-tag
    });
  }

  buyItem(item) {
    const cart = [].concat(this.state.cart);
    cart.push(item);
    console.log(item);
    this.setState({ cart });
  }

  resetCart(event) {
    event.preventDefault();
    this.setState({ cart: [], hasError: false });
  }

  proceedToCheckout() {
    this.myCodeIsPerfect();
  }

  render() {
    const total = this.state.cart.reduce((t, i) => t + i.price, 0);
    const cartDisplay = this.state.cart.reduce((c, { id }) => {
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
                    <button onClick={() => this.buyItem(item)}>Buy!</button>
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
            {this.state.cart.length ? (
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
            <p className="cart-error">Somethign went wrong</p>
          )}
          <button
            onClick={this.proceedToCheckout}
            disabled={this.state.cart.length === 0}
          >
            Proceed to checkout
          </button>{" "}
          {this.state.cart.length > 0 && (
            <button onClick={this.resetCart} className="cart-reset">
              Empty cart
            </button>
          )}
        </div>
      </div>
    );
  }
}

export default App;
