import { useLayoutEffect, useState } from "react";
import ChatBox from "../../components/chatComponents/chatBox";
import ContactBox from "../../components/chatComponents/contactBox";

import "./style.css";

export default function ChatContainer({smallView,setHideHeader}) {
  const [selectedChat, setSelectedChat] = useState({
    id: "",
    picture: "",
    first_name: "",
    last_name: "",
  });
  const [smallChatBox, setSmallChatBox] = useState(false);
  useLayoutEffect(() => {
    if (smallView) {
      setHideHeader(true);
      return () => {
        setHideHeader(false);
      };
    }
  }, []);
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
