import React, { Component } from "react";
import Aux from "../../hoc/Aux/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-order";
import Spinner from "../../components/UI/Spinner/Spinner";
import ErrorHandler from "../../hoc/ErrorHandler/ErrorHandler";
import * as BurgerBuilderActions from "../../store/actions/index";
import { connect } from "react-redux";

export class BurgerBuilder extends Component {
  state = {
    purchasing: false,
  };

  componentDidMount() {
    this.props.fetchIngredients();
  }

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0;
  }

  // addIngredients = type => {
  //   const updatedCount = this.state.ingredients[type] + 1;

  //   const updatedIngredients = {
  //     ...this.state.ingredients
  //   };
  //   updatedIngredients[type] = updatedCount;
  //   const priceAddition = INGREDIENT_PRICES[type];
  //   const newPrice = this.state.totalPrice + priceAddition;

  //   this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });
  //   this.updatePurchaseState(updatedIngredients);
  // };

  // removeIngredients = type => {
  //   const updatedCount = this.state.ingredients[type] - 1;
  //   const updatedIngredients = { ...this.state.ingredients };
  //   updatedIngredients[type] = updatedCount;
  //   const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];

  //   if (updatedIngredients[type] >= 0) {
  //     this.setState({
  //       ingredients: updatedIngredients,
  //       totalPrice: newPrice
  //     });
  //   }
  //   this.updatePurchaseState(updatedIngredients);
  // };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  cancelPurchaseHandler = () => {
    this.setState({ purchasing: false });
  };

  continuePurchaseHandler = () => {
    // this.setState({ loading: true });
    if ((this.props.isAuth)) {
      const queryParams = [];

      for (let i in this.props.ingredients) {
        queryParams.push(
          encodeURIComponent(i) +
            "=" +
            encodeURIComponent(this.props.ingredients[i])
        );
      }
      queryParams.push("price=" + this.props.price);

      const queryString = queryParams.join("&");
      this.props.history.push({
        pathname: "/checkout",
        search: "?" + queryString,
      });
    } else {
      this.props.onSetAuthRedirectPath('/checkout')
      this.props.history.push("/auth");
    }
  };

  render() {
    let burger = this.props.error ? <p>Something went wrong!</p> : <Spinner />;
    let orderSummary = null;

    const disabledInfo = {
      ...this.props.ingredients,
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    if (this.props.ingredients) {
      burger = (
        <Aux>
          <div>
            <Burger ingredients={this.props.ingredients} />
          </div>
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            purchaseable={this.updatePurchaseState(this.props.ingredients)}
            price={this.props.price}
            ordered={this.purchaseHandler}
          />
        </Aux>
      );

      orderSummary = (
        <OrderSummary
          ingredients={this.props.ingredients}
          close={this.cancelPurchaseHandler}
          price={this.props.price}
          continue={this.continuePurchaseHandler}
        />
      );
    }
    // if (this.state.loading) {
    //   orderSummary = <Spinner />;
    // }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClose={this.cancelPurchaseHandler}
        >
          {orderSummary}
        </Modal>

        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.burger.ingredients,
    price: state.burger.totalPrice,
    error: state.burger.error,
    isAuth: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (igName) =>
      dispatch(BurgerBuilderActions.addIngredient(igName)),
    onIngredientRemoved: (igName) =>
      dispatch(BurgerBuilderActions.removeIngredient(igName)),
    fetchIngredients: () => dispatch(BurgerBuilderActions.fetchIngredients()),
    onSetAuthRedirectPath: (path) => dispatch(BurgerBuilderActions.setAuthRedirectPath(path))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ErrorHandler(BurgerBuilder, axios));
