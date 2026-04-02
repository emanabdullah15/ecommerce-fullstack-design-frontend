import React from "react";
import "../styles/Pagination.css";

const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {
  const pages = [];
  for(let i=1;i<=totalPages;i++) pages.push(i);

  return (
    <div className="pagination">
      <button disabled={currentPage===1} onClick={()=>setCurrentPage(currentPage-1)}>Prev</button>
      {pages.map(p => (
        <button key={p} className={currentPage===p ? "active" : ""} onClick={()=>setCurrentPage(p)}>{p}</button>
      ))}
      <button disabled={currentPage===totalPages} onClick={()=>setCurrentPage(currentPage+1)}>Next</button>
    </div>
  );
};

export default Pagination;