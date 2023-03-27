import * as React from 'react';
import { Stage, Layer, Image } from 'react-konva';
import Konva from 'konva';
import useImage from "use-image"
import './style.css';

function Slider () {
  const [value, setValue] = React.useState("50");
  const inputBox = React.useRef();
  function handleInput() {
    setValue(inputBox.current.value);
  }

  return (
    <label><input type="range" min="0" max="100" onInput={handleInput} ref={inputBox}/>{value}</label>
  )
}

function FilterImage({ imageUrl }) {
  const [image] = useImage(imageUrl, "");
  const imageRef = React.useRef();

  React.useEffect(() => {
    if(image) {
      imageRef.current.cache();
    }
  }, [image]);

  return (
    <Image
      ref={imageRef}
      image={image}
      filters={[Konva.Filters.Blur]}
      x={10}
      y={10}
      blurRadius={400}
    />
  )
}

export default function App() {
  const [imageUrl, setImageUrl] = React.useState("https://miro.medium.com/v2/resize:fit:640/format:webp/1*vP1drWY1myDhV99P9YHhGg.png")

  return (
    <div>
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          <FilterImage imageUrl={imageUrl}/>
        </Layer>
      </Stage>
      <Slider />
    </div>
  );
}
