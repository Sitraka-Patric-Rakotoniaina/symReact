import React, {useEffect, useState} from "react";
import Pagination from "../components/Pagination";
import CustomersAPI from "../services/CustomersAPI";

const CustomersPage = (props) => {
    const [customers, setCustomers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState('');

    const fetchCustomers = async () => {
        try {
            let data = await CustomersAPI.findAll();
            setCustomers(data);
        } catch (error) {
            console.log(error.response);
        }
    }

    useEffect(() => {
        fetchCustomers();
    }, [])

    const handleDelete = async (customerId) => {
        const originalCustomers = [...customers];
        setCustomers(customers.filter(customer => customer.id !== customerId))
        try{
            await CustomersAPI.delete(customerId);
        }catch (error){
            setCustomers(originalCustomers);
            console.log(error)
        }
    }

    const itemsPerPage = 10;
    const handleChangePage = (page) => setCurrentPage(page);

    const handleSearch = ({currentTarget}) => {
        setSearch(currentTarget.value);
        setCurrentPage(1);
    }

    const filteredCustomers = customers.filter(
        c =>
            c.firstName.toLowerCase().includes(search.toLowerCase()) ||
            c.lastName.toLowerCase().includes(search.toLowerCase()) ||
            c.email.toLowerCase().includes(search.toLowerCase()) ||
            c.company.toLowerCase().includes(search.toLowerCase())
    );

    const paginatedCustomers = Pagination.getData(filteredCustomers, currentPage, itemsPerPage);

    return (
        <>
            <h3>Liste des clients</h3>
            <div className="form-group">
                <input type="text" onChange={handleSearch} value={search} className="form-control"
                       placeholder="Rechercher..."/>
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
                            className="btn btn-sm btn-danger">Supprimer
                        </button>
                    </td>
                </tr>)}
                </tbody>
            </table>
            {itemsPerPage < filteredCustomers.length &&
                <Pagination currentPage={currentPage} itemsPerPage={itemsPerPage} length={filteredCustomers.length}
                            onPageChanged={handleChangePage}/>
            }
        </>
    )
}

export default CustomersPage;