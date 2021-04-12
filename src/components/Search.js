function searchWithTerm(persons, term) {
  return persons.filter(
    (person) =>
      (person.name.toLowerCase().indexOf(term) > -1 ||
        person.number.indexOf(term) > -1) &&
      term !== ""
  );
}

export const Search = ({ persons, term, setTerm }) => {
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
