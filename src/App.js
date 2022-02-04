import ImageSlider from "./components/ImageSlider";
import firstImg from "./assets/images/pic1.jpg";
import secondImg from "./assets/images/pic2.jpg";
import thirdImg from "./assets/images/pic3.jpg";
import fourthImg from "./assets/images/pic4.jpg";
import fifthImg from "./assets/images/pic5.jpg";
import sixthImg from "./assets/images/pic6.jpg";
import seventhImg from "./assets/images/pic7.jpg";

const imgArray = [
  { src: firstImg, alt: "trees" },
  { src: secondImg, alt: "trees" },
  { src: thirdImg, alt: "trees" },
  { src: fourthImg, alt: "trees" },
  { src: fifthImg, alt: "trees" },
  { src: sixthImg, alt: "trees" },
  { src: seventhImg, alt: "trees" },
];

function App() {
  return (
    <div className="App">
      <ImageSlider imgArray={imgArray} />
    </div>
  );
}

export default App;
