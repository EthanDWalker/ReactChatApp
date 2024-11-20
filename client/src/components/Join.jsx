import { useNavigate } from "react-router-dom";
import FormContainer from "./Forms/FormContainer";
import FormSubmit from "./Forms/FormSubmit.jsx";
import FormInput from "./Forms/FormInput.jsx";

export default function Join() {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    if (!localStorage.getItem("token")) return navigate("/signin");
    event.preventDefault();
    const formData = new FormData(event.target);
    const roomId = formData.get("roomId");
    if (!roomId) return;
    navigate(`/rooms/${roomId}`);
  };

  return (
    <FormContainer title={"Join Room"} onSubmit={handleSubmit}>
      <FormInput id={"roomId"}>Room:</FormInput>
      <FormSubmit>Join</FormSubmit>
    </FormContainer>
  );
}
