import useClientForm from "@/hooks/useClientForm";

export const RegisterForm = () => {
  const registerCredentials = useClientForm({
    first_name: "",
    surname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  return <div>Hello WORLD</div>;
};
