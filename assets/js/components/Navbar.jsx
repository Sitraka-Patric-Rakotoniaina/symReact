import React from "react";
import LoginAPI from "../services/LoginAPI";
import {NavLink} from "react-router-dom";

const Navbar = () => {
    const handleLogout = () => {
        LoginAPI.logout();
    }

    return (
        <nav className="navbar navbar-expand-lg bg-light" data-bs-theme="light">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="/">Gestion Facture</NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarColor03" aria-controls="navbarColor03" aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarColor03">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/customers">Clients</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/invoices">Factures</NavLink>
                        </li>
                    </ul>
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <button className="btn btn-outline-primary my-2 my-sm-0 me-1" type="submit">Inscription</button>
                        </li>
                        <li className="nav-item me-1">
                            <NavLink className="btn btn-outline-success my-2 my-sm-0" type="submit" to="/login">Connexion</NavLink>
                        </li>
                        <li className="nav-item">
                            <button className="btn btn-outline-danger my-2 my-sm-0" type="submit" onClick={handleLogout}>Déconnexion</button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}
export default Navbar;