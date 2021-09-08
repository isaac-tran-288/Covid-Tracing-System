import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./App.css";

export default function CheckIn() {
  const [UniqueID, setUniqueID] = useState("");
  

  function validateForm() {
    return UniqueID.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <div className="Login">
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="UniqueID">
          <Form.Label>UniqueID</Form.Label>
          <Form.Control
            autoFocus
            type="UniqueID"
            value={UniqueID}
            onChange={(e) => setUniqueID(e.target.value)}
          />
        </Form.Group>
        
        <Button block size="lg" type="submit" disabled={!validateForm()}>
          CheckIn
        </Button>
      </Form>
    </div>
  );
}
