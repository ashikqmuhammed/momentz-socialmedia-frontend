import "./style.css";
import LeftBar from "../../components/homeStructure/leftBarContainer/LeftBar";
import Header from "../../components/homeStructure/headerContainer";
import RightBar from "../../components/homeStructure/rightBarContainer/RightBar";
import ChatContainer from "../../components/pageContainers/chatContainer/ChatContainer";

export default function Chat() {
  return (
    <div>
      <Header page="home" />
      <LeftBar />
      <ChatContainer />
      <RightBar />
    </div>
  );
}
