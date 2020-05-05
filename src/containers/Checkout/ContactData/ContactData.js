import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import { connect } from "react-redux";
import * as orderActionTypes from "../../../store/actions/index";
import axios from "../../../axios-order";
import ErrorHandler from "../../../hoc/ErrorHandler/ErrorHandler";
import { inputChangedHandler } from "../../../shared/utility";

class ContactData extends Component {
  state = {
    form: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name",
        },
        value: "",
        validation: {
          required: true,
          minLength: 4,
        },
        valid: false,
        touched: false,
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your Email",
        },
        value: "",
        validation: {
          required: true,
          minLength: 4,
        },
        valid: false,
        touched: false,
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      city: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "City",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "express", displayValue: "Express" },
            { value: "basic", displayValue: "Basic" },
          ],
        },
        value: "express",
        validation: {},
        valid: true,
        touched: false,
      },
    },

    formValidity: false,
  };

  orderHandler = (e) => {
    e.preventDefault();

    const customerData = {};
    for (let input in this.state.form) {
      customerData[input] = this.state.form[input].value;
    }
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: customerData,
      userId: this.props.userId,
    };

    this.props.postOrder(order, this.props.token);
    this.props.history.push("/");
  };

  callInputChangedHandler = (e, form, input) => {
    const updatedform = inputChangedHandler(e, form, input);
    this.setState({
      form: updatedform.updatedForm,
      formValidity: updatedform.isFormValid,
    });
  };

  render() {
    let formElements = [];

    for (let key in this.state.form) {
      formElements.push({
        id: key,
        config: this.state.form[key],
      });
    }

    let form = (
      <form onSubmit={this.orderHandler}>
        {formElements.map((el) => (
          <Input
            key={el.id}
            elementType={el.config.elementConfig}
            type={el.config.elementType}
            value={el.config.value}
            invalid={!el.config.valid}
            valid={el.config.valid}
            touched={el.config.touched}
            shouldValidate={el.config.validation}
            changed={(e) =>
              this.callInputChangedHandler(e, this.state.form, el.id)
            }
          />
        ))}

        <Button btnType="Success" disabled={!this.state.formValidity}>
          Confirm Order
        </Button>
      </form>
    );

    if (this.props.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Contact Details</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.burger.ingredients,
    price: state.burger.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    postOrder: (order, token) =>
      dispatch(orderActionTypes.purchaseBurger(order, token)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ErrorHandler(ContactData, axios));
