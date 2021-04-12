import { getPersons, deletePerson } from "../services/persons";

export const Persons = ({ persons, setPersons, setMessage, setError }) => {
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
        .catch((e) => {
          setError(e.message);
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
