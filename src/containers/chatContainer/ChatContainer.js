import { useState } from "react";
import ChatBox from "../../components/chatComponents/chatBox";
import ContactBox from "../../components/chatComponents/contactBox";

import "./style.css";

export default function ChatContainer() {
  const [selectedChat, setSelectedChat] = useState({
    id: "",
    picture: "",
    first_name: "",
    last_name: "",
  });
  return (
    <div className="chat_container">
      <div className="chat_wrapper">
        <div className="chat">
          <ContactBox setSelectedChat={setSelectedChat} />
          <ChatBox selectedChat={selectedChat} />
        </div>
      </div>
    </div>
  );
}
