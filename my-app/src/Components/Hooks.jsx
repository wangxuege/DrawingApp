import { useRef } from 'react'

export const useOnDraw = (onDrarw) => {
  const canvasRef = useRef(null);
  
  const isDrawingRef = useRef(false);
  
  const initMouseMoveRef = useRef(null);
  const initMouseDownRef = useRef(null);
  const initMouseUpRef = useRef(null);
  
  const setCanvasRef = (ref) =>{
    if(!ref) return;
    canvasRef.current.removeEventListener("mousedown", mouseDownListener.current)
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
      mouseMoveLilstener.current = mouseMoveLilstener;
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
      initMouseDownRef.current = listener;
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
