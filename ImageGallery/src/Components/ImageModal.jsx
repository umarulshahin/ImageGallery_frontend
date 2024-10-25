// EditImageModal.js
import React, { useState } from "react";

const EditImageModal = ({ isOpen, onClose, onConfirm, initialImage, initialDescription }) => {
  const [image, setImage] = useState(initialImage);
  const [description, setDescription] = useState(initialDescription);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleConfirm = () => {
    onConfirm(image, description);
    onClose();
  };

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white p-5 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold">Edit Image</h2>
          <input
            type="file"
            onChange={handleImageChange}
            className="my-2"
          />
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border-2 border-gray-500 rounded-lg p-2 w-full"
            placeholder="Description"
          />
          <div className="flex justify-between mt-4">
            <button onClick={onClose} className="bg-gray-400 text-white px-4 py-2 rounded">Cancel</button>
            <button onClick={handleConfirm} className="bg-emerald-600 text-white px-4 py-2 rounded">Confirm</button>
          </div>
        </div>
      </div>
    )
  );
};

export default EditImageModal;
