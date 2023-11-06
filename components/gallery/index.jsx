"use client";

import React, { useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import GallerySortable from "@/components/gallery/GallerySortable";
import RemoveImage from "./RemoveImage";

export default function Gallery({ galleryImages }) {
  const [photos, setPhotos] = useState(galleryImages);

  const handleDragStart = (event) => {
    // console.log("Drag Start:", event.active.id);
  };

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
  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={photos} strategy={rectSortingStrategy}>
        <RemoveImage />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {photos.map((photo, index) => (
            <GallerySortable photo={photo} key={photo.id} index={index} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
