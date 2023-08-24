import React from "react";
import ReactDOM from "react-dom";
import '../css/app.css';
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import {HashRouter, Routes, Route} from "react-router-dom";
import CustomersPage from "./pages/CustomersPage";
import InvoicePage from "./pages/InvoicePage";

const App = () => {
    return (
    <HashRouter>
        <Navbar />
        <main className="container mt-3">
            <Routes>
                <Route path="/customers" Component={CustomersPage}></Route>
                <Route path="/invoices" Component={InvoicePage}></Route>
                <Route path="/" Component={HomePage}></Route>
            </Routes>
        </main>
    </HashRouter>
    )
};
 const rootElement = document.querySelector('#app');
 ReactDOM.render(<App/>, rootElement);