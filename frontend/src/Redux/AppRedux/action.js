import * as types from "./actionTypes";
import axios from "axios";

const getDataAll = (text) => (dispatch) => {
  dispatch({ type: types.GET_DATA_REQUEST });
  const url = `https://api.unsplash.com/search/photos/?client_id=AqAI1Rg6K0lBNYCDapx5N3i3IlPfrRloHV4gVPvtwek&query=${text}`
  // console.log("changed id", id)
  return axios
    .get(url)
    .then((r) => {
        console.log(r.data.results)
      return dispatch({
        type: types.GET_DATA_SUCCESS,
        payload: r.data.results,
      });
    })
    .catch((e) => {
      return dispatch({ type: types.GET_DATA_FAILURE, payload: e });
    });
};

export { getDataAll };
