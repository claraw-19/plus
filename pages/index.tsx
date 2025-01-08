import users from "../constants/dummyData.json";
import UserCard from "@/components/UserCard";

export default function Plus() {
  console.log("users: ", users);
  return (
    <>
      <h1>PLUS-Lizenzen</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <UserCard user={user} />
          </li>
        ))}
      </ul>
    </>
  );
}
