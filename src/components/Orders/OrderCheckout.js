import React from "react";
import Burger from "../Burger/Burger";
import Button from "../UI/Button/Button";
import classes from "./OrderCheckout.module.css";

const Orders = props => {
  return (
    <div className={classes.Orders}>
      <h1>Divine Taste !</h1>
      <div>
        <Burger ingredients={props.ingredients} />
      </div>

      <Button btnType="Danger" clicked={props.cancelCheckout}>
        CANCEL
      </Button>

      <Button btnType="Success" clicked={props.continueCheckout}>
        CONTINUE
      </Button>
    </div>
  );
};

export default Orders;
