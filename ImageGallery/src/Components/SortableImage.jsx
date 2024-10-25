import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export function SortableImage({ id, image, description, isUpdatingOrder,  onEdit, onDelete }) {
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
      className={`relative transform transition-all flex justify-center items-center rounded-lg inset-0 duration-200 border-2 shadow-2xl border-gray-400 ${
        isDragging ? "scale-105 shadow-lg" : ""
      }`}
    >
      <div
        {...attributes}
        {...listeners}
        className="bg-white overflow-hidden rounded-lg shadow-xl cursor-grab active:cursor-grabbing relative group"
      >
        <img
          src={image}
          alt={description}
          className="w-full aspect-square object-cover border-b-2 border-gray-300 "
        />

        <div className="absolute bottom-10 left-0 right-0 flex justify-center items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={onEdit}
            className="bg-white p-2 rounded-full shadow-md hover:bg-gray-200 transform hover:scale-105 transition-transform"
          >
            <i className="fas fa-edit text-blue-700 text-lg" aria-hidden="true"></i>
          </button>
          <button
            onClick={onDelete}
            className="bg-white p-2 rounded-full shadow-md hover:bg-gray-200 transform hover:scale-105 transition-transform"
          >
            <i className="fas fa-trash text-red-700 text-lg" aria-hidden="true"></i>
          </button>
        </div>

        <p className="text-black text-center font-semibold text-lg p-2">{description}</p>

        {isUpdatingOrder && (
          <div className="absolute inset-0 bg-white bg-opacity-50 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
          </div>
        )}
      </div> 
    </div>
  );
}
