"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Image from "next/image";

export default function GallerySortable({ photo, index }) {
  console.log("photo: ", photo);
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: photo.id,
      transition: {
        duration: 500,
        easing: "cubic-bezier(0.25, 1, 0.5, 1)",
      },
    });
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
    backgroundImage: `url(${photo.photo})`,
    height: `${index === 0 ? "539px" : "250px"}`,
    backgroundPosition: "center",
    backgroundSize: "cover",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={` border border-gray-300  rounded-md  ${
        index === 0 ? "col-span-2 row-span-2" : ""
      }`}
    ></div>
  );
}
