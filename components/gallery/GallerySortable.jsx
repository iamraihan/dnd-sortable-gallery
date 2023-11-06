"use client";

import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Check } from "lucide-react";

export default function GallerySortable({ photo, index }) {
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

  const [isSelected, setIsSelected] = useState(false);
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
    backgroundImage: `url(${photo.photo})`,
    height: `${index === 0 ? "510px" : "250px"}`,
  };

  const isSelectedHandler = () => {
    console.log("Clicked!"); // Add this line for debugging
    setIsSelected((isSelected) => !isSelected);
  };
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`border border-gray-300 rounded-md bg-cover bg-center relative group hover:before:bg-gray-500 hover:before:absolute hover:before:w-full hover:before:h-full hover:before:opacity-50  ${
        index === 0 ? "col-span-2 row-span-2" : ""
      } ${
        isDragging
          ? ""
          : "hover:shadow-md transform transition-transform duration-300 ease-in-out"
      }`}
    >
      <div
        role="button"
        onClickCapture={isSelectedHandler}
        className={`w-6 h-6 ${
          isSelected ? "group-hover:bg-blue-500" : "group-hover:bg-white"
        }  rounded-md absolute top-5 left-5 hidden group-hover:flex justify-center items-center`}
      >
        {isSelected && <Check color="#fff" width="16" />}
      </div>
    </div>
  );
}
