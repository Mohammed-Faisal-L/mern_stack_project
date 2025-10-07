import { PLACEHOLDERS, TEXTS } from "../constants/text-constants";
import Header from "../common/Header";
import Button from "../common/Button";
import FormInput from "../common/FormInput";
import { useUpdateUser } from "../hooks/useUpdateUser";

const UpdateUser = () => {
  const { formik } = useUpdateUser();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 sm:px-6 lg:px-8">
      <form
        onSubmit={formik.handleSubmit}
        className="w-full max-w-sm sm:max-w-md lg:max-w-lg bg-white p-10 rounded-lg shadow-md"
      >
        <Header text={TEXTS.UPDATE_USER} />

        <FormInput
          label={TEXTS.NAME}
          id="name"
          name="name"
          type="text"
          placeholder={PLACEHOLDERS.NAME}
          formik={formik}
        />

        <FormInput
          label={TEXTS.EMAIL}
          id="email"
          name="email"
          type="email"
          placeholder={PLACEHOLDERS.EMAIL}
          formik={formik}
        />

        <FormInput
          label={TEXTS.AGE}
          id="age"
          name="age"
          type="number"
          placeholder={PLACEHOLDERS.AGE}
          formik={formik}
        />

        <Button
          role="update"
          type="submit"
          isLoading={formik.isSubmitting}
          text={TEXTS.UPDATE}
          loadingText={TEXTS.UPDATTING}
          variant="primary"
          size="lg"
          fullWidth
        />
      </form>
    </div>
  );
};

export default UpdateUser;
