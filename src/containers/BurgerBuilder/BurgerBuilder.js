import React, { Component } from "react";
import Aux from "../../hoc/Aux/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-order";
import Spinner from "../../components/UI/Spinner/Spinner";
import ErrorHandler from "../../hoc/ErrorHandler/ErrorHandler";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 1.5
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    error: false,
    totalPrice: 4,
    purchaseable: false,
    purchasing: false,
    loading: false
  };

  componentDidMount() {
    axios
      .get("https://burger-builder-e839e.firebaseio.com/ingredients.json")
      .then(res => this.setState({ ingredients: res.data }))
      .catch(error => this.setState({ error: true }));
  }

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    this.setState({ purchaseable: sum > 0 });
  }

  addIngredients = type => {
    const updatedCount = this.state.ingredients[type] + 1;

    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const newPrice = this.state.totalPrice + priceAddition;

    this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });
    this.updatePurchaseState(updatedIngredients);
  };

  removeIngredients = type => {
    const updatedCount = this.state.ingredients[type] - 1;
    const updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[type] = updatedCount;
    const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];

    if (updatedIngredients[type] >= 0) {
      this.setState({
        ingredients: updatedIngredients,
        totalPrice: newPrice
      });
    }
    this.updatePurchaseState(updatedIngredients);
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  cancelPurchaseHandler = () => {
    this.setState({ purchasing: false });
  };

  continuePurchaseHandler = () => {
    this.setState({ loading: true });

    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: "Eric Waweru",
        email: "test@test.com",
        "delivery-method": "express",
        address: {
          street: "12 Eastern Side",
          city: "Nairobi"
        }
      }
    };

    axios
      .post("/orders.json", order)
      .then(res => {
        this.setState({ loading: false, purchasing: false });
        console.log(res);
      })
      .catch(error => {
        this.setState({ loading: false, purchasing: false });
        console.log(error);
      });
  };

  render() {
    let burger = <Spinner />;
    let orderSummary = null;

    const disabledInfo = {
      ...this.state.ingredients
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    if (this.state.ingredients) {

      burger = (
        <Aux>
          <div>
            <Burger ingredients={this.state.ingredients} />
          </div>
          <BuildControls
            ingredientAdded={this.addIngredients}
            ingredientRemoved={this.removeIngredients}
            disabled={disabledInfo}
            purchaseable={this.state.purchaseable}
            price={this.state.totalPrice}
            ordered={this.purchaseHandler}
          />
        </Aux>
      );

      orderSummary = (
        <OrderSummary
          ingredients={this.state.ingredients}
          close={this.cancelPurchaseHandler}
          price={this.state.totalPrice}
          continue={this.continuePurchaseHandler}
        />
      );

    }
    if (this.state.loading) {
        orderSummary = <Spinner />;
      }

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

export default ErrorHandler(BurgerBuilder, axios);
