import Axios from "axios";
import React from "react";

export default function FriendsForm(first) {
  const addContact = () => {
    var aux = JSON.parse(localStorage.getItem("user"));
    Axios.post(`http://localhost:3000/add/${aux.id}`, {
      email: first.email,
    }).then((res) => localStorage.setItem("contact", JSON.stringify(res.data)));
  };
  return (
    <div>
      <ul class="mdc-list">
        <li class="mdc-list-item" tabindex="0">
          <span class="mdc-list-item__ripple">
            {first.first} {first.last}
          </span>
          <span class="mdc-list-item__text">Single-line item</span>
          <button class="mdc-button--raised" onClick={() => addContact()}>
            <span class="mdc-button__label">Add contact</span>
          </button>
        </li>
      </ul>
    </div>
  );
};

