import React, { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "../components/Pagination";
import {Link} from "react-router-dom";
const CustomersPage = (props) => {
    const [customers, setCustomers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState('');

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

    const itemsPerPage = 10;
    const handleChangePage = (page) => {
        setCurrentPage(page);
    }

    const handleSearch = (event) => {
        const value = event.currentTarget.value;
        setSearch(value);
    }

    const filteredCustomers = customers.filter(
        c => c.firstName.toLowerCase().includes(search.toLowerCase())
        || c.lastName.toLowerCase().includes(search.toLowerCase())
    );

    console.log(filteredCustomers);

    const paginatedCustomers = Pagination.getData(filteredCustomers, currentPage, itemsPerPage);

    return (
        <>
            <h3>Liste des clients</h3>
            <div className="form-group">
                <input type="text" onChange={handleSearch} value={search} className="form-control" placeholder="Rechercher..."/>
            </div>
            <table className="table table-hover mt-2">
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
            <Pagination currentPage={currentPage} itemsPerPage={itemsPerPage} length={filteredCustomers.length} onPageChanged={handleChangePage}/>
        </>
    )
}

export default CustomersPage;