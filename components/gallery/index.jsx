"use client";

import React, { useState, useEffect } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import GallerySortable from "@/components/gallery/GallerySortable";
import RemoveImage from "@/components/gallery/RemoveImage";
import UploadImages from "./UploadImages";

/**
 * Gallery component for displaying and managing a sortable image gallery.
 * @param {Object} props - Component properties.
 * @param {Array} props.galleryImages - Array of images for the gallery.
 * @returns {JSX.Element} - Gallery component.
 */
export default function Gallery({ galleryImages }) {
  // State for managing gallery images and selected image IDs
  const [photos, setPhotos] = useState(galleryImages);
  const [selectedIds, setSelectedIds] = useState([]);

  // Update gallery images when the prop changes
  useEffect(() => {
    setPhotos(galleryImages);
  }, [galleryImages, setPhotos]);

  /**
   * Handles the drag start event.
   * @param {Object} event - Drag start event.
   */
  const handleDragStart = (event) => {
    // Uncomment the line below for debugging purposes
    // console.log("Drag Start:", event.active.id);
  };

  /**
   * Handles the drag end event, reordering the images in the gallery.
   * @param {Object} event - Drag end event.
   */
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id === over.id) {
      return;
    }
    setPhotos((photos) => {
      const oldIndex = photos.findIndex((photo) => photo.id === active.id);
      const newIndex = photos.findIndex((photo) => photo.id === over.id);
      return arrayMove(photos, oldIndex, newIndex);
    });
  };

  // Render the Gallery component
  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={photos} strategy={rectSortingStrategy}>
        {/* RemoveImage component for deleting selected images */}
        <RemoveImage
          selectedIds={selectedIds}
          photos={photos}
          setPhotos={setPhotos}
          setSelectedIds={setSelectedIds}
        />
        {/* Gallery grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {/* Render each GallerySortable component for images */}
          {photos.map((photo, index) => (
            <GallerySortable
              photo={photo}
              key={photo.id}
              index={index}
              selectedIds={selectedIds}
              setSelectedIds={setSelectedIds}
            />
          ))}
          {/* UploadImages component for adding new images */}
          <UploadImages photos={photos} setPhotos={setPhotos} />
        </div>
      </SortableContext>
    </DndContext>
  );
}
