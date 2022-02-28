import { useEffect } from 'react';
import { useRef } from 'react'

export const useOnDraw = (onDrarw) => {
  const canvasRef = useRef(null);
  
  const isDrawingRef = useRef(false);
  
  const mouseMoveRef = useRef(null);
  const mouseDownRef = useRef(null);
  const mouseUpRef = useRef(null);

  useEffect(()=>{
    return () =>{
      if(mouseMoveRef.current) {
        window.removeEventListener("mousemove",mouseMoveRef.current)
      }
      if(mouseUpRef.current) {
        window.removeEventListener("mouseup",mouseUpRef.current)
      }
    }
  },[])
  
  const setCanvasRef = (ref) =>{
    if(!ref) return;
    if(canvasRef.current){
      canvasRef.current.removeEventListener("mousedown", mouseDownRef.current)
    }
    canvasRef.current = ref;
    initMouseMove();
    initMouseDownListener();
    initMousetUpListener();
  };

  const initMouseMove = ()=>{
    //マウスの位置をコンソールに出す contectオブジェクトを取得
    const mouseMoveLilstener =(e) =>{
      if(isDrawingRef.current) {
        const point = FixPointerPosition(e.clientX, e.clientY);
        const context = canvasRef.current.getContext("2d");
        if(onDrarw) onDrarw(context, point);
        console.log(point);
        }   
      }
      mouseMoveRef.current = mouseMoveLilstener;
    window.addEventListener("mousemove", mouseMoveLilstener)
  };

  //mouseupでやめる
  const initMousetUpListener = () =>{
    const listener = () =>{
      isDrawingRef.current = false;
    }
    initMousetUpListener.current = listener;
    window.addEventListener ("mouseup", listener);
  };

  //mousedownで書く
  const initMouseDownListener = () =>{
    if(canvasRef){
      const listener = () =>{
        isDrawingRef.current = true;
      }
      mouseDownRef.current = listener;
      canvasRef.current.addEventListener ("mousedown", listener);
    }
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
