import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

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

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
    backgroundImage: `url(${photo.photo})`,
    height: `${index === 0 ? "510px" : "250px"}`,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`border border-gray-300 rounded-md bg-cover bg-center relative  hover:before:bg-gray-500 hover:before:absolute hover:before:w-full hover:before:h-full hover:before:opacity-50  ${
        index === 0 ? "col-span-2 row-span-2" : ""
      } ${
        isDragging
          ? "shadow-lg scale-105"
          : "hover:shadow-md transform transition-transform duration-300 ease-in-out"
      }`}
    ></div>
  );
}
