import { useEffect, useRef, useState } from 'react';
import {fabric} from 'fabric';
import type { ImageMetadata } from "../image";

export const useCanvas = (imageData: ImageMetadata) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fabricCanvas, setFabricCanvas] = useState<fabric.Canvas | null>(null);
  const [brushSize, setBrushSize] = useState(12);
  const [brushColor , setBrushColor] = useState("#000000");

  useEffect(() => {
    if (!canvasRef.current || fabricCanvas) return;

    const canvas = new fabric.Canvas(canvasRef.current, {
      width: imageData.width,
      height: imageData.height,
      backgroundColor: "#FFFFFF",
      isDrawingMode: true,
    });

    fabric.Image.fromURL(`${imageData.url}?fm=auto&crossorigin=anonymous`, (img) => {
      img.scaleToWidth(imageData.width);
      img.scaleToHeight(imageData.height);
      canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
    }, { crossOrigin: "anonymous" });

    // Configure brush
    canvas.freeDrawingBrush.color = brushColor;
    canvas.freeDrawingBrush.width = brushSize;

    setFabricCanvas(canvas);

    return () => {
      canvas.dispose();
    };
  }, [imageData.url , imageData.width , imageData.height]);

  useEffect(() => {
    if (fabricCanvas) {
      fabricCanvas.freeDrawingBrush.color = brushColor;
      fabricCanvas.freeDrawingBrush.width = brushSize;
    }
  }, [brushSize, fabricCanvas , brushColor]);

  const clearCanvas = () => {
    if (fabricCanvas) {
      fabricCanvas.clear();
      // Restore background image
      fabric.Image.fromURL(imageData.url, (img) => {
        img.scaleToWidth(imageData.width);
        img.scaleToHeight(imageData.height);
        fabricCanvas.setBackgroundImage(img, fabricCanvas.renderAll.bind(fabricCanvas));
      });
    }
  };

  const exportMask = () => {
    if (!fabricCanvas) return null;
  
    // Temporarily remove the background image
    const backgroundImage = fabricCanvas.backgroundImage;
    fabricCanvas.setBackgroundImage(null as unknown as fabric.Image, fabricCanvas.renderAll.bind(fabricCanvas));
  
    // Export the mask as a data URL
    const maskDataUrl = fabricCanvas.toDataURL({
      format: 'png',
      quality: 1,
    });
  
    // Restore the background image
    fabric.Image.fromURL(imageData.url, (img) => {
      img.scaleToWidth(imageData.width);
      img.scaleToHeight(imageData.height);
      fabricCanvas.setBackgroundImage((backgroundImage || ""), fabricCanvas.renderAll.bind(fabricCanvas));
    });

    return maskDataUrl;
  };

  const getMaskDataUrl = () => {
    // console.log(fabricCanvas)
    return fabricCanvas?.toDataURL({
      format: 'png',
      quality: 1,
    });
  };

  return {
    canvasRef,
    brushSize,
    setBrushColor,
    brushColor,
    setBrushSize,
    clearCanvas,
    getMaskDataUrl,
    exportMask
  };
};