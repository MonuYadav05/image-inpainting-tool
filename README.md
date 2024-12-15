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
   - Endpoint: `POST /api/imageUpload`
   - Allows users to upload images to **Cloudinary**.
   - Returns the URL of the uploaded image.

**Example Request**:
```bash
POST /api/imageUpload
Content-Type: multipart/form-data
Body: { imageFile: <image_file> }
```
**Example Request**:
```bash
{
  "url": "https://res.cloudinary.com/your-cloud-name/image/upload/v1641234567/image.png"
}
```

## Frontend Implementation
**The frontend consists of two canvases, each with different functionalities:**
- **Canvas 1 (Fabric.js):** -A more interactive canvas where users can draw freely on the image and apply various drawing tools.
- **Canvas 2 (react-canvas-draw):** - A simpler canvas used for basic masking.
  - **Features:** -
  - Upload an image via the backend API. 
  - Draw or mask on the image using the two canvas options. 
  - Combine the original image and mask into one image.
  - Download the generated mask or combined image.

## How to Run the Project Locally

To run this project locally, follow these steps:

### Prerequisites:
- Node.js (>=14.0.0)
- npm or yarn

### Steps:

1. **Clone the repository**:

    ```bash
    git clone https://github.com/your-username/image-masking-app.git
    cd image-masking-app
    ```

2. **Install dependencies for both frontend and backend**:

    - Navigate to the **backend** folder and install the dependencies:

    ```bash
    cd Backend
    npm install
    ```

    - Navigate to the **frontend** folder and install the dependencies:

    ```bash
    cd Frontend
    npm install
    ```

3. **Setup Cloudinary**:

    - Create an account on [Cloudinary](https://cloudinary.com/).
    - Obtain your **Cloudinary Cloud Name**, **API Key**, and **API Secret**.
    - Create a `.env` file in the backend folder and add your Cloudinary credentials:

    ```bash
    .envExample-
    CLOUDINARY_CLOUD_NAME = 
    CLOUDINARY_API_KEY = 
    CLOUDINARY_API_SECRET = 
    ```

4. **Start the Backend server**:

    ```bash
    cd backend
    npm start
    ```

5. **Start the Frontend server**:

    ```bash
    cd frontend
    npm start
    ```

6. Open the browser and go to [http://localhost:5000](http://localhost:5000) to access the app.

---

## Challenges Faced and Solutions

### 1. Canvas Interaction and Performance:

- **Challenge**: We needed to create two types of interactive canvases with drawing features: one using **Fabric.js** for more advanced features and the other using **react-canvas-draw** for simpler tasks.
- **Solution**: We managed to integrate both libraries into a single React component with clear separation of concerns, ensuring smooth performance and compatibility.

### 2. Combining Images and Masking:

- **Challenge**: Combining the mask created on the canvas with the uploaded image and exporting it as a combined image was tricky. We needed to ensure that the mask was applied correctly without affecting the original image.
- **Solution**: In **react-canvas-draw** exprorting image whith mask is not possible so i only export mask in **react-canvas-draw**  and used **Fabric.js** in which exporting masked image is way more easier than and possible.

### 3. Handling Image Uploads with Cloudinary:

- **Challenge**: Setting up image uploads and integrating **Cloudinary** for image storage had some configuration challenges.
- **Solution**: We used **express-fileupload** as middleware hels in recognizing files from req and for handling image uploads on the backend and connected it with Cloudinary for cloud storage. The API was then set up to return the image URL after the upload.

---

## Live Demo

You can view the live demo of this project on [Vercel](https://image-inpainting-tool-chi.vercel.app/) (or any other hosting platform you used).
also backend is deployed on [Render](https://image-inpainting-tool.onrender.com)


