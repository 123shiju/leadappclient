import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faSearch } from "@fortawesome/free-solid-svg-icons";

const Leads = () => {
  const [leads, setLeads] = useState([]);
  const [sortOrder, setSortOrder] = useState("name-asc");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const response = await axios.get(
          `https://leadppserver.onrender.com/api/getLeads`
        );
        setLeads(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchLeads();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `https://leadppserver.onrender.com/api/deleteLeads/${id}`
      );
      if (response.status === 200) {
        setLeads(leads.filter((lead) => lead._id !== id));
        toast.success("deleted successfully!");
      }
    } catch (error) {
      console.log(error.message);
      toast.error("Deletion failed. Please try again.");
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const getSortedLeads = () => {
    const sortedLeads = [...leads];
    const [key, order] = sortOrder.split("-");
    sortedLeads.sort((a, b) => {
      if (a[key].toLowerCase() < b[key].toLowerCase())
        return order === "asc" ? -1 : 1;
      if (a[key].toLowerCase() > b[key].toLowerCase())
        return order === "asc" ? 1 : -1;
      return 0;
    });
    return sortedLeads;
  };

  const filteredLeads = getSortedLeads().filter((lead) =>
    Object.values(lead).some((val) =>
      String(val).toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div className="container-main">
      <ToastContainer />
      <h1>Lead Application</h1>
      <hr className="divider" />
      <div className="topSection">
        <div className="create">
          <a href="/create">Create New Lead</a>
        </div>
        <div className="sort">
          <select
            onChange={(e) => setSortOrder(e.target.value)}
            value={sortOrder}
          >
            <option value="name-asc">Sort by Name (A-Z)</option>
            <option value="name-desc">Sort by Name (Z-A)</option>
            <option value="productName-asc">Sort by Product Name (A-Z)</option>
            <option value="productName-desc">Sort by Product Name (Z-A)</option>
          </select>
        </div>

        <div className="search">
          <input
            type="text"
            placeholder="Search"
            onChange={handleSearch}
            value={searchQuery}
          />
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
        </div>
      </div>

      <div className="container">
        <table className="leads-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Number</th>
              <th>Product</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeads.map((lead) => (
              <tr key={lead._id}>
                <td>{lead.name}</td>
                <td>{lead.email}</td>
                <td>{lead.number}</td>
                <td>{lead.productName}</td>
                <td>
                  <Link to={`/edit/${lead._id}`}>
                    <FontAwesomeIcon icon={faEdit} className="icon edit-icon" />
                  </Link>
                  <button
                    onClick={() => handleDelete(lead._id)}
                    className="icon delete-icon"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leads;
