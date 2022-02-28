import React from 'react'
import { useOnDraw } from './Hooks';

export const Canvas = ({width,height}) => {

  const canvasStyle = {
    border: "1px solid black"
  };
  
  const onDraw = (context, point) => {
    context.fillStyle = "purple"
    context.beginPath();
    context.arc(point.x, point.y, 5, 0, 2 * Math.PI);
    context.fill();
  }

  const canvasRef = useOnDraw(onDraw);


  return (
    <canvas
      width={width}
      height={height} 
      style={canvasStyle}
      ref={canvasRef}
    />
  )
}
