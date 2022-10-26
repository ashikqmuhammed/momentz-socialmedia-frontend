
import ChatContainer from "../../containers/chatContainer/ChatContainer";
import Header from "../../containers/homeStructure/headerContainer";
import LeftBar from "../../containers/homeStructure/leftBarContainer/LeftBar";
import RightBar from "../../containers/homeStructure/rightBarContainer/RightBar";
import "./style.css";


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