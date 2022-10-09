import "./style.css";
import ChatBox from "../../components/chat/chatBox";
import ContactBox from "../../components/chat/contactBox";
import { useRef, useState } from "react";
import { useClickOutside } from "../../helpers/useClickOutside";

export default function Chat({ setChat }) {
  const [selectedChat, setSelectedChat] = useState("");
  const chatRef = useRef(null);
  useClickOutside(chatRef, () => setChat(false));

  return (
    <div className="blur">
      <div className="chat" ref={chatRef}>
        <ContactBox setSelectedChat={setSelectedChat} />
        <ChatBox selectedChat={selectedChat} />
      </div>
    </div>
  );
}
