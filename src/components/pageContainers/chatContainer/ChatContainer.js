import ChatBox from "../../chatComponents/chatBox";
import ContactBox from "../../chatComponents/contactBox";
import "./style.css";

export default function ChatContainer() {
  return (
    <div className="chat_container">
      <div className="chat_wrapper">
        <div className="chat">
          <ContactBox />
          <ChatBox />
        </div>
      </div>
    </div>
  );
}
