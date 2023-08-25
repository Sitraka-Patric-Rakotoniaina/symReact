import React, {useState} from "react";
import LoginAPI from "../services/LoginAPI";
import axios from "axios";

export const LoginPage = () => {
    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    });

    const [error, setError] = useState("")

    const handleChange = ({currentTarget}) => {
        const {value, name} = currentTarget;
        setCredentials({...credentials, [name]: value});
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
           await LoginAPI.login(credentials);
           setError("");
            console.log('ok');
        } catch (error) {
            setError("Le login ou le mot de passe est invalid");
        }
    }

    return (
        <>
            <h1>List</h1>
            <form onSubmit={handleSubmit} noValidate>
                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="username">Email</label>
                    <input type="email"
                           id="username"
                           name="username"
                           className={"form-control" + (error && " is-invalid")}
                           placeholder="Adresse email"
                           value={credentials.username}
                           onChange={handleChange}
                    />
                    {error && <p className="invalid-feedback">{error}</p>}
                </div>
                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="password">Password</label>
                    <input type="password"
                           id="password"
                           name="password"
                           className="form-control"
                           placeholder="Mot de passe"
                           value={credentials.password}
                           onChange={handleChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary btn-block mb-4">Se connecter</button>
            </form>
        </>
    )
}