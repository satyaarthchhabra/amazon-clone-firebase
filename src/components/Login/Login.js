import React,{ useState } from 'react'
import './Login.css'
import { Link, useHistory } from 'react-router-dom'
import { auth,provider } from '../../firebase/firebaseConfig'

function Login() {

    const history = useHistory()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)

    const login = (e) => {
        e.preventDefault() //stops refresh
        auth
        .signInWithEmailAndPassword(email, password)
        .then((auth) => {
            // redirect to homepage
            history.push("/")
        })
        .catch(e => setError(e.message))
    }
    const loginWithGoogle =e=>{
        e.preventDefault()
        auth.signInWithPopup(provider).then((result) => {
            console.log(result);
            history.push("/profile")

})}
    const register = (e) => {
        e.preventDefault() //stops refresh
        auth
            .createUserWithEmailAndPassword(email, password)
            .then((auth) => {
                // create and redirect to homepage
                history.push("/profile")
            })
            .catch(e => setError(e.message))

    }

    return (
        <div className="login">
            <Link to="/">
                <img
                    className="login__logo"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
                    alt="" />
            </Link>

            <div className="login__container">
                <h1>Sign In</h1>
                <form>
                    <h5>Email</h5>
                    <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <h5>password</h5>
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <button onClick={login} className="login__signInButton">Sign In</button>
                    <button onClick={loginWithGoogle} className="login__signInButton">Sign In With Google</button>
                </form>
                {
                    error&& (
                        error
                    )
                }
                <p>
                    By continuing, you agree to Amazon's Conditions of Use and Privacy Notice.
                </p>

                <button onClick={register} className="login__registerButton">Create your amazon account</button>
            </div>
        </div>
    )
}


export default Login
