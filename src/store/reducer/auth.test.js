import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import reducer from "./auth";
import * as actionTypes from "../actions/actionTypes";
import { logOut } from "../actions/auth";

configure({ adapter: new Adapter() });

describe("Auth Reducer", () => {
  let state;
  let newState;
  beforeAll(() => {
    state = {
      token: null,
      error: null,
      loading: false,
      userId: null,
      authRedirectPath: "/",
    };
    newState = {
      token: "some-token",
      error: null,
      loading: false,
      userId: "some-user-id",
      authRedirectPath: "/",
    };
  });

  afterAll(() => {
    state = null;
    newState = null;
  });

  it("should return initial state", () => {
    expect(reducer(state, {})).toEqual({
      token: null,
      error: null,
      loading: false,
      userId: null,
      authRedirectPath: "/",
    });
  });

  it("should update token and userId correctly", () => {
    const payload = {
      type: actionTypes.AUTH_SUCCESS,
      idToken: "some-token",
      localId: "some-user-id",
    };
    expect(reducer(state, payload)).toEqual({
      token: "some-token",
      error: null,
      loading: false,
      userId: "some-user-id",
      authRedirectPath: "/",
    });
  });

  it("should clear token and userId on logout", () => {
    const payload = {
      type: actionTypes.AUTH_LOGOUT
    };

    expect(reducer(newState, payload)).toEqual(state);
  });

});
