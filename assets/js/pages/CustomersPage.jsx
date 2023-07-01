import React from "react";

const CustomersPage = (props) => {
    return (
        <>
            <h1>Liste des clients</h1>
            <table className="table table-hover">
                <thead>
                <tr>
                    <th>Id.</th>
                    <th>Client</th>
                    <th>Email</th>
                    <th>Entreprise</th>
                    <th className="text-center">Factures</th>
                    <th className="text-center">Montant Total</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>18</td>
                    <td><a href="#">Sitraka rak</a></td>
                    <td>sit@rak.com</td>
                    <td>Sitraka Sa</td>
                    <td className="text-center">
                        <span className="text-info">4</span>
                    </td>
                    <td className="text-center">2 4000,00€</td>
                    <td>
                        <button className="btn btn-sm btn-danger">Supprimer</button>
                    </td>
                </tr>
                </tbody>
            </table>
        </>
    )
}

export default CustomersPage;