import React, { Component } from "react";
import OrderCheckout from "../../components/Orders/OrderCheckout";
import { Route, Redirect } from "react-router-dom";
import ContactData from "./ContactData/ContactData";
import { connect } from "react-redux";

class Checkout extends Component {
  // state = {
  //   ingredients: {},
  //   totalPrice: 0,
  // };

  // componentDidMount() {

  //   const query = new URLSearchParams(this.props.location.search);
  //   const ingredients = {};
  //   let price = 0;

  //   for (let param of query.entries()) {
  //     if (param[0] === "price") {
  //       price = param[1];
  //     } else {
  //       ingredients[param[0]] = +param[1];
  //     }
  //   }
  //   this.setState({ ingredients: ingredients, totalPrice: price });
  // }

  cancelCheckoutHandler = () => {
    this.props.history.goBack();
  };

  continueCheckoutHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  render() {
    let summary = <Redirect to="/" />;
    if (this.props.ingredients) {
      summary = (
        <div>
          <OrderCheckout
            ingredients={this.props.ingredients}
            cancelCheckout={this.cancelCheckoutHandler}
            continueCheckout={this.continueCheckoutHandler}
          />
          <Route
            path={this.props.match.url + "/contact-data"}
            component={ContactData}
          />
        </div>
      );
    }
    return summary;
    // return (
    //   <div>
    //     {/* <Route
    //       path={this.props.match.url + "/contact-data"}
    //       render={props => (
    //         <ContactData
    //           ingredients={this.props.ingredients}
    //           price={this.props.price}
    //           {...props}
    //         />
    //       )}
    //     /> */}
    //   </div>
    // );
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.burger.ingredients,
  };
};

export default connect(mapStateToProps)(Checkout);
