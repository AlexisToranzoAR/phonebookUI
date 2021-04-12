import React, { useState, useEffect } from "react";
import { getPersons } from "../services/persons";
import { Persons } from "./Persons";
import { PersonForm } from "./PersonForm";
import { Search } from "./Search";
import { Login } from "./Login";

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  return <div className="message">{message}</div>;
};

const Error = ({ error }) => {
  if (error === null) {
    return null;
  }

  return <div className="error">{error}</div>;
};

const Phonebook = () => {
  const [persons, setPersons] = useState([]);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [term, setTerm] = useState("");
  const [user, setUser] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    getPersons().then((persons) => {
      setPersons(persons);
    });
  }, [newName]);

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={message} />
      {user ? (
        <>
          <Error error={error} />
          <Search persons={persons} term={term} setTerm={setTerm} />
          <h2>Add a new</h2>
          <PersonForm
            user={user}
            persons={persons}
            newName={newName}
            setNewName={setNewName}
            newNumber={newNumber}
            setNewNumber={setNewNumber}
            setMessage={setMessage}
          />
          <h2>Numbers</h2>
          <Persons
            persons={persons}
            setPersons={setPersons}
            setMessage={setMessage}
            setError={setError}
          />
        </>
      ) : (
        <Login
          username={username}
          password={password}
          setUser={setUser}
          setUsername={setUsername}
          setPassword={setPassword}
        />
      )}
    </div>
  );
};

export default Phonebook;
