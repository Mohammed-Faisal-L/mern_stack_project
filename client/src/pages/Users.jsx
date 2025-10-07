import { TEXTS } from "../constants/text-constants";
import { ROUTES } from "../constants/route-constants";
import Button from "../common/Button";
import { useUsers } from "../hooks/useUsers";
import UserCard from "../common/UserCard";

const Users = () => {
  const { users, deleteUser, handleLogout, navigate } = useUsers();

  return (
    <div
      role="users-container"
      className="min-h-screen bg-gray-100 flex flex-col items-center py-8 px-4 sm:px-6 lg:px-8"
    >
      <div className="w-full max-w-7xl bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <Button
            onClick={() => navigate(ROUTES.CREATE)}
            text={TEXTS.ADD}
            variant="primary"
            size="sm"
            fullWidth={false}
          />
          <Button
            onClick={handleLogout}
            text={TEXTS.LOGOUT}
            variant="danger"
            size="sm"
            fullWidth={false}
          />{" "}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {users.map((user) => (
            <UserCard
              key={user._id}
              user={user}
              onEdit={() => navigate(ROUTES.UPDATES(user._id))}
              onDelete={() => deleteUser(user._id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Users;
