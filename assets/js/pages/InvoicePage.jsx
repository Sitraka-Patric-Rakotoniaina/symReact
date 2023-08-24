import React, {useEffect, useState} from "react";
import InvoiceAPI from "../services/InvoiceAPI";
import Pagination from "../components/Pagination";
import moment from "moment";

const InvoicePage = () => {
    const [invoices, setInvoices] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const handleChangePage = (page) => setCurrentPage(page);
    const fetchInvoice = async () => {
        try {
            let data = await InvoiceAPI.findAll();
            setInvoices(data);
        } catch (error) {
            console.error(error.response);
        }
    }

    useEffect(() => {
        fetchInvoice();
    }, [])

    const paginatedInvoices = Pagination.getData(invoices, currentPage, itemsPerPage);

    const handleDelete = async (id)=> {
        const originalInvoices = [...invoices];
        setInvoices(invoices.filter(invoice => invoice.id !== id));
        try {
            await InvoiceAPI.delete(id);
        } catch (error) {
            setInvoices(originalInvoices);
        }
    }

    return (
        <>
            <h3>Liste des factures</h3>
            <table className="table table-hover mt-2">
                <thead>
                <tr>
                    <th>Id.</th>
                    <th>Montant</th>
                    <th>Date</th>
                    <th>Client</th>
                    <th className='text-center'>Statut</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {paginatedInvoices.map(invoice => <tr key={invoice.id}>
                    <td>{invoice.id}</td>
                    <td><a href="#">{invoice.amount.toLocaleString()}€</a></td>
                    <td>{moment(invoice.sentAt).local('fr').format('DD/MM/YYYY')}</td>
                    <td>{invoice.customer.firstName + ' ' + invoice.customer.lastName}</td>
                    <td className='text-center'>{invoice.status}</td>
                    <td>
                        <button
                            onClick={() => handleDelete(invoice.id)}
                            className="btn btn-sm btn-danger">Supprimer
                        </button>
                    </td>
                </tr>)}
                </tbody>
            </table>
            {/*{itemsPerPage < filteredCustomers.length &&*/}
            <Pagination currentPage={currentPage} itemsPerPage={itemsPerPage} length={invoices.length}
                            onPageChanged={handleChangePage}/>
            {/*}*/}
        </>
    );
}
export default InvoicePage;