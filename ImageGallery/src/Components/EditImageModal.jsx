// EditImageModal.js
import React, { useState } from "react";
import useUser from "../Hooks/useUser";

const EditImageModal = ({
  isOpen,
  onClose,
  onConfirm,
  initialImage,
  initialDescription,
}) => {
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState(initialDescription);
  const { Update_Image_axios } = useUser();
  const [ErrorMessage,setErrorMessages] = useState('')

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    const validImageExtensions = ["jpg", "jpeg", "png", "gif", "webp"];
    console.log(file, "file");
    const fileExtension = file.name.split(".").pop().toLowerCase();
    console.log(fileExtension,'file extension')
    if (file.type.startsWith("image/") && validImageExtensions.includes(fileExtension)) {
      setErrorMessages("");
      setImage(file);

    }else{
      setErrorMessages("Please select a valid image file (jpg, jpeg, png, gif, webp).")
    }

  };

  const handleConfirm = () => {
    const formdata = new FormData();

    if (image) {
      formdata.append("image", image);

    } if (description ) {
        if(description.trim() !== ""){
          formdata.append("descriptions", description.trim());

        }else{
          setErrorMessages('Please enther valid description.')
          return 
        }
    }
    if(image || description){
      formdata.append('id',initialImage.id)
      Update_Image_axios(formdata);
      onClose();
    }
    
  };

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center  z-50">
        <div className="bg-blue-100 p-5 rounded-lg shadow-lg  ">
          <h2 className="text-xl font-bold">Edit Image</h2>
          <input
            accept="image/*"
            type="file"
            onChange={handleImageChange}
            className="my-2 border-2 border-gray-500 p-2 w-full rounded-lg "
          />
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border-2 border-gray-500 rounded-lg p-2 w-full"
            placeholder="Description"
            required
          />
          <p className="text-red-500 text-sm font-semibold py-2 text-center">{ErrorMessage}</p>
          <div className="flex justify-center space-x-4 mt-4">
            <button
              onClick={onClose}
              className="bg-gray-300 font-semibold hover:bg-gray-400 text-black px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              className="bg-emerald-500 hover:bg-emerald-700 text-white font-semibold px-4 py-2 rounded"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default EditImageModal;
