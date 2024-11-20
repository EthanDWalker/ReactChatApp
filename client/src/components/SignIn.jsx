import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormContainer from "./Forms/FormContainer";
import FormSubmit from "./Forms/FormSubmit.jsx";
import FormInput from "./Forms/FormInput.jsx";
import FormError from "./Forms/FormError.jsx";

export default function SignIn() {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const username = formData.get("username");
    const password = formData.get("password");
    if (!password || !username) return setError("Enter username and password");
    const response = await fetch("http://localhost:3000/api/v1/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: username, password: password }),
    });
    const data = await response.json();
    console.log(data.msg);
    if (data.msg) {
      return setError(data.msg);
    }
    if (data.token) {
      sessionStorage.setItem("token", data.token);
      navigate("/join");
    }
  };

  return (
    <>
      <FormContainer title={"Sign In"} onSubmit={handleSubmit}>
        <FormInput id={"username"} type={"username"}>
          Username:
        </FormInput>
        <FormInput id={"password"} type={"password"}>
          Password:
        </FormInput>
        <button
          className={"text-sm pl-2 text-third flex hover:underline"}
          onClick={navigate("/signup")}
        >
          Sign Up
        </button>
        <FormError>{error}</FormError>
        <FormSubmit>Sign In</FormSubmit>
      </FormContainer>
    </>
  );
}
