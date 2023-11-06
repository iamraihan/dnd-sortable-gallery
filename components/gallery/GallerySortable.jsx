"use client";

import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Check } from "lucide-react";

/**
 * GallerySortable component for displaying a sortable gallery item.
 * @param {Object} props - Component properties.
 * @param {Object} props.photo - Information about the photo.
 * @param {number} props.index - Index of the gallery item.
 * @param {Array} props.selectedIds - Array of selected photo IDs.
 * @param {Function} props.setSelectedIds - Function to update selected photo IDs.
 * @returns {JSX.Element} - GallerySortable component.
 */
export default function GallerySortable({
  photo,
  index,
  selectedIds,
  setSelectedIds,
}) {
  // Dnd-kit hook for sortable functionality
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: photo.id,
    transition: {
      duration: 500,
      easing: "cubic-bezier(0.25, 1, 0.5, 1)",
    },
  });

  // State for tracking selection status
  const [isSelected, setIsSelected] = useState(false);

  // Style for the gallery item
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
    backgroundImage: `url(${photo.photo})`,
    height: `${index === 0 ? "516px" : "250px"}`,
  };

  /**
   * Handles the selection of the gallery item.
   * @param {number} id - ID of the photo.
   */
  const isSelectedHandler = (id) => {
    const newSelectedIds = isSelected
      ? selectedIds.filter((selectedId) => selectedId !== id)
      : [...selectedIds, id];

    setSelectedIds(newSelectedIds);
    setIsSelected(!isSelected);
  };

  // Render the GallerySortable component
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`border border-gray-300 rounded-md bg-cover bg-center relative group hover:before:bg-gray-500 hover:before:absolute hover:before:w-full hover:before:h-full hover:before:opacity-50 ${
        index === 0 ? "col-span-2 row-span-2" : ""
      } ${
        isDragging
          ? ""
          : "hover:shadow-md transform transition-transform duration-300 ease-in-out"
      }`}
    >
      {/* Checkbox for selection */}
      <div
        role="button"
        onClickCapture={() => isSelectedHandler(photo.id)}
        className={`w-6 h-6 ${
          isSelected ? "bg-blue-500" : "group-hover:bg-white"
        }  rounded-md absolute top-5 left-5 flex   group-hover:flex justify-center items-center`}
      >
        {isSelected && <Check color="#fff" width="16" />}
      </div>
    </div>
  );
}
