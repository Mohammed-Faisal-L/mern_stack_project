import { TEXTS } from "../constants/text-constants";
import Button from "./Button";

const UserCard = ({ user, onEdit, onDelete }) => (
  <div
    key={user._id}
    className="bg-white p-4 rounded-lg shadow-lg border border-gray-200"
  >
    <h2 className="text-xl font-semibold text-gray-800">{user.name}</h2>
    <p className="text-gray-600">
      {TEXTS.EMAIL}: {user.email}
    </p>
    <p className="text-gray-600">
      {TEXTS.AGE}: {user.age}
    </p>
    <div className="flex justify-between mt-4">
      <Button
        onClick={onEdit}
        text={TEXTS.EDIT}
        variant="success"
        size="sm"
        fullWidth={false}
        rounded="md"
      />
      <Button
        onClick={onDelete}
        text={TEXTS.DELETE}
        variant="danger"
        size="sm"
        fullWidth={false}
        rounded="md"
      />
    </div>
  </div>
);

export default UserCard;
