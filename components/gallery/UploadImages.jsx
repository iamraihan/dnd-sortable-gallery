import React from "react";
import { Image } from "lucide-react";

/**
 * Component for uploading images with drag-and-drop functionality.
 * @param {Object} props - Component properties.
 * @param {Array} props.photos - Array of existing photos.
 * @param {Function} props.setPhotos - Function to update the photos state.
 * @returns {JSX.Element} - UploadImages component.
 */
export default function UploadImages({ photos, setPhotos }) {
  /**
   * Handles file input change and triggers file processing.
   * @param {Event} event - File input change event.
   */
  const handleFileChange = (event) => {
    event.preventDefault();
    const selectedFiles = event.target.files;

    handleFiles(selectedFiles);
  };

  /**
   * Processes the selected files and updates the photos state.
   * @param {FileList} files - List of selected files.
   */
  const handleFiles = (files) => {
    if (files.length > 0) {
      const promises = Array.from(files).map((file) => {
        return new Promise((resolve) => {
          const reader = new FileReader();

          reader.onload = (event) => {
            const dataURL = event.target.result;
            resolve(dataURL);
          };

          reader.readAsDataURL(file);
        });
      });

      Promise.all(promises).then((dataURLs) => {
        const newPhotos = dataURLs.map((dataURL, index) => ({
          id: photos.length + index,
          photo: dataURL,
        }));

        setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);
      });
    } else {
      console.log("No files selected");
    }
  };

  /**
   * Handles the drop event for drag-and-drop functionality.
   * @param {Event} event - Drop event.
   */
  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFiles = event.dataTransfer.files;

    handleFiles(droppedFiles);
  };

  /**
   * Handles the drag over event for drag-and-drop functionality.
   * @param {Event} event - Drag over event.
   */
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
        className="cursor-pointer flex justify-center items-center flex-col pb-16 p-20 "
      >
        <div>
          <Image />
        </div>
        <p>Add Images</p>
      </label>
      <input
        type="file"
        id="fileInput"
        onChange={handleFileChange}
        multiple
        className="hidden"
      />
    </div>
  );
}
