import React, {createContext, useState} from "react";

const SignContext = createContext({
  signIn: false,
  signUp: false,
  signOut: false,
  onSignIn: () => {},
  onSignUp: () => {},
  onSignOut: () => {},
  onNothing: () => {}
});

export default SignContext;

export const SignProvider = (props) => {
  const [signIn, setSignIn] = useState(false);
  const [signUp, setSignUp] = useState(false);
  const [signOut, setSignOut] = useState(false);

  const value = {
    signIn: signIn,
    signUp: signUp,
    signOut: signOut,
    onSignIn: () => {
      setSignIn(true);
      setSignUp(false);
      setSignOut(false);
    },
    onSignUp: () => {
      setSignIn(false);
      setSignUp(true);
      setSignOut(false);
    },
    onSignOut: () => {
      setSignIn(false);
      setSignUp(false);
      setSignOut(true);
    },
    onNothing: () => {
      setSignIn(false);
      setSignUp(false);
      setSignOut(false);
    }
  }

  return (
    <SignContext.Provider value={value}>
      {props.children}
    </SignContext.Provider>
  );
}
