import React, { useEffect, useState } from "react";
import axios from "axios";
const CustomersPage = (props) => {
    const [customers, setCustomers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/customers")
            .then(response => response.data['hydra:member'])
            .then(data => setCustomers(data))
            .catch(error => console.log(error.response))
    }, [])

    const handleDelete = (customerId) => {
        const originalCustomers = [...customers];
        setCustomers(customers.filter(customer => customer.id !== customerId))
        axios.delete("http://127.0.0.1:8000/api/customers/" + customerId)
            .then(response => console.log("ok"))
            .catch( error => {
                    setCustomers(originalCustomers);
            })
    }

    const itemsPerPage = 5;
    const pagesCount = Math.ceil(customers.length / itemsPerPage);
    const pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    const start = currentPage * itemsPerPage - itemsPerPage;
    const paginatedCustomers = customers.slice(start, start + itemsPerPage);

    const handleChangePage = (page) => {
        setCurrentPage(page);
    }

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
                {paginatedCustomers.map(customer => <tr key={customer.id}>
                    <td>{customer.id}</td>
                    <td><a href="#">{customer.firstName + ' ' + customer.lastName}</a></td>
                    <td>{customer.email}</td>
                    <td>{customer.company}</td>
                    <td className="text-center">
                        <span className="text-info">{customer.invoices.length}</span>
                    </td>
                    <td className="text-center">{customer.totalAmount.toLocaleString()}€</td>
                    <td>
                        <button
                            onClick={() => handleDelete(customer.id)}
                            className="btn btn-sm btn-danger">Supprimer</button>
                    </td>
                </tr>)}
                </tbody>
            </table>
            <div>
                <ul className="pagination pagination-sm">
                    <li className={"page-item" + (currentPage === 1 && " disabled")}>
                        <button className="page-link" onClick={() => handleChangePage(currentPage - 1)}>&laquo;</button>
                    </li>
                    {pages.map(page =>
                        <li key={page} className={"page-item" + (currentPage === page && " active")}>
                            <button className="page-link" onClick={() => handleChangePage(page)} >{page}</button>
                        </li>
                    )}
                    <li className={"page-item" + (currentPage === pagesCount && " disabled")}>
                        <button className="page-link" onClick={() => handleChangePage(currentPage + 1)}>&raquo;</button>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default CustomersPage;