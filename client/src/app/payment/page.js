"use client";
import React, { useState } from "react";
import axios from "axios";

export default function Payment() {
  const [inputs, setInputs] = useState({
    amount: "",
    description: "",
  });

  function handleInputs(event) {
    setInputs({
      ...inputs,
      [event.target.name]: event.target.value,
    });
  }

  console.log(inputs);

  async function pay(event) {
    event.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) alert("Must have an account to buy tickets");
      console.log(typeof token);
      const headerConfig = {
        headers: {
          Authorization: `Bearer ${token}`,
          //Authorization: token
        },
      };

      const requestData = {
        monto: inputs.amount,
        descripcion: inputs.description,
      };
      console.log(requestData)
      const {data} = await axios.post('http://localhost:3001/protected/pagar', requestData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer "+ localStorage.getItem("token"),
        }
      })
      /* const { data } = await axios({
        method: "post",
        url: "http://localhost:3001/protected/pagar",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + token, // Cambiar "Bearer" por "Token"
        },
        requestData,
      }); */

      console.log(data);
      window.location.href = data.init_point;
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="">
      <h2 className="">Test de pago</h2>
      <form onSubmit={pay}>
        <label htmlFor="amount">Amount</label>
        <input
          onChange={handleInputs}
          type="text"
          name="amount"
          value={inputs.amount}
          placeholder="Add amount"
        ></input>

        <label htmlFor="description">Description</label>
        <input
          onChange={handleInputs}
          type="text"
          name="description"
          value={inputs.description}
        ></input>
        <button type="submit">Buy</button>
      </form>
    </div>
  );
}
