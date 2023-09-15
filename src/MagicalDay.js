import { useState } from "react"
import { ApplicationViews } from "./views/ApplicationViews"


export const MagicalDay = () => {
    const [token, setTokenState] = useState(localStorage.getItem('auth_token'))
    const [userId, setUserIdState] = useState(parseInt(localStorage.getItem('user')))

    const setToken = (newToken) => {
        localStorage.setItem('auth_token', newToken)
        setTokenState(newToken)
    }

    const setUserId = (id) => {
        setUserIdState(id)
        const newUser = userId
        localStorage.setItem("user", newUser)
    }

    return <>
        <ApplicationViews token={token} setToken={setToken} setUserId={setUserId} />
    </>
}
