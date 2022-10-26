import "./style.css";
import Header from "../../containers/homeStructure/headerContainer";
import LeftBar from "../../containers/homeStructure/leftBarContainer/LeftBar";
import RightBar from "../../containers/homeStructure/rightBarContainer/RightBar";
import GalleryContainer from "../../containers/galleryContainer/GalleryContainer";

export default function Gallery() {
  return (
    <div>
      <Header />
      <LeftBar />
      <GalleryContainer />
      <RightBar />
    </div>
  );
}
