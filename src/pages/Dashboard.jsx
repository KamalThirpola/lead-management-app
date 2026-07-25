import React, { useState } from "react";

function Dashboard() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState("");

  const [leads, setLeads] = useState([]);
  const [editId, setEditId] = useState(null);

  const addLead = () => {
    if (!name || !email || !phone || !status) {
      alert("Please fill all fields");
      return;
    }

    if (editId) {
      setLeads(
        leads.map((lead) =>
          lead.id === editId
            ? { ...lead, name, email, phone, status }
            : lead
        )
      );
      setEditId(null);
    } else {
      const newLead = {
        id: Date.now(),
        name,
        email,
        phone,
        status,
      };

      setLeads([...leads, newLead]);
    }

    setName("");
    setEmail("");
    setPhone("");
    setStatus("");
  };

  const editLead = (lead) => {
    setName(lead.name);
    setEmail(lead.email);
    setPhone(lead.phone);
    setStatus(lead.status);
    setEditId(lead.id);
  };

  const deleteLead = (id) => {
    setLeads(leads.filter((lead) => lead.id !== id));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Lead Management Dashboard</h1>

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ marginLeft: "10px" }}
      />

      <input
        type="text"
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        style={{ marginLeft: "10px" }}
      />

      <input
        type="text"
        placeholder="Status"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        style={{ marginLeft: "10px" }}
      />

      <button
        onClick={addLead}
        style={{ marginLeft: "10px" }}
      >
        {editId ? "Update Lead" : "Add Lead"}
      </button>

      <table
        border="1"
        cellPadding="10"
        style={{
          width: "100%",
          marginTop: "20px",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {leads.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                No Leads Found
              </td>
            </tr>
          ) : (
            leads.map((lead) => (
              <tr key={lead.id}>
                <td>{lead.name}</td>
                <td>{lead.email}</td>
                <td>{lead.phone}</td>
                <td>{lead.status}</td>
                <td>
                  <button onClick={() => editLead(lead)}>
                    Edit
                  </button>

                  <button
                    onClick={() => deleteLead(lead.id)}
                    style={{ marginLeft: "10px" }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;