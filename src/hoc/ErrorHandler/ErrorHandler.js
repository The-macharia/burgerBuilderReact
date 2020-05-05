import React, { Component } from "react";
import Aux from "../Aux/Aux";
import Modal from "../../components/UI/Modal/Modal";


const ErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null
    };

    UNSAFE_componentWillMount() {
      this.reqInterceptors =  axios.interceptors.request.use(req => {
        this.setState({ error: null });
        return req;
      });
      this.resInterceptors =  axios.interceptors.response.use(
        res => res,
        error => {
          this.setState({ error: error });
        }
      );
    }
    componentWillUnmount(){
        axios.interceptors.request.eject(this.reqInterceptors);
        axios.interceptors.response.eject(this.resInterceptors);
    }

    errorResolvedHandler = () => {
      this.setState({ error: false });
    };
    render() {
      return (
        <Aux>
          <Modal show={this.state.error} modalClose={this.errorResolvedHandler}>
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Aux>
      );
    }
  };
};

export default ErrorHandler;
