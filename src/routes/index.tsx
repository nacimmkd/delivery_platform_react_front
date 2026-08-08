import { createBrowserRouter } from "react-router-dom";
import { paths } from "./paths";
import App from "../App";
import LoginPage from "../pages/login/LoginPage";
import HomePage from "../pages/home/HomePage";
import SignupPage from "../pages/signup/SignupPage";
import ResetPasswordPage from "../pages/reset-password/ResetPasswordPage";

export const router = createBrowserRouter([
    {
        path: paths.home,
        element: <App />,
        children: [
            { index: true, element: <HomePage /> },
            { path: paths.login, element: <LoginPage /> },
            { path: paths.signup, element: <SignupPage /> },
            { path: paths.reset_password, element: <ResetPasswordPage/> },
            { path: paths.trips, element: <div>Trips</div> },
            { path: paths.profile, element: <div>Profile</div> }
        ]
    }
]);