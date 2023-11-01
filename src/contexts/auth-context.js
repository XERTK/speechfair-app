import { createContext, useContext, useEffect, useReducer, useRef } from "react";
import PropTypes from "prop-types";
import { Formik } from "formik"; // Import Formik
import { auth } from "../config/firebase";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
import db from "../config/firebaseFirestore";
import { getDoc, doc, setDoc } from "firebase/firestore";

const HANDLERS = {
  INITIALIZE: "INITIALIZE",
  SIGN_IN: "SIGN_IN",
  SIGN_UP: "SIGN_UP",
  SIGN_OUT: "SIGN_OUT",
};

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
};

const handlers = {
  [HANDLERS.INITIALIZE]: (state, action) => {
    const user = action.payload;

    return {
      ...state,
      ...(user
        ? {
            isAuthenticated: true,
            isLoading: false,
            user,
          }
        : {
            isLoading: false,
          }),
    };
  },
  [HANDLERS.SIGN_IN]: (state, action) => {
    const user = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
  [HANDLERS.SIGN_UP]: (state, action) => {
    const user = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
  [HANDLERS.SIGN_OUT]: (state) => {
    return {
      ...state,
      isAuthenticated: false,
      user: null,
    };
  },
};

const reducer = (state, action) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

export const AuthContext = createContext();

export const AuthProvider = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);
  const initialized = useRef(false);

  const initialize = async () => {
    // Prevent from calling twice in development mode with React.StrictMode enabled
    if (initialized.current) {
      return;
    }

    initialized.current = true;

    let isAuthenticated = false;

    try {
      isAuthenticated = window.localStorage.getItem("authenticated") === "true";
    } catch (err) {
      console.error(err);
    }

    if (isAuthenticated) {
      dispatch({
        type: HANDLERS.INITIALIZE,
        payload: getCurrentUser(),
      });
    } else {
      dispatch({
        type: HANDLERS.INITIALIZE,
      });
    }
  };

  useEffect(
    () => {
      initialize();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const skip = () => {
    try {
      window.localStorage.setItem("authenticated", "true");
    } catch (err) {
      console.error(err);
    }
    dispatch({
      type: HANDLERS.SIGN_IN,
      payload: getCurrentUser(),
    });
  };

  const getCurrentUser = () => {
    // TODO: get logged in user from firebase
    const user = {};
    return user;
  };

  const signIn = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      window.localStorage.setItem("authenticated", "true");
      dispatch({
        type: HANDLERS.SIGN_IN,
        payload: getCurrentUser(),
      });
    } catch (error) {
      console.error("Error logging in:", error.message);
      throw new Error(error.message);
    }
  };

  const signOut = () => {
    dispatch({
      type: HANDLERS.SIGN_OUT,
    });
  };

  // Implement signUp function, if needed
  const signUp = async (email, firstName, lastName, password, phoneNumber, isEmail, isWhatsApp) => {
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      window.localStorage.setItem("authenticated", "true");
      const userData = {
        uid: user.uid,
        email,
        role: "user",
        firstName,
        lastName,
        phoneNumber,
        isEmail,
        isWhatsApp,
      };
      await setDoc(doc(db, "users", user.uid), userData);
      dispatch({
        type: HANDLERS.SIGN_UP,
        payload: getCurrentUser(),
      });
    } catch (error) {
      const authError = error;
      if (authError.code === "auth/email-already-in-use") {
        console.error("Error signing up: Email is already in use");
        throw new Error("Email is already in use");
      } else {
        console.error("Error signing up:", error);
        throw error;
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        skip,
        signUp,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export const AuthConsumer = AuthContext.Consumer;

export const useAuthContext = () => useContext(AuthContext);
