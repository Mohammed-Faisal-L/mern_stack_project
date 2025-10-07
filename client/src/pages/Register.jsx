import { PLACEHOLDERS, TEXTS } from "../constants/text-constants";
import Header from "../common/Header";
import Button from "../common/Button";
import FormInput from "../common/FormInput";
import { useRegister } from "../hooks/useRegister";

const Register = () => {
  const { formik } = useRegister();

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8">
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white p-10 rounded-lg shadow-md w-full max-w-sm sm:max-w-md lg:max-w-lg"
      >
        <Header text={TEXTS.REGISTER} />

        <FormInput
          label={TEXTS.USERNAME}
          id="username"
          name="username"
          type="text"
          placeholder={PLACEHOLDERS.USERNAME}
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

        <FormInput
          label={TEXTS.PASSWORD}
          id="password"
          name="password"
          type="password"
          placeholder={PLACEHOLDERS.PASSWORD}
          formik={formik}
        />

        <Button
          role="register"
          type="submit"
          isLoading={formik.isSubmitting}
          text={TEXTS.REGISTER}
          loadingText={TEXTS.SUBMITTING}
          variant="primary"
          size="lg"
          fullWidth
        />
      </form>
    </div>
  );
};

export default Register;
