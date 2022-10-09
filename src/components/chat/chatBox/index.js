import "./style.css";

export default function ChatBox({ selectedChat }) {
  return (
    <div className="chatBox">
      {!selectedChat && (
        <div className="noSelectedChat">
          <div>Select a chat to start messaging</div>
        </div>
      )}
    </div>
  );
}
