import React, { Component } from "react";
import Aux from "../../../hoc/Aux/Aux";
import Button from "../../UI/Button/Button";

class OrderSummary extends Component {
  //This could be a functional component rather than a class component.

  componentWillUpdate() {
    console.log('order summary will update')
  }

  render() {
    const ingredientsSummary = Object.keys(this.props.ingredients).map(igKey => {
      return (
        <li key={igKey}>
          <span style={{ textTransform: "capitalize" }}>{igKey}</span>:
          {this.props.ingredients[igKey]}
        </li>
      );
    });

    return (
      <Aux>
        <h3>Your Order</h3>
        <p>A delicious burger with the following Inredients:</p>
        <ul>{ingredientsSummary}</ul>
        <p>Continue to checkout? </p>
        <h4>
          Total Price: <strong>{this.props.price.toFixed(2)}</strong>
        </h4>

        <Button btnType="Danger" clicked={this.props.close}>
          Cancel
        </Button>
        <Button btnType="Success" clicked={this.props.continue}>
          Continue
        </Button>
      </Aux>
    );
  }
}

export default OrderSummary;
