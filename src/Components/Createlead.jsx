import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Createlead = ({ leadId, onSuccess }) => {
  const navigate = useNavigate();
  const [lead, setLead] = useState({
    name: "",
    email: "",
    number: "",
    productName: "",
  });

  const handleChange = (e) => {
    setLead({ ...lead, [e.target.name]: e.target.value });
  };

  console.log("leads", lead);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://leadppserver.onrender.com/api/Createleads",
        lead
      );
      if (response.status === 200) {
        toast.success("Created Successfully", {
          onClose: () => navigate("/"),
        });
      }
    } catch (error) {
      console.log(error.message);
      toast.error("creation failed. Please try again.");
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

export default Createlead;
