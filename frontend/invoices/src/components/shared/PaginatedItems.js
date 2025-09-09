import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import DjangoClient from "utils/DjangoClient";
import "./PaginatedItems.css";

const PaginatedItems = ({ children, handlePageClick, pageCount, currentPage }) => {

  return (
    <div>
      {children}

      <ReactPaginate
        previousLabel={"← Previous"}
        nextLabel={"Next →"}
        breakLabel={"..."}
        pageCount={pageCount}
        forcePage={currentPage}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        activeClassName={"active"}
        disabledClassName={"disabled"}
        pageLinkClassName="page"
      />
    </div>
  );
};

export default PaginatedItems;