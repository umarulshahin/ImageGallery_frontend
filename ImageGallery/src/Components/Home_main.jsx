import React, { useEffect, useState } from "react";
import useUser from "../Hooks/useUser";
import { useSelector } from "react-redux";
import { Backend_URl } from "../Utils/Constance";

const Home_main = () => {
  // State to manage multiple image uploads
  const [images, setImages] = useState([{ file: null, description: "" }]);
  const [newImage, setNewImage] = useState(false);
  const { Image_Upload_axios, Get_Image_axios } = useUser();
  const userimages = useSelector((state) => state.userdata.images);

  // Handle adding new image upload field
  const handleAddMore = () => {
    setImages([...images, { file: null, description: "" }]);
  };

  useEffect(() => {
    Get_Image_axios();
  }, []);
  // Handle file change
  const handleFileChange = (index, e) => {
    const newImages = [...images];
    newImages[index].file = e.target.files[0];
    setImages(newImages);
  };

  // Handle description change
  const handleDescriptionChange = (index, e) => {
    const newImages = [...images];
    newImages[index].description = e.target.value;
    setImages(newImages);
  };
  console.log(images);

  const handleUpload = () => {
    Image_Upload_axios(images);
    setImages([{ file: null, description: "" }]);
  };
  return (
    <div className="min-h-screen">
      <div className="mt-10 flex justify-end mr-10">
        <button
          onClick={() => setNewImage(!newImage)}
          className="py-2 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-800 font-bold text-lg text-white"
        >
          Add New Image
        </button>
      </div>

      {newImage && (
        <div className="flex flex-col w-1/2 space-y-2  px-10">
          {images.map((image, index) => (
            <div key={index} className="space-y-2 space-x-2">
              <input
                type="file"
                onChange={(e) => handleFileChange(index, e)}
                className="py-2 px-4 border-2 border-gray-500 rounded-lg"
              />
              <input
                type="text"
                value={image.description}
                onChange={(e) => handleDescriptionChange(index, e)}
                className="py-3 px-4 border-2 border-gray-500 rounded-lg font-semibold"
                placeholder="Description"
              />
            </div>
          ))}

          {/* Add More Button */}
          <button
            disabled={
              !images[images.length - 1].file ||
              !images[images.length - 1].description
            }
            onClick={handleAddMore}
            className={`py-2 px-4 rounded-lg text-lg font-bold text-white ${
              !images[images.length - 1].file ||
              !images[images.length - 1].description
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-emerald-600 hover:bg-emerald-800"
            }`}
          >
            Add More
          </button>

          {/* Upload Button */}
          <button
            disabled={!images[0].file || !images[0].description}
            onClick={() => handleUpload()}
            className={`py-2 px-4 rounded-lg text-lg font-bold text-white ${
              !images[0].file || !images[0].description
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-emerald-600 hover:bg-emerald-800"
            }`}
          >
            Upload
          </button>
        </div>
      )}
      <div className="grid grid-cols-6 gap-4 p-10 rounded-lg border-2 border-gray-300 m-10">
        {userimages &&
          userimages.map((data, index) => (
            <div key={index} className="image-container  ">
              <img
                src={Backend_URl + data.image} // Assuming `data.image` holds the image URL or path
                alt={`Image ${index + 1}`}
                className="w-48 h-48 object-cover border-2 border-gray-400 rounded-lg" // You can adjust the styling as needed
              />
              <p className="text-black">{data.descriptions}</p>{" "}
              {/* Assuming there's a description for each image */}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Home_main;
