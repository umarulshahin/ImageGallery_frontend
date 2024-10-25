import React from "react";
import bin from '../assets/bin.png'
import trash from '../assets/trash.png'


const ImageDeleteModal = ({ isOpen, onClose, onConfirm }) => {
    console.log("deletemodal is working ")
  return (
    isOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white flex flex-col justify-center items-center space-y-4 p-5 rounded-lg shadow-xl">
          <h2 className="font-bold text-lg  ">Confirm Deletion</h2>
          <img className="h-20 " src={trash} alt="" />
          <p className="mt-4">Are you sure you want to delete this image?</p>
          <div className="flex justify-center space-x-2 mt-3">
            <button
              className="bg-red-500 text-white font-semibold px-3 py-1 rounded hover:bg-red-700"
              onClick={onConfirm}
            >
              Delete
            </button>
            <button
              className="bg-gray-300 font-semibold px-3 py-1 rounded hover:bg-gray-400"
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
