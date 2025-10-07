import { PLACEHOLDERS, TEXTS } from "../constants/text-constants";
import { ROUTES } from "../constants/route-constants";
import Header from "../common/Header";
import Button from "../common/Button";
import FormInput from "../common/FormInput";
import { useLogin } from "../hooks/useLogin";

const Login = () => {
  const { formik, navigate } = useLogin();

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-10 rounded-lg shadow-md w-full max-w-sm sm:max-w-md lg:max-w-lg">
        <Header text={TEXTS.LOGIN} />

        <form onSubmit={formik.handleSubmit} className="space-y-5">
          <FormInput
            label={TEXTS.EMAIL}
            id="email"
            name="email"
            type="email"
            placeholder={PLACEHOLDERS.EMAIL}
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
            role="login"
            type="submit"
            isLoading={formik.isSubmitting}
            text={TEXTS.LOGIN}
            loadingText={TEXTS.LOGGING}
            variant="primary"
            size="lg"
            fullWidth
          />

          <Button
            role="login"
            type="button"
            onClick={() => navigate(ROUTES.REGISTER)}
            text={TEXTS.NO_ACCOUNT}
            variant="secondary"
            size="lg"
          />
        </form>
      </div>
    </div>
  );
};

export default Login;
