import React, { Component } from "react";
import classes from "./Auth.module.css";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import Spinner from "../../components/UI/Spinner/Spinner";
import * as actions from "../../store/actions/auth";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { inputChangedHandler } from "../../shared/utility";

class Auth extends Component {
  state = {
    form: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          autoComplete: "email",
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
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          autoComplete: "current-password",
          placeholder: "Your Password",
        },
        value: "",
        validation: {
          required: true,
          minLength: 6,
        },
        valid: false,
        touched: false,
      },
    },
    isSignup: true,
  };

  componentDidMount() {
    if (!this.props.building && this.props.authRedirectPath !== "/") {
      this.props.onSetAuthRedirectPath();
    }
  }

  callInputChangedHandler = (e, form, input) => {
    const updatedform = inputChangedHandler(e,form,input)
    this.setState({ form: updatedform.updatedForm });
  }

  switchAuthModeHandler = () => {
    this.setState((prevState) => {
      return {
        isSignup: !prevState.isSignup,
      };
    });
  };

  submitHandler = (e) => {
    e.preventDefault();
    this.props.onAuth(
      this.state.form.email.value,
      this.state.form.password.value,
      this.state.isSignup
    );
  };

  render() {
    let formElements = [];

    for (let key in this.state.form) {
      formElements.push({
        id: key,
        config: this.state.form[key],
      });
    }

    let error = null;
    if (this.props.error) {
      error = <p>{this.props.error.message}</p>;
    }

    let form = formElements.map((el) => (
      <Input
        key={el.id}
        elementType={el.config.elementConfig}
        type={el.config.elementType}
        value={el.config.value}
        invalid={!el.config.valid}
        valid={el.config.valid}
        touched={el.config.touched}
        shouldValidate={el.config.validation}
        changed={(e) => this.callInputChangedHandler(e, this.state.form, el.id)}
      />
    ));

    if (this.props.loading) {
      form = <Spinner />;
    }

    let authRedirect = null;
    if (this.props.isAuth) {
      authRedirect = <Redirect to={this.props.authRedirectPath} />;
    }

    return (
      <div className={classes.Auth}>
        {authRedirect}
        {error}
        <form onSubmit={this.submitHandler}>
          {form}
          <Button btnType="Success">SUBMIT</Button>
        </form>
        <Button btnType="Danger" clicked={this.switchAuthModeHandler}>
          {!this.state.isSignup ? "Create An Account" : "Log In Instead"}
        </Button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuth: state.auth.token !== null,
    building: state.burger.building,
    authRedirectPath: state.auth.authRedirectPath,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, pass, isSignup) =>
      dispatch(actions.auth(email, pass, isSignup)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath("/")),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Auth);
