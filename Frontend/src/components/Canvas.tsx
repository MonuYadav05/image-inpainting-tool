import React, { useEffect, useRef, useState } from 'react'
import CanvasDraw from "react-canvas-draw";
import { ImageMetadata } from '../image';
import { Minus, Plus, Trash2 } from 'lucide-react';


interface CanvasProps {
  imageData: ImageMetadata;
  onMaskGenerated: (maskUrl: string) => void;
}

const Canvas : React.FC<CanvasProps> =({imageData, onMaskGenerated}) => {
    const canvasRef = useRef<CanvasDraw & { getDataURL: (fileType: string, useBgImage: boolean, bgColor?: string) => string } & {canvasContainer:HTMLCanvasElement}>(null);
  const [brushSize, setBrushSize] = useState<number | 0>(12);
  const [saveData, setSaveData] = useState<string | null>(null);
    const [brushColor, setBrushColor] = useState<string>("#ffffff");
    
    useEffect(()=> {
        canvasRef?.current?.clear(); 
        setBrushColor("#ffffff");
    } , [imageData.url])

    function handleExport() {
      if (canvasRef.current) {
        // Export the mask as a Data URL
        const dataUrl = canvasRef.current.getDataURL("image/png", false, "black");
        // Create a link to download the image
    
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = "masked-image.png";
        link.click();
      }
    }
//@ts-ignore
    function handleGenerateMask() {
      if (canvasRef.current) {
      const dataUrl = canvasRef.current.getDataURL("image/png", false, "black");
      // Create a link to download the image
      onMaskGenerated(dataUrl);
    }
  }
    

  return (
    <div className={`relative w-${imageData.width} h-${imageData.height}`}>
        <img src={`${imageData.url}`} alt="UploadedImage" className='absolute  ' />
        <CanvasDraw
        ref={canvasRef}
        canvasHeight={imageData.height}
        canvasWidth={Math.min(imageData.width , 850)}
        brushColor={brushColor}
        brushRadius={brushSize}
        hideGrid={true}
        className='z-10 inset-0 transparent'
        // imgSrc={imageData.url}
        clampLinesToDocument={false}
        enablePanAndZoom={true}
      />

<div className="flex items-center justify-evenly gap-2 bg-white px-4 py-2 rounded-lg shadow">
     <div className='flex items-center gap-2'>
      <button className='p-2 px-4 hover:bg-gray-100 rounded-full flex items-center gap-2'>
        <label htmlFor="brushColor" className="min-w-[3ch] text-center">Brush Color</label>
        <input type="color" value={brushColor} onChange={(e) => setBrushColor(e.target.value)} className="w-10 h-10 rounded-full" /> 
      </button>
     <button
        onClick={() => setBrushSize(Math.max(1, brushSize-2))}
        className="p-2 hover:bg-gray-100 rounded-full"
      >
        <Minus className="w-4 h-4" />
      </button>
      <span>{brushSize}</span>
      <button
        onClick={() => setBrushSize(Math.min(50, brushSize+2))}
        className="p-2 hover:bg-gray-100 rounded-full"
      >
        <Plus className="w-4 h-4" />
      </button>

     </div>
      <button
          onClick={() => canvasRef.current?.clear()}
        className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow hover:bg-gray-200"
      >
        <Trash2 className="w-4 h-4" /> Clear
      </button>
      
      <button  onClick={handleGenerateMask}
       className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700">
        Generate Mask
      </button>
    
    </div>
    <div className='flex items-center justify-evenly gap-2 bg-white px-4 py-2 rounded-lg shadow'>
      
    <button onClick={() => setSaveData(canvasRef.current?.getSaveData()||"")} className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700"> Save Drawing </button>
      <button onClick={() => canvasRef.current?.loadSaveData(saveData||"")} className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700"> Load Drawing </button>
      <button onClick={handleExport} className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700"> Export Drawing </button>
    
      <button onClick={() => canvasRef.current?.undo()} className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700"> Undo </button>
    </div>
    </div>
  )
}

export default Canvas