import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";

export const NavBar = ({ token, setToken, isStaff, setIsStaff, setUserId }) => {
    const navigate = useNavigate()
    const navbar = useRef()
    const hamburger = useRef()

    const showNavbar = () => {
        hamburger.current.classList.toggle('is-active')
        navbar.current.classList.toggle('is-active')
    }

    return (
        <nav className="navbar is-success mb-3" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <a className="navbar-item" href="/"></a>
                <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample" onClick={showNavbar} ref={hamburger}>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>
    
            <div className="navbar-menu" ref={navbar}>
                <div className="navbar-start">
                    <div>
                        <Link to="/home" className="navbar-item">Home</Link>
                        <Link to='/user' className="navbar-item">User</Link>
                    </div>
                </div>
    
                <div className="navbar-end">
                    <div>
                        {token ? (
                            <button
                                className="button is-outlined"
                                onClick={() => {
                                    setToken("");
                                    navigate("/login");
                                }}
                            >
                                Logout
                            </button>
                        ) : (
                            <>
                                <Link to="/register" className="button is-link">
                                    Register
                                </Link>
                                <Link to="/login" className="button is-outlined">
                                    Login
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}