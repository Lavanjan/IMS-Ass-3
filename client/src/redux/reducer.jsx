const authReducer = (
  state = {
    data: null,
    loading: false,
    error: false,
  },
  action
) => {
  switch (action.type) {
    case "LOGIN_START":
      return { ...state, loading: true, error: false };
    case "LOGIN_SUCCESS":
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      return { ...state, data: action.data, loading: false, error: false };
    case "LOGIN_FAIL":
      return { ...state, loading: false, error: true };
    case "LOG_OUT":
      localStorage.clear();
      return {
        ...state,
        data: null,
        loading: false,
        error: false,
      };

    default:
      return state;
  }
};

export default authReducer;
