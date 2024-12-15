import {Upload} from "lucide-react"
import { useCallback } from "react";

interface ImageUploadProps {
    onImageUpload: (file:File) => void;
}


const ImageUpload : React.FC<ImageUploadProps> = ({onImageUpload}) => {
    
    const handleDrop = useCallback((e: React.DragEvent<HTMLInputElement>) => {
     e.preventDefault();      
     const file = e.dataTransfer.files[0];
     if (file && ( (file.type === 'image/jpeg' || file.type === 'image/png'))) {
     onImageUpload(file);
     
     }
    },[onImageUpload])
        

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
     const file = e.target.files?.[0];
     if (file) {
        // console.log(file.size)
        onImageUpload(file);
     }
   };
          


  return (
    <div onDrop={handleDrop} onDragOver = {(e)=> e.preventDefault()} className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors">
        <input type="file" onChange={handleChange} id="image-upload" className="hidden" accept="image/jpeg,image/png" />
        <label
        htmlFor="image-upload"
        className="flex flex-col items-center gap-4 cursor-pointer"
      >
        <Upload className="w-12 h-12 text-gray-400" />
        <div>
          <p className="text-lg font-medium text-gray-700">
            Drop an image here, or click to upload
          </p>
          <p className="text-sm text-gray-500">Supports JPEG and PNG</p>
        </div>
      </label>
    </div>
  )
}

export default ImageUpload