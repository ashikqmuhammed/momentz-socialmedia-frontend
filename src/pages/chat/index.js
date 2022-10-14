import "./style.css";
import ChatBox from "../../components/chatComponents/chatBox";
import ContactBox from "../../components/chatComponents/contactBox";
import { useRef, useState } from "react";
import { useClickOutside } from "../../helpers/useClickOutside";
import LeftBar from "../../components/homeStructure/leftBarContainer/LeftBar";
import Header from "../../components/homeStructure/headerContainer";
import RightBar from "../../components/homeStructure/rightBarContainer/RightBar";
import ChatContainer from "../../components/pageContainers/chatContainer/ChatContainer";

export default function Chat({ setChat }) {
  const [selectedChat, setSelectedChat] = useState("");
  const chatRef = useRef(null);
  useClickOutside(chatRef, () => setChat(false));

  return (
    <div>
      <Header page="home" />
      <LeftBar />
      <ChatContainer />
      <RightBar />
    </div>
  );
}
