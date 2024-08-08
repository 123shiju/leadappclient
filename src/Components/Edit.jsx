import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Edit = () => {
  const [lead, setLead] = useState({
    name: "",
    email: "",
    number: "",
    productName: "",
  });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      axios
        .get(`https://leadppserver.onrender.com/api/editLeads/${id}`)
        .then((response) => setLead(response.data))
        .catch((error) => toast.error(`Error fetching lead: ${error.message}`));
    }
  }, [id]);

  const handleChange = (e) => {
    setLead({ ...lead, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = id
      ? `https://leadppserver.onrender.com/api/updateLeads/${id}`
      : "https://leadppserver.onrender.com/api/leads";
    const method = id ? "put" : "post";

    try {
      const response = await axios({ method, url, data: lead });

      if (response.status === 200 || response.status === 201) {
        toast.success(`${id ? "updated" : "created"} successfully!`, {
          onClose: () => navigate("/"),
        });
      } else {
        toast.error("Unexpected response status");
      }
    } catch (error) {
      toast.error(`Error saving lead: ${error.message}`);
    }
  };

  return (
    <>
      <div className="container-main">
        <ToastContainer />
        <h1>Lead Application</h1>
        <hr className="divider" />
        <div className="container">
          <div className="TopBtn">
            <a href="/">Back to Home </a>
          </div>

          <form onSubmit={handleSubmit} className="form-control">
            <div className="input-container">
              <div className="input-group">
                <input
                  name="name"
                  value={lead.name}
                  onChange={handleChange}
                  placeholder="Name"
                />
              </div>
              <div className="input-group">
                <input
                  name="email"
                  value={lead.email}
                  onChange={handleChange}
                  placeholder="Email"
                />
              </div>
            </div>
            <div className="input-container">
              <div className="input-group">
                <input
                  name="number"
                  value={lead.number}
                  onChange={handleChange}
                  placeholder="Number"
                />
              </div>
              <div className="input-group">
                <input
                  name="productName"
                  value={lead.productName}
                  onChange={handleChange}
                  placeholder="Product Name"
                />
              </div>
            </div>

            <button className="Btn" type="submit">
              Create
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Edit;
