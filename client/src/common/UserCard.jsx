import { TEST_IDS, TEXTS } from "../constants/text-constants";
import Button from "./Button";

const UserCard = ({ user, onEdit, onDelete }) => (
  <div
    key={user._id}
    className="bg-white p-4 rounded-lg shadow-lg border border-gray-200"
    data-testid={`user-card-${user._id}`}
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
        data-testid={TEST_IDS.EDIT_BUTTON(user._id)}
        onClick={onEdit}
        text={TEXTS.EDIT}
        variant="success"
        size="sm"
        fullWidth={false}
        rounded="md"
      />
      <Button
        data-testid={TEST_IDS.DELETE_BUTTON(user._id)}
        onClick={onDelete}
        text={TEXTS.DELETE}
        loadingText={TEXTS.DELETING}
        variant="danger"
        size="sm"
        fullWidth={false}
        rounded="md"
      />
    </div>
  </div>
);

export default UserCard;
