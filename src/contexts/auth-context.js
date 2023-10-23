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
    if (initialized.current) {
      return;
    }

    initialized.current = true;

    let isAuthenticated = false;

    try {
      isAuthenticated = window.sessionStorage.getItem("authenticated") === "true";
    } catch (err) {
      console.error(err);
    }

    if (isAuthenticated) {
      // Here, you should set your user data
      // For example:
      // const user = {
      //   id: "your-user-id",
      //   avatar: "/assets/avatars/your-avatar.png",
      //   name: "Your Name",
      //   email: "your@email.com",
      // };
      // Dispatch the user data
      // dispatch({
      //   type: HANDLERS.INITIALIZE,
      //   payload: user,
      // });
    } else {
      dispatch({
        type: HANDLERS.INITIALIZE,
      });
    }
  };

  useEffect(() => {
    initialize();
  }, []);

  const skip = () => {
    try {
      window.sessionStorage.setItem("authenticated", "true");
    } catch (err) {
      console.error(err);
    }

    // Similar to the initialization, here, you should set your user data
    // and dispatch it
  };

  const signIn = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);
      console.log("signInWithEmailAndPassword");
      console.log(userDoc);
      if (userDoc.exists()) {
        const userData = userDoc.data();
        console.log("User data from Firestore:", userData);

        dispatch({
          type: HANDLERS.INITIALIZE,
          payload: userData,
        });
      }

      return user;
    } catch (error) {
      const errorMessage = error.message;
      console.error("Error logging in:", errorMessage);
      throw new Error(errorMessage);
    }
  };

  const signOut = () => {
    dispatch({
      type: HANDLERS.SIGN_OUT,
    });
  };

  // Implement signUp function, if needed
  const signUp = async (email, firstName, lastName, password, phonenumber, isEmail, isWhatsapp) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userData = {
        uid: user.uid,
        email: email,
        role: "user",
        firstName: firstName, // Use values from formik
        lastName: lastName, // Use values from formik
        password: password, // Use values from formik
        phonenumber: phonenumber, // Use values from formik
        isEmail: isEmail, // Use values from formik
        isWhatsapp: isWhatsapp, // Use values from formik
      };

      await setDoc(doc(db, "users", user.uid), userData);

      console.log("User registered with ID:", user.uid);

      return user;
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
