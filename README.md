# Image Masking & Drawing App

This project is a web-based image masking and drawing application that uses **Fabric.js** and **react-canvas-draw** libraries for interactive canvas manipulation. It features a backend built with **Express.js** that allows users to upload images to **Cloudinary** and provides a URL of the uploaded image. Users can create masks on the uploaded image using the canvases and download the generated mask or combined image.

## Table of Contents

- [Technologies Used](#technologies-used)
- [Backend API](#backend-api)
- [Frontend Implementation](#frontend-implementation)
- [How to Run the Project Locally](#how-to-run-the-project-locally)
- [Challenges Faced and Solutions](#challenges-faced-and-solutions)
- [Live Demo](#live-demo)

## Technologies Used

- **Frontend:**
  - **React.js** - For the user interface and components.
  - **Fabric.js** - For advanced canvas drawing with interactive features.
  - **react-canvas-draw** - For a simpler, more lightweight canvas drawing.
  - **Tailwind CSS** - For styling the UI.
  - **Axios** - For making HTTP requests to the backend.

- **Backend:**
  - **Express.js** - Server-side framework to handle requests.
  - **Cloudinary** - For storing images in the cloud.
  - **Multer** - Middleware for handling image uploads.

## Backend API

The backend is built using **Express.js**. It provides the following functionality:

1. **Image Upload API**: 
   - Endpoint: `POST /api/upload`
   - Allows users to upload images to **Cloudinary**.
   - Returns the URL of the uploaded image.

**Example Request**:
```bash
POST /api/upload
Content-Type: multipart/form-data
Body: { file: <image_file> }
