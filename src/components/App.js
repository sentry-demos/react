/*global Sentry*/

import React, { Component } from 'react';
import './App.css';
import screwdriverImg from '../assets/screwdriver.png';
import nailsImg from '../assets/nails.png';
import hammerImg from '../assets/hammer.png';

class App extends Component {
  constructor(props) {
    super(props);

    // generate random email
    this.email = Math.random().toString(36).substring(2, 6) + "@yahoo.com";

    this.store = {
      nails: {
        price: 0.25
      },
      screwdriver: {
        price: 5
      }
    };
    this.buyItem = this.buyItem.bind(this);
  }

  componentDidMount() {
    // Add context to error/event
    Sentry.configureScope((scope) => {
        scope.setUser({ email: this.email}); // attach user/email context
        scope.setTag("customerType", "medium-plan"); // custom-tag
    });
  }

  buyItem(item) {
    var price = this.store[item.toLowerCase()].price;
    if (window.confirm("Do you want to buy " + item + " for $" + price + "?")) {
        alert("$" + price + " has been charged to your account.");
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Online Hardware Store</h1>
          <h4>Hi, {this.email}!</h4>
          <div>
            <div className="item">
              <img src={screwdriverImg} className="App-logo" alt="logo" />
              <p>Screwdriver</p>
              <button onClick={() => this.buyItem('screwdriver')}> Buy! </button>
            </div>

            <div className="item">
              <img src={nailsImg} className="App-logo" alt="logo" />
              <p>Nails</p>
              <button onClick={() => this.buyItem('nails')}> Buy! </button>
            </div>

            <div className="item">
                <img src={hammerImg} className="App-logo" alt="logo" />
                <p>Hammer</p>
                <button onClick={() => this.buyItem('hammer')}> Buy! </button>
            </div>
          </div>
        </header>
      </div>
    );
  }
}

export default App;
