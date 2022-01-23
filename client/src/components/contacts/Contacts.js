import React, { useEffect } from "react";
import ContactItem from "./ContactItem";
import { motion } from "framer-motion";
import Spinner from "../layout/Spinner";
import { getContacts, useContacts } from "../../context/contact/ContactState";

const Contacts = () => {
  const [contactState, contactDispatch] = useContacts();

  const { contacts, filtered } = contactState;

  useEffect(() => {
    getContacts(contactDispatch);
  }, [contactDispatch]);

  if (contacts !== null && contacts.length === 0) {
    return <h4>Please add a contact</h4>;
  }

  return (
    <>
      {contacts !== null ? (
        filtered !== null ? (
          filtered.map((contact) => (
            <motion.div
              key={contact._id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                delay: 0.2,
              }}
            >
              <ContactItem contact={contact} />
            </motion.div>
          ))
        ) : (
          contacts.map((contact) => (
            <motion.div
              key={contact._id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                delay: 0.2,
              }}
            >
              <ContactItem contact={contact} />
            </motion.div>
          ))
        )
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default Contacts;
