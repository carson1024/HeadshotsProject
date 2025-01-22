import blur from "/public/blur.png";
import example from "/public/example.png";
import result from "/public/result.png";
import { Carousel } from "antd";

const contentStyle = {
  margin: 0,
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};
export default function ProductCarousel() {
  return (
    <>
      <Carousel arrows dotPosition="left" infinite={false} autoplay={true} boolean={false} adaptiveHeight={false}>
        <div>
          <img src={example.src} alt="example" className="h-[100%]" />
        </div>
        <div>
          <img src={blur.src} alt="example" className="h-[100%]" />
        </div>
        <div>
          <img src={result.src} alt="example" className="h-[100%]"  />
        </div>
      </Carousel>
    </>
  );
}
