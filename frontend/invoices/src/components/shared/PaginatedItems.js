import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import DjangoClient from "utils/DjangoClient";


const PaginatedItems = () => {
  const [items, setItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0); // zero-based for ReactPaginate
  const [loading, setLoading] = useState(false);

  const fetchItems = async (page = 1) => {
    setLoading(true);
      let client = new DjangoClient();
      const data = await client.get("my_view?page=" + page);
      setLoading(false);
      if (data.message) {
            console.error(data.message);
      } else {
            setItems(data);
      }
      setPageCount(5); // assuming 10 per page
  };

  useEffect(() => {
    fetchItems(currentPage + 1);
  }, [currentPage]);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected); // ReactPaginate is 0-based
  };

  return (
    <div>
      <h2>Paginated Items</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {items.map((item) => (
            <li>{item.fields.name}</li>
          ))}
        </ul>
      )}

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
      />
    </div>
  );
};

export default PaginatedItems;