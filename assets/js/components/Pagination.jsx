import React, {useState} from "react";

// <Pagination currentPage={currentPage} itemsPerPage={itemsPerPage} length={customers.length} onPageChanged={handleChangePage}/>
const Pagination = ({currentPage, itemsPerPage, length, onPageChanged}) => {
    const pagesCount = Math.ceil(length / itemsPerPage);

    const pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    const arrangeDisplay = (pages) => {
        if (pages.length <= 10) {
            return pages.map(page =>
                <li key={page} className={"page-item" + (currentPage === page && " active")}>
                    <button className="page-link" onClick={() => onPageChanged(page)} >{page}</button>
                </li>
            )
        } else {
            let maxPagesDisplay = [];
            if (currentPage > 10) {
                let startPage = currentPage - 9;
                maxPagesDisplay = Array(currentPage - startPage + 1).fill().map(() => startPage++);
            } else {
                maxPagesDisplay = Array.of(1,2,3,4,5,6,7,8,9,10);
            }

            let elements = [];
            if (currentPage > 10) {
                elements.unshift(
                    <li key={length - 1} className={"page-item"}>
                        <button className="page-link" >...</button>
                    </li>);
            }

            elements = maxPagesDisplay.map(page =>
                <li key={page} className={"page-item" + (currentPage === page && " active")}>
                    <button className="page-link" onClick={() => onPageChanged(page)} >{page}</button>
                </li>
            )

            if (currentPage !== pagesCount) {
                elements.splice(10, 0,
                    <li key={length + 1} className={"page-item"}>
                        <button className="page-link" >...</button>
                    </li>);
            }
            return elements;
        }
    }

    return (
        <div>
            <ul className="pagination pagination-sm">
                <li className={"page-item" + (currentPage === 1 && " disabled")}>
                    <button className="page-link" onClick={() => onPageChanged(currentPage - 1)}>&laquo;</button>
                </li>
                {arrangeDisplay(pages)}
                <li className={"page-item" + (currentPage === pagesCount && " disabled")}>
                    <button className="page-link" onClick={() => onPageChanged(currentPage + 1)}>&raquo;</button>
                </li>
            </ul>
        </div>
    )
}

Pagination.getData = (items, currentPage, itemsPerPage) => {
    const start = currentPage * itemsPerPage - itemsPerPage;
    return items.slice(start, start + itemsPerPage);
}

export default Pagination;