export default function EmployeeDetails({
  firstName,
  lastName,
  email,
  age,
  position,
  salary,
}) {
  return (
    <>
      <h2>
        {firstName} {lastName}
      </h2>
      <p>{email}</p>
      <p>{age}</p>
      <p>{position}</p>
      <p>{salary}</p>
    </>
  );
}
