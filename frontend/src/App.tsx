import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import "./App.css";
import store from "./redux/store";
import LoginPage from "./pages/LoginPage";
import Home from "./pages/Home";
import { decodeTokenFromCookie } from "./utils";
import { redirect } from "react-router-dom";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    loader:()=>{
      if (!decodeTokenFromCookie("jwtToken")) {
        return redirect("/login")
      }
      return null;
    }
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <LoginPage />,
  }
]);
function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
