import { postPerson, putPerson } from "../services/persons";

export const PersonForm = ({
  user,
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
        postPerson(personToAdd, user.token).then(() => {
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
