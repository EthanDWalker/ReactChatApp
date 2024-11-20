import { useEffect, useState } from "react";
import Message from "./Message";
import { useParams, useNavigate } from "react-router-dom";
import socket from "../socket.js";

export default function Room() {
  const { roomId } = useParams();

  const token = sessionStorage.getItem("token");
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const navigate = useNavigate();

  const sendMessage = () => {
    if (!message) return;
    const msg = {
      content: message,
    };
    socket.emit("msg", msg, roomId);
    msg.author = "YOU";
    addMessage(msg);
    setMessage("");
  };

  const addMessage = (msg) => {
    let newMessages = [...messageList, msg];
    if (messageList.length > 25) {
      newMessages = newMessages.slice(messageList.length - 25);
    }
    setMessageList(newMessages);
  };

  socket.on("msg", (msg) => {
    addMessage(msg);
  });

  const exit = () => {
    socket.disconnect();
    navigate("/join");
  };

  useEffect(() => {
    socket.auth = { token: token };
    socket.connect();
    socket.emit("join-room", roomId);

    return () => {
      socket.disconnect();
    };
  }, [roomId, token]);

  return (
    <div className="flex flex-col h-screen p-2">
      <div className="flex-grow overflow-y-auto">
        <div>
          {messageList.map((msg, index) => {
            return (
              <Message key={index}>{`${msg.author}: ${msg.content}`}</Message>
            );
          })}
        </div>
      </div>
      <div className="bg-second p-2 flex space-x-2">
        <button
          className="bg-red justify-end py-2 px-3 rounded-md"
          onClick={exit}
        >
          Exit
        </button>
        <input
          className="bg-first flex-grow outline-none px-2 rounded-md"
          onChange={(event) => setMessage(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") sendMessage(event.target.value);
          }}
          value={message}
        ></input>
        <button
          className="bg-third justify-end py-2 px-3 rounded-md"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
}
