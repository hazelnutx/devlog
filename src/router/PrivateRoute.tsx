import { Route, Redirect } from "react-router-dom";
import { AuthStateHook, useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";

export default function PrivateRoute({ children, ...rest }: any) {
  const [user, loading, error]: AuthStateHook = useAuthState(auth);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        user?.email ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/auth",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
