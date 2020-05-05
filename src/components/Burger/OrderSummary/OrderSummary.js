import React, { Component } from "react";
import Aux from "../../../hoc/Aux/Aux";
import Button from "../../UI/Button/Button";
import { connect } from "react-redux";

class OrderSummary extends Component {

  render() {
    const ingredientsSummary = Object.keys(this.props.ingredients).map(igKey => {
      return (
        <li key={igKey}>
          <span style={{ textTransform: "capitalize" }}>{igKey}</span>:
          {this.props.ingredients[igKey]}
        </li>
      );
    });

    let button = <Button btnType="Success" clicked={this.props.continue}>Sign In To Continue</Button>

    if (this.props.isAuth){
      button = (<Aux>
        <Button btnType="Danger" clicked={this.props.close}>
          Cancel
        </Button>
        <Button btnType="Success" clicked={this.props.continue}>
          Continue
        </Button>
      </Aux>)
    }


    return (
      <Aux>
        <h3>Your Order</h3>
        <p>A delicious burger with the following Inredients:</p>
        <ul>{ingredientsSummary}</ul>
        <p>Continue to checkout? </p>
        <h4>
          Total Price: <strong>{this.props.price.toFixed(2)}</strong>
        </h4>
        {button}
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.token !== null
  }
}

export default connect(mapStateToProps)(OrderSummary);
