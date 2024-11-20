import { useNavigate } from "react-router-dom";
import FormContainer from "./Forms/FormContainer.jsx";
import FormSubmit from "./Forms/FormSubmit.jsx";
import FormError from "./Forms/FormError.jsx";
import { useState } from "react";
import FormInput from "./Forms/FormInput.jsx";

export default function SignUp() {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const signIn = () => {
    navigate("/signin");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const username = formData.get("username");
    const password = formData.get("password");
    if (!username || !password) return setError("Enter username and password");
    const response = await fetch("http://localhost:3000/api/v1/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: username, password: password }),
    });
    if (!response.ok) return setError("Error creating user");
    const data = await response.json();
    if (data.msg) return setError(data.msg);
    if (data.success) return navigate("/signin");
  };

  return (
    <>
      <FormContainer title={"Sign Up"} onSubmit={handleSubmit}>
        <FormInput id={"username"} type={"username"}>
          Username:
        </FormInput>
        <FormInput id={"password"} type={"password"}>
          Password:
        </FormInput>
        <FormError>{error}</FormError>
        <button
          className={"text-sm pl-2 text-third flex hover:underline"}
          onClick={signIn}
        >
          Sign In
        </button>
        <FormSubmit>{"Sign Up"}</FormSubmit>
      </FormContainer>
    </>
  );
}
