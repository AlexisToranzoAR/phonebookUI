import React, { useState, useEffect } from "react";
import { getPersons, postPerson, deletePerson, putPerson } from "./PersonsAPI";

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

const Persons = ({ persons, setPersons, setMessage, setError }) => {
  const handleClick = (e) => {
    const personId = e.target.parentNode.dataset.id;
    if (window.confirm("Do your really want to delete this contact?")) {
      deletePerson(personId)
        .then(() => {
          setMessage(`The contact is deleted`);
          setTimeout(() => {
            setMessage(null);
          }, 5000);
          getPersons().then((persons) => setPersons(persons));
        })
        .catch(() => {
          setError(`The contact has already been removed from the server`);
          setTimeout(() => {
            setMessage(null);
          }, 5000);
          getPersons().then((persons) => setPersons(persons));
        });
    }
  };

  return (
    <div>
      {persons.map((person) => (
        <p key={person.id} data-id={person.id}>
          {person.name} / {person.number}{" "}
          <button onClick={handleClick}>Delete</button>
        </p>
      ))}
    </div>
  );
};

function searchWithTerm(persons, term) {
  return persons.filter(
    (person) =>
      (person.name.toLowerCase().indexOf(term) > -1 ||
        person.number.indexOf(term) > -1) &&
      term !== ""
  );
}

const Search = ({ persons, term, setTerm }) => {
  const handleChangue = (e) => {
    setTerm(e.target.value);
  };
  return (
    <>
      <label htmlFor="term">Search with name</label>
      <input id="term" onChange={handleChangue} />
      {searchWithTerm(persons, term).map((person) => (
        <p key={person.id}>
          {person.name} / {person.number}
        </p>
      ))}
    </>
  );
};

const PersonForm = ({
  persons,
  newName,
  setNewName,
  newNumber,
  setNewNumber,
  setMessage,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (newName !== "" && newNumber !== "") {
      const personToAdd = {
        name: newName,
        number: newNumber,
      };
      const existPerson = persons.find(
        (person) => person.name.toLowerCase() === personToAdd.name.toLowerCase()
      );

      if (existPerson) {
        if (
          window.confirm(
            `${personToAdd.name} is already added to phonebook, replace the old number with a new one?`
          )
        ) {
          putPerson(existPerson.id, personToAdd).then(() => {
            setNewName("");
            setNewNumber("");
            setMessage(`The contact ${personToAdd.name} is updated`);
            setTimeout(() => {
              setMessage(null);
            }, 5000);
          });
        } else {
          setNewName("");
          setNewNumber("");
        }
      } else {
        postPerson(personToAdd).then(() => {
          setNewName("");
          setNewNumber("");
          setMessage(`The contact ${personToAdd.name} is created`);
          setTimeout(() => {
            setMessage(null);
          }, 5000);
        });
      }
    }
  };

  const handleNameChangue = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberChangue = (e) => {
    setNewNumber(e.target.value);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input onChange={handleNameChangue} value={newName} />
        </div>
        <div>
          number: <input onChange={handleNumberChangue} value={newNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  );
};

const Phonebook = () => {
  const [persons, setPersons] = useState([]);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [term, setTerm] = useState("");

  useEffect(() => {
    getPersons().then((persons) => {
      setPersons(persons);
    });
  }, [newName]);

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={message} />
      <Error error={error} />
      <Search persons={persons} term={term} setTerm={setTerm} />
      <h2>Add a new</h2>
      <PersonForm
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
    </div>
  );
};

export default Phonebook;
