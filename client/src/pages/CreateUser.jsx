import Header from "../common/Header";
import Button from "../common/Button";
import FormInput from "../common/FormInput";
import { TEXTS, PLACEHOLDERS, ROLES } from "../constants/text-constants";
import { useCreateUser } from "../hooks/useCreateUser";

const CreateUser = () => {
  const { formik } = useCreateUser();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-lg md:max-w-md lg:max-w-lg xl:max-w-xl bg-white p-6 sm:p-8 rounded-lg shadow-md">
        <Header text={TEXTS.CREATE_USER} />

        <form onSubmit={formik.handleSubmit} className="space-y-5">
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

          <div>
            <Button
              role={ROLES.CREATE_USER_BUTTON}
              type="submit"
              isLoading={formik.isSubmitting}
              text={TEXTS.CREATE_USER}
              loadingText={TEXTS.SUBMITTING}
              variant="primary"
              size="lg"
              fullWidth
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUser;
