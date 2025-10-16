import { ROLES, TEXTS } from "../constants/text-constants";
import { ROUTES } from "../constants/route-constants";
import Button from "../common/Button";
import { useUsers } from "../hooks/useUsers";
import UserCard from "../common/UserCard";

const Users = () => {
  const { users, deleteUser, handleLogout, navigate, loading } = useUsers();

  return (
    <div
      data-testid="users-container"
      className="min-h-screen bg-gray-100 flex flex-col items-center py-8 px-4 sm:px-6 lg:px-8"
    >
      <div className="w-full max-w-7xl bg-white p-6 rounded-lg shadow-md h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <Button
            role={ROLES.ADD_USER_BUTTON}
            onClick={() => navigate(ROUTES.CREATE)}
            text={TEXTS.ADD}
            variant="primary"
            size="sm"
            fullWidth={false}
          />
          <Button
            role={ROLES.LOGOUT_BUTTON}
            onClick={handleLogout}
            text={TEXTS.LOGOUT}
            variant="danger"
            size="sm"
            fullWidth={false}
          />{" "}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {(() => {
            if (loading) {
              return (
                <p className="text-gray-500 text-lg text-center col-span-full mt-6">
                  {TEXTS.LOADING}
                </p>
              );
            }
            if (users.length === 0) {
              return (
                <p className="text-gray-500 text-lg text-center col-span-full mt-6">
                  {TEXTS.ADD_USER}
                </p>
              );
            }
            return users.map((user) => (
              <UserCard
                key={user._id}
                user={user}
                onEdit={() => navigate(ROUTES.UPDATES(user._id))}
                onDelete={() => deleteUser(user._id)}
              />
            ));
          })()}
        </div>
      </div>
    </div>
  );
};

export default Users;
