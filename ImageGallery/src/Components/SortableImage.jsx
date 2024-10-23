import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export function SortableImage({ id, image, description, isUpdatingOrder }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1 : 0,
    opacity: isDragging ? 0.8 : isUpdatingOrder ? 0.7 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`transform transition-all duration-200 ${
        isDragging ? "scale-105 shadow-lg" : ""
      }`}
    >
      <div className="bg-white rounded-lg overflow-hidden cursor-grab active:cursor-grabbing relative">
        <img
          src={image}
          alt={description}
          className="w-full aspect-square object-cover border-2 border-gray-400 rounded-lg"
        />
        <p className="text-black text-center font-semibold text-lg p-2">
          {description}
        </p>
        {isUpdatingOrder && (
          <div className="absolute inset-0 bg-white bg-opacity-50 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
          </div>
        )}
      </div>
    </div>
  );
}