import users from "../constants/dummyData.json";

export default function Plus() {
  console.log("users: ", users);
  return (
    <>
      <h1>PLUS-Lizenzen</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.firstName} {user.lastName}
          </li>
        ))}
      </ul>
    </>
  );
}
