import loopit from "../api/loopit";

export const logIn = (id, username, theme, editorTheme) => {
  return {
    type: "LOG_IN",
    payload: {
      id,
      username,
      theme,
      editorTheme,
    },
  };
};

export const updateUser = (username, email, fullname, theme, editorTheme) => {
  return {
    type: "UPDATE_USER",
    payload: {
      username,
      email,
      fullname,
      theme,
      editorTheme,
    },
  };
};

export const signOut = () => async (dispatch) => {
  await loopit.get("/auth/logout");

  dispatch({ type: "SIGN_OUT" });
};

export const checkUserAuth = () => async (dispatch) => {
  const payload = {
    status: false,
    id: null,
    username: null,
    theme: "light",
    editorTheme: "vs-dark",
  };

  try {
    const response = await loopit.get("/auth/verify");
    switch (response.data.status) {
      case "authorized":
        payload.status = true;
        payload.id = response.data.id;
        payload.username = response.data.username;
        payload.theme = response.data.theme;
        payload.editorTheme = response.data.editorTheme;
        break;
      default:
        break;
    }
    dispatch({
      type: "CHECK_USER_AUTH",
      payload,
    });
  } catch (error) {
    dispatch({
      type: "CHECK_USER_AUTH",
      payload,
    });
  }
};

export const setHasData = () => {
  return {
    type: "SET_HAS_DATA",
  };
};

export const fetchUser = () => async (dispatch) => {
  try {
    const response = await loopit.get("/users/me");
    dispatch({ type: "FETCH_USER", payload: response.data.me });
  } catch (error) {
    await loopit.get("/auth/logout");
    dispatch({ type: "FETCH_USER", payload: null });
  }
};

export const fetchLoops = () => async (dispatch) => {
  const response = await loopit.get("/loops/all", {
    params: {
      limit: 6,
    },
  });

  dispatch({ type: "FETCH_LOOPS", payload: response.data.loops });
};

export const fetchSaves = () => async (dispatch) => {
  const response = await loopit.get("/users/saves");

  dispatch({ type: "FETCH_SAVED", payload: response.data.loops });
};

export const fetchCreated = (username) => async (dispatch) => {
  if (username) {
    const response = await loopit.get(`/loops/all?username=${username}`);

    dispatch({ type: "FETCH_CREATED", payload: response.data.loops });
  }
};

export const fetchSearch = (user, option) => async (dispatch) => {
  const response = await loopit.get(`/loops/all?${option}=${user}`);

  dispatch({ type: "FETCH_SEARCH", payload: response.data.loops });
};

export const updateLoops = (collection, action, state, id) => {
  return {
    type: "UPDATE_LOOPS",
    payload: {
      action,
      collection,
      state,
      id,
    },
  };
};

export const clearLoops = () => {
  return {
    type: "CLEAR_LOOPS",
  };
};

export const switchTheme = () => {
  return {
    type: "SWITCH_THEME",
  };
};
