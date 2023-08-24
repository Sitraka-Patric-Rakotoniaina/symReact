import React, {useEffect, useState} from "react";
import InvoiceAPI from "../services/InvoiceAPI";
import Pagination from "../components/Pagination";
import moment from "moment";

const InvoicePage = () => {
    const [invoices, setInvoices] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState('');

    const itemsPerPage = 10;

    const STATUS_CLASSES = {
        PAID: "success",
        SENT: 'primary',
        CANCELED: 'danger'
    }

    const STATUS_LABELS = {
        PAID: "Payée",
        SENT: "Envoyée",
        CANCELED: "Annulée"
    }
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

    const handleDelete = async (id) => {
        const originalInvoices = [...invoices];
        setInvoices(invoices.filter(invoice => invoice.id !== id));
        try {
            await InvoiceAPI.delete(id);
        } catch (error) {
            setInvoices(originalInvoices);
        }
    }

    const handleSearch = (event) => {
        let value = event.currentTarget.value;
        setSearch(value);
        setCurrentPage(1);
    }

    let filteredInvoices = invoices.filter(
        i =>
            i.customer.firstName.toLowerCase().includes(search.toLowerCase()) ||
            i.customer.lastName.toLowerCase().includes(search.toLowerCase()) ||
            i.amount.toString().startsWith(search.toLowerCase()) ||
            STATUS_LABELS[i.status].toLowerCase().includes(search.toLowerCase())
    )

    const paginatedInvoices = Pagination.getData(filteredInvoices, currentPage, itemsPerPage);

    return (
        <>
            <h3>Liste des factures</h3>
            <div className="form-group">
                <input type="text" className="form-control" placeholder="Rechercher" onChange={handleSearch}/>
            </div>
            <table className="table table-hover mt-2">
                <thead>
                <tr>
                    <th>Numéro</th>
                    <th>Client</th>
                    <th className="text-center">Date d'envoi</th>
                    <th className="text-center">Statut</th>
                    <th className="text-center">Montant</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {paginatedInvoices.map(invoice => <tr key={invoice.id}>
                    <td>{invoice.chrono}</td>
                    <td><a href="#">{invoice.customer.firstName + ' ' + invoice.customer.lastName}</a></td>
                    <td className="text-center">{moment(invoice.sentAt).local('fr').format('DD/MM/YYYY')}</td>
                    <td className="text-center">
                        <span
                            className={"badge bg-" + STATUS_CLASSES[invoice.status]}>{STATUS_LABELS[invoice.status]}</span>
                    </td>
                    <td className="text-center">{invoice.amount.toLocaleString()}€</td>
                    <td>
                        <button
                            onClick={() => handleDelete(invoice.id)}
                            className="btn btn-sm btn-danger">Supprimer
                        </button>
                    </td>
                </tr>)}
                </tbody>
            </table>
            {itemsPerPage < filteredInvoices.length &&
                <Pagination currentPage={currentPage} itemsPerPage={itemsPerPage} length={filteredInvoices.length}
                            onPageChanged={handleChangePage}/>
            }
        </>
    );
}
export default InvoicePage;