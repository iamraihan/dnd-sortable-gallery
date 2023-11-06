import { Image } from "lucide-react";
import React, { useState, useRef } from "react";

export default function UploadImages({ photos, setPhotos }) {
  const [uploadImages, setUploadImages] = useState([]);
  const formRef = useRef();

  const uploadHandler = (event) => {
    event.preventDefault();
    const selectedFiles = event.target.files;

    handleFiles(selectedFiles);
  };

  const handleFiles = (files) => {
    if (files.length > 0) {
      const newPhotos = Array.from(files).map((file, index) => ({
        id: photos.length + index + 1,
        photo: file.name,
      }));
      setPhotos([...photos, ...newPhotos]);
      setUploadImages(files);
      // Handle the upload logic here
    } else {
      console.log("No files selected");
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFiles = event.dataTransfer.files;

    handleFiles(droppedFiles);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      className="border-2 border-dashed border-gray-300 p-4 text-center cursor-pointer"
    >
      <label
        htmlFor="fileInput"
        className="cursor-pointer  flex justify-center items-center flex-col p-20"
      >
        <div>
          <Image />
        </div>
        <p>Add Images</p>
      </label>
      <input
        type="file"
        id="fileInput"
        onChange={uploadHandler}
        multiple
        className="hidden"
      />
    </div>
  );
}
