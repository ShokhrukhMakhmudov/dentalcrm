import { createContext, useReducer, ReactNode, useContext } from "react";

// Типы для состояния и действий
interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
}

interface AuthContextProps {
  state: AuthState;
  login: (userData: User) => void;
  logOut: () => void;
}

const initialState: AuthState = localStorage.getItem("user")
  ? { user: JSON.parse(localStorage.getItem("user") as string) }
  : { user: null };

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

function reducer(
  state: AuthState,
  action: { type: string; payload?: User }
): AuthState {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("user", JSON.stringify(action.payload));
      return {
        ...state,
        user: action.payload || null,
      };
    case "LOGOUT":
      localStorage.removeItem("user");
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
}

function AuthContextProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const login = (userData: User) =>
    dispatch({ type: "LOGIN", payload: userData });
  const logOut = () => dispatch({ type: "LOGOUT" });

  return (
    <AuthContext.Provider value={{ state, login, logOut }}>
      {children}
    </AuthContext.Provider>
  );
}

// Кастомный хук для использования контекста
function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      "useAuthContext must be used within an AuthContextProvider"
    );
  }
  return context;
}

export { AuthContextProvider, useAuthContext };
