export default function UserDetails({ user }) {
  return (
    <div>
      <p>
        Weitere Details zu {user.firstName} {user.lastName}
      </p>
    </div>
  );
}
