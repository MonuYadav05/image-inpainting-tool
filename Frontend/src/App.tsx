import React, { useEffect, useState } from "react";
import ImageUpload from "./components/ImageUpload";
import Canvas from "./components/Canvas";
import { ImageMetadata } from "./image";
import { Image } from "lucide-react";
import FabricCanvas from "./components/FabricCanvas";
import axios from "axios";
import toast from "react-hot-toast";

function App() {
  const [imageData, setImageData] = useState<ImageMetadata | null>(null);
  const [maskUrl, setMaskUrl] = useState<string | null>(null);
  const [useFabric, setUseFabric] = useState(true);

  useEffect(() => {
    // console.log("Updated imageData:", imageData);
  }, [imageData]);

  const onImageUpload = async(file: File) => {

    try {
      const formData = new FormData();
      formData.append("imageFile", file);
      const toastId = toast.loading("Uploading image...");

      const res = await axios.post("https://image-inpainting-tool.onrender.com/api/imageUpload", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Fix typo here (not "miltipart")
        },
      });
      
      console.log("Server Response:", res.data);
      
      setImageData({
        url: res.data.data.url,
        width: res.data.data.width,
        height: res.data.data.height,
      });
      toast.success("Image uploaded successfully in Database!", {
        id: toastId,
      });
      setMaskUrl(null); // Reset mask URL
    } catch (error) {
      console.error("Error uploading image:", error);
    }// Reset mask URL when a new image is uploaded

 
  };

  const handleReUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    console.log(file);
    if (file) {
      onImageUpload(file);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="rounded-xl p-8 shadow-xl bg-white">
          <h1 className="text-3xl font-bold flex justify-between text-gray-900">Image Inpainting Tool  <span> <button className={`bg-blue-600 text-xl ${useFabric && "bg-blue-900"} text-white px-4 py-2 rounded-lg shadow cursor-pointer`} onClick={() => setUseFabric(true)}>use fabric</button> <button className={`bg-blue-600 text-xl ${!useFabric && "bg-blue-900"} text-white px-4 py-2 rounded-lg shadow cursor-pointer`}  onClick={()=>setUseFabric(false)}>use react-canva-draw</button> </span></h1> 
          <p className="text-gray-600 mb-6">
            Upload an image and draw on it to create a mask for inpainting
          </p>
          <div className="flex items-center gap-4 mb-6">
            {/* File input for re-uploading the image */}
            <input
              type="file"
              id="re-upload"
              className="hidden"
              accept="image/jpeg,image/png"
              onChange={handleReUpload}
            />
            <label
              htmlFor="re-upload"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow cursor-pointer hover:bg-blue-700"
            >
              Reupload Image
            </label>
          </div>

          {/* Conditional rendering for image upload or canvas */}
          {!imageData ? (
            <ImageUpload onImageUpload={onImageUpload} />
          ) : (!useFabric ? 
            <Canvas imageData={imageData} onMaskGenerated={setMaskUrl} /> :
            <FabricCanvas  imageData={imageData} onMaskGenerated={setMaskUrl}/>
          )}
        </div>

        {/* Display results (original image and generated mask) */}
        {maskUrl && (
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Results</h2>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Image className="w-5 h-5" /> Original Image ({imageData?.width}x{imageData?.height})
                </h3>
                <img
                  src={imageData?.url}
                  alt="Original"
                  className="w-full rounded-lg border border-gray-200"
                />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Image className="w-5 h-5" /> Generated Mask
                </h3>
                <img
                  src={maskUrl}
                  alt="Mask"
                  className="w-full rounded-lg border border-gray-200"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
