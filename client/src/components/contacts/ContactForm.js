import React, { useEffect, useState } from "react";
import { addContact, clearCurrent, updateContact, useContacts } from "../../context/contact/ContactState";

const initialContact = {
  name: "",
  email: "",
  phone: "",
  type: "personal",
};

const ContactForm = () => {
  const [contactState, contactDispatch] = useContacts();

  const { current } = contactState;

  const [contact, setContact] = useState(initialContact);

  useEffect(() => {
    if (current !== null) {
      setContact(current);
    } else {
      setContact(initialContact);
    }
  }, [current]);

  const { name, email, phone, type } = contact;

  const onChange = (e) => setContact({ ...contact, [e.target.name]: e.target.value });

  const clearAll = () => {
    clearCurrent(contactDispatch);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (current === null) {
      addContact(contactDispatch, contact).then(() => setContact(initialContact));
    } else {
      updateContact(contactDispatch, contact);
    }
    clearAll();
  };
  return (
    <form onSubmit={onSubmit}>
      <h2 className="text-primary">{current ? "Edit contact" : "Add Contact"}</h2>
      <input type="text" placeholder="name" name="name" value={name} onChange={onChange} />
      <input type="email" placeholder="email" name="email" value={email} onChange={onChange} />
      <input type="text" placeholder="phone" name="phone" value={phone} onChange={onChange} />
      <h5>Contact type</h5>
      <input
        type="radio"
        name="type"
        value="personal"
        checked={type === "personal"}
        onChange={onChange}
      /> Personal{" "}
      <input type="radio" name="type" value="professional" checked={type === "professional"} onChange={onChange} />{" "}
      Professional
      <div>
        <input type="submit" value={current ? "Update contact" : "Add Contact"} className="btn btn-primary btn-block" />
      </div>
      {current && (
        <div>
          <button className="btn btn-light btn-block" onClick={clearAll}>
            Clear
          </button>
        </div>
      )}
    </form>
  );
};

ContactForm.propTypes = {};

export default ContactForm;
