import React from 'react'
import { useOnDraw } from './Hooks';

export const Canvas = ({width,height}) => {

  const canvasStyle = {
    border: "1px solid black"
  };

  const canvasRef = useOnDraw();

  const onDraw = (context, point){
    
  }

  return (
    <canvas
      width={width}
      height={height} 
      style={canvasStyle}
      ref={canvasRef}
    />
  )
}
