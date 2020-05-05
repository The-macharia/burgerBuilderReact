import React, { Component } from "react";
import Order from "../../../components/Orders/Order/Order";
import axios from "../../../axios-order";
import ErrorHandler from "../../../hoc/ErrorHandler/ErrorHandler";
import { fetchOrders } from "../../../store/actions";
import { connect } from "react-redux";
import Spinner from "../../../components/UI/Spinner/Spinner";

class Orders extends Component {
  componentDidMount() {
    this.props.fetchOrders(this.props.token, this.props.userId);
  }
  render() {
    let orders = <Spinner />;

    if (!this.props.loading) {
      orders = (
        <div>
          {this.props.orders.map((order) => (
            <Order
              key={order.id}
              ingredients={order.ingredients}
              price={+order.price}
            />
          ))}
        </div>
      );
    }
    return orders;
  }
}

const mapStateToProps = (state) => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchOrders: (token, userId) => dispatch(fetchOrders(token,userId)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ErrorHandler(Orders, axios));
