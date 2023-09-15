import { useNavigate } from "react-router-dom"
import { useRef } from "react"
import { Link } from "react-router-dom"
import { registerUser } from "../../managers/authManager"

export const Register = ({ setToken, setUserId }) => {
    const firstName = useRef()
    const lastName = useRef()
    const email = useRef()
    const password = useRef()
    const height = useRef()
    const profile_picture = useRef()
    const verifyPassword = useRef()
    const passwordDialog = useRef()
    const navigate = useNavigate()

    const handleRegister = (e) => {
        e.preventDefault()
        console.log("handleRegister - Registration form submitted");

        if (password.current.value === verifyPassword.current.value) {
            console.log("Passwords match");
            const newUser = {
                first_name: firstName.current.value,
                last_name: lastName.current.value,
                email: email.current.value,
                password: password.current.value,
                height: height.current.value,
                profile_picture: profile_picture.current.value
            }

            registerUser(newUser)
                .then(res => {
                    if ("valid" in res && res.valid) {
                        setToken(res.token)
                        setUserId(res.user)
                    }
                    navigate('/login');
                });
        } else {
            console.log("Passwords do not match");
            passwordDialog.current.showModal()
        }
        navigate('/login')
    }
    return (
        <section className="columns is-centered">
            <form className="column is-two-thirds" onSubmit={handleRegister}>
                <h1 className="title">Magical Day</h1>
                <p className="subtitle">Create an account</p>
                <div className="field">
                    <label className="label">First Name</label>
                    <div className="control">
                        <input className="input" type="text" ref={firstName} />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Last Name</label>
                    <div className="control">
                        <input className="input" type="text" ref={lastName} />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Email</label>
                    <div className="control">
                        <input className="input" type="text" ref={email} />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Password</label>
                    <div className="field-body">
                        <div className="field">
                            <p className="control is-expanded">
                                <input className="input" type="password" placeholder="Password" ref={password} />
                            </p>
                        </div>

                        <div className="field">
                            <p className="control is-expanded">
                                <input className="input" type="password" placeholder="Verify Password" ref={verifyPassword} />
                            </p>
                        </div>
                    </div>
                </div>

                <div className="field">
                    <label className="label">Height</label>
                    <div className="control">
                        <input className="input" type="height" ref={height} />
                    </div>
                </div>

                <div className="field">
                    <label className="label">profile_picture</label>
                    <div className="control">
                        <input className="input" type="picture" ref={profile_picture} />
                    </div>
                </div>

                <div className="field is-grouped">
                    <div className="control">
                        <button className="button is-link" type="submit" >Submit</button>
                    </div>
                    <div className="control">
                        <Link to="/login" className="button is-link is-light">Cancel</Link>
                    </div>
                </div>

            </form>
        </section>
    )
}