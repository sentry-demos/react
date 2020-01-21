/*global Sentry*/
import React, { Component } from "react";
import "./App.css";
import wrenchImg from "../assets/wrench.png";
import nailsImg from "../assets/nails.png";
import hammerImg from "../assets/hammer.png";
import { SplitFactory } from '@splitsoftware/splitio';

const PORT = process.env.REACT_APP_PORT || 3001
const request = require('request');

const monify = n => (n / 100).toFixed(2);
const getUniqueId = () => '_' + Math.random().toString(36).substr(2, 9);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: [],
      lastSplitUpdate: -1
    };

    // Instantiate the SDK
    var factory = SplitFactory({ 
      core: {
        authorizationKey: 't2fmorjes3mslhms9jjua3glm4q2fotaje2v',
        // the key can be the logged in
        // user id, or the account id that 
        // the logged in user belongs to. 
        // The type of customer (user, account, custom)
        // is chosen during Split's sign-up process.
        key: 'kevin'
      }
    });

    // And get the client instance you'll use
    this.splitClient = factory.client();

    this.store =[{
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
    }];

    this.splitClient.once(this.splitClient.Event.SDK_READY, ()=> {
      var treatment = this.splitClient.getTreatment("new_wrench");
      if (treatment == "on") {
        // insert code here to show on treatment
        this.store.unshift({
            id: "wrench",
            name: "Wrench",
            price: 500,
            img: wrenchImg
          });
      }
      this.setState({ lastSplitUpdate: Date.now() });
    });

    // generate random email
    this.email =
      Math.random()
        .toString(36)
        .substring(2, 6) + "@yahoo.com";

        
    this.buyItem = this.buyItem.bind(this);
    this.checkout = this.checkout.bind(this);
    this.resetCart = this.resetCart.bind(this);

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
      scope.setTag("customerType", "medium-plan"); // custom-tag
    });

    // Add a listener to Split SDK_UPDATE event so we can react to rollout plan changes.
    this.splitClient.on(this.splitClient.Event.SDK_UPDATE, ()=> {
      var treatment = this.splitClient.getTreatment("new_wrench");
      let wrenchIndex = this.store.findIndex((item => item.id === 'wrench'));

      if (treatment === "on" && wrenchIndex === -1) {
        // insert code here to show on treatment
        this.store.unshift({
            id: "wrench",
            name: "Wrench",
            price: 500,
            img: wrenchImg
          });
      } else if (wrenchIndex >= 0) {
        this.store.splice(wrenchIndex, 1);
      }
      // Quick way to trigger a re-render to avoid moving the store data.
      this.setState({ lastSplitUpdate: Date.now() });
    });

    //Will add an XHR Sentry breadcrumb
    this.performXHRRequest();
  }

  buyItem(item) {
    const cart = [].concat(this.state.cart);
    cart.push(item);
    console.log(item);
    this.setState({ cart, success: false });

    Sentry.configureScope(scope => {
      scope.setExtra('cart', JSON.stringify(cart));
    });
    Sentry.addBreadcrumb({
      category: 'cart',
      message: 'User added ' + item.name + ' to cart',
      level: 'info'
    });
  }

  resetCart(event) {
    event.preventDefault();
    this.setState({ cart: [], hasError: false, success: false });

    Sentry.configureScope(scope => {
      scope.setExtra('cart', '');
    });
    Sentry.addBreadcrumb({
      category: 'cart',
      message: 'User emptied cart',
      level: 'info'
    });
  }

  performXHRRequest(){
    fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then(response => response.json())
      .then(json => console.log(json));
  }

  checkout() {
    this.myCodeIsPerfect();

    /*
      POST request to /checkout endpoint.
        - Custom header with transactionId for transaction tracing
        - throw error if response !== 200
    */
    const order = {
      email: this.email,
      cart: this.state.cart
    };

    // generate unique transactionId and set as Sentry tag
    const transactionId = getUniqueId();
    Sentry.configureScope(scope => {
      scope.setTag("transaction_id", transactionId);
    });
    // perform request (set transctionID as header and throw error appropriately)
    request.post({
        url: `http://localhost:${PORT}/checkout`,
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
            <p className="cart-error">Something went wrong</p>
          )}
          {this.state.success && (
            <p className="cart-success">Thank you for your purchase!</p>
          )}
          <button
            onClick={this.checkout}
            disabled={this.state.cart.length === 0}
          >
            Checkout
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
