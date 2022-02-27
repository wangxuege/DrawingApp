import { useRef } from 'react'

export const useOnDraw = () => {

  const canvasRef = useRef(null);

  const setCanvasRef = (ref) =>{
    if(!ref) return;
    canvasRef.current = ref;
    initMouseMove();
  };

  //マウスの位置をコンソールに出す
  const initMouseMove = ()=>{
    const mouseMove =(e) =>{
      const point = FixPointerPosition(e.clientX, e.clientY);
      const context = canvasRef.current.getContext("2d");
      console.log(point);
    }
    window.addEventListener("mousemove", mouseMove)
  };

  //Canvasの座標をなおす
  const FixPointerPosition = (clientX, clientY)=>{
    if(canvasRef.current){
      const boundingBox = canvasRef.current.getBoundingClientRect();
      return {
        x: clientX - boundingBox.left,
        y: clientY - boundingBox.top,
      }
    }
  };



  return setCanvasRef;
}
