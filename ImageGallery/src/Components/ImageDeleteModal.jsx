import React from "react";

const ImageDeleteModal = ({ isOpen, onClose, onConfirm }) => {
    console.log("deletemodal is working ")
  return (
    isOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-5 rounded-lg shadow-lg">
          <h2 className="font-semibold text-lg">Confirm Deletion</h2>
          <p className="mt-4">Are you sure you want to delete this image?</p>
          <div className="flex justify-end space-x-2 mt-3">
            <button
              className="bg-red-500 text-white px-3 py-1 rounded"
              onClick={onConfirm}
            >
              Delete
            </button>
            <button
              className="bg-gray-300 px-3 py-1 rounded"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default ImageDeleteModal;
