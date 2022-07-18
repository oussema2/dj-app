export const initialConnectState = {
  connected: false,
  dj: {},
};

export const connectReducer = (state = initialConnectState, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("token", action.payload.token);

      return { ...state, connected: true, dj: action?.payload };
    case "LITTLE_LOGIN":
      return { ...state, connected: true, dj: action?.payload };
    case "LOGOUT":
      localStorage.removeItem("token");
      return { ...state, connected: false, dj: {} };
    default:
      break;
  }
};
