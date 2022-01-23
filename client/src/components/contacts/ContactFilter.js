import React from "react";
import { clearFilter, filterContacts, useContacts } from "../../context/contact/ContactState";

const ContactFilter = () => {
  const contactDispatch = useContacts()[1];

  const onChange = (e) => {
    if (e.target.value !== "") {
      filterContacts(contactDispatch, e.target.value);
    } else {
      clearFilter(contactDispatch);
    }
  };

  return (
    <form>
      <input type="text" placeholder="Filter contacts ..." onChange={onChange} />
    </form>
  );
};

ContactFilter.propTypes = {};

export default ContactFilter;
