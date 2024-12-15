import React, { useState } from 'react';
import { ImageMetadata } from '../image';
import { useCanvas } from '../hooks/useCanvas';
import { Minus, Plus, Trash2 } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';



interface CanvasProps {
    imageData: ImageMetadata;
    onMaskGenerated: (maskUrl: string) => void;
  }

 export const base64ToBlob = (base64:any) => {
    const byteString = atob(base64.split(",")[1]);
    const mimeString = base64.split(",")[0].split(":")[1].split(";")[0];
  
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
  
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
  
    return new Blob([ab], { type: mimeString });
  };
  
const FabricCanvas : React.FC<CanvasProps> = ({imageData, onMaskGenerated}) => {
  const [ maskImageUrl, setMaskImageUrl] = useState<string | null>(null);

    const { 
      canvasRef,
      brushSize,
      setBrushSize,
      clearCanvas,
      getMaskDataUrl,
      exportMask,
      brushColor,
      setBrushColor } = useCanvas(imageData);

      const handleSave =async () => {
        const maskUrl = getMaskDataUrl();
        if (maskUrl) {
          onMaskGenerated(maskUrl);
          // console.log("imageFile", maskUrl);
          const imageBlob = base64ToBlob(maskUrl);
          const formData = new FormData();
          formData.append("imageFile", imageBlob, "mask.png");
      
          try {
            const toastId = toast.loading("Uploading masked Image...");
            const res = await axios.post("https://image-inpainting-tool.onrender.com/api/imageUpload", formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            });
      
           
            setMaskImageUrl(res.data.data.url);
            toast.success("Masked Image uploaded successfully in Database!", {
              id: toastId,
            });
          } catch (error) {
            console.error("Error uploading image:", error);
          }
        }
      };

      const handleExport = () => {
        const maskUrl = exportMask();
        if (maskUrl) {
          const link = document.createElement("a");
          link.href = maskUrl;
          link.download = "mask.png";
          link.click();
        }
      };
      
    return (
      <div className="flex flex-col items-center">
      <div className="relative">
        <canvas ref={canvasRef} />
      </div>
      <div className="flex items-center gap-4 mt-4">

      <button className='p-2 px-4 hover:bg-gray-100 rounded-full flex items-center gap-2'>
        <label htmlFor="brushColor" className="min-w-[3ch] text-center">Brush Color</label>
        <input type="color" value={brushColor} onChange={(e) => setBrushColor(e.target.value)} className="w-10 h-10 rounded-full" /> 
      </button>

      <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow">
     
      <button
        className="p-2 hover:bg-gray-100 rounded-full"
        onClick={() => setBrushSize(Math.max(1, brushSize-2))}
      >
        <Minus className="w-4 h-4" />
      </button>
      <span className="min-w-[3ch] text-center">{brushSize}</span>
      <button
        className="p-2 hover:bg-gray-100 rounded-full"
        onClick={() => setBrushSize(Math.min(50, brushSize+2))}
      >
        <Plus className="w-4 h-4"  />
      </button>
    </div>
      
      <button
        onClick={clearCanvas}
        className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow hover:bg-gray-50"
      >
        <Trash2 className="w-4 h-4" /> Clear
      </button>
      
      <button
        onClick={handleSave}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700"
      >
        Generate Mask
      </button>
      <button onClick={handleExport}  className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700"> Export Drawing </button>

    </div>
    <div> {maskImageUrl && <a href={`${maskImageUrl}`} className='text-xl text-blue-700 hover:underline'>your masked Image Url</a>} </div> 
    </div>
    );
}

export default FabricCanvas