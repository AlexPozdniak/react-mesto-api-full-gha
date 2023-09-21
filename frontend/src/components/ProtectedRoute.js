import {Navigate} from "react-router-dom"

export function ProtectedRoute ({isLoggedIn, element: Component, ...props}) {
    return (
        isLoggedIn ? <Component {...props} /> : <Navigate to="/signin" replace/>
    )
}