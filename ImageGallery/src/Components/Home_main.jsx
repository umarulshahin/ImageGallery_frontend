import React, { useEffect, useState } from "react";
import useUser from "../Hooks/useUser";
import { useSelector } from "react-redux";
import { Backend_URl } from "../Utils/Constance";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import axios from "axios";
import { SortableImage } from "./SortableImage";

const Home_main = () => {
  const [images, setImages] = useState([{ file: null, description: "" }]);
  const [newImage, setNewImage] = useState(false);
  const { Image_Upload_axios, Get_Image_axios,Image_Ordering_axios } = useUser();
  const userimages = useSelector((state) => state.userdata.images);
  const [orderedImages, setOrderedImages] = useState([]);
  const [isUpdatingOrder, setIsUpdatingOrder] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    Get_Image_axios();
  }, []);

  useEffect(() => {
    if (userimages) {
      const processedImages = userimages.map((img, index) => ({
        ...img,
        id: img.id ? String(img.id) : String(index),
        order: img.order || index // Use existing order or fallback to index
      }));
      // Sort by order field
      const sortedImages = [...processedImages].sort((a, b) => a.order - b.order);
      setOrderedImages(sortedImages);
    }
  }, [userimages]);

  // Function to update order in backend
  const updateImageOrder = async (reorderedImages) => {
   
      setIsUpdatingOrder(true);
      
      // Create array of { id, order } objects
      const orderUpdates = reorderedImages.map((image, index) => ({
        id: image.id,
        order: index
      }));
      console.log(orderUpdates,'order update')
      Image_Ordering_axios(orderUpdates,setOrderedImages,setIsUpdatingOrder)

      setIsUpdatingOrder(false);
 
      setOrderedImages(prevImages => [...prevImages]);
    
  };

  const handleFileChange = (index, e) => {
    const newImages = [...images];
    newImages[index].file = e.target.files[0];
    setImages(newImages);
  };

  const handleDescriptionChange = (index, e) => {
    const newImages = [...images];
    newImages[index].description = e.target.value;
    setImages(newImages);
  };

  const handleAddMore = () => {
    setImages([...images, { file: null, description: "" }]);
  };

  const handleUpload = async () => {
    try {
      await Image_Upload_axios(images);
      setImages([{ file: null, description: "" }]);
      // Refresh images after upload
      await Get_Image_axios();
    } catch (error) {
      console.error('Failed to upload images:', error);
    }
  };

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    
    if (active.id !== over.id) {
      setOrderedImages((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        const newOrder = arrayMove(items, oldIndex, newIndex);
        
        // Update backend order
        updateImageOrder(newOrder);
        
        return newOrder;
      });
    }
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
        <div className="flex flex-col w-1/2 space-y-2 px-10">
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

          <button
            disabled={!images[images.length - 1].file || !images[images.length - 1].description}
            onClick={handleAddMore}
            className={`py-2 px-4 rounded-lg text-lg font-bold text-white ${
              !images[images.length - 1].file || !images[images.length - 1].description
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-emerald-600 hover:bg-emerald-800"
            }`}
          >
            Add More
          </button>

          <button
            disabled={!images[0].file || !images[0].description || isUpdatingOrder}
            onClick={handleUpload}
            className={`py-2 px-4 rounded-lg text-lg font-bold text-white ${
              !images[0].file || !images[0].description || isUpdatingOrder
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-emerald-600 hover:bg-emerald-800"
            }`}
          >
            Upload
          </button>
        </div>
      )}

      {orderedImages && orderedImages.length > 0 && (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={orderedImages.map(item => item.id)}
            strategy={rectSortingStrategy}
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 p-10 rounded-lg border-2 border-gray-300 m-10">
              {orderedImages.map((data) => (
                <SortableImage
                  key={data.id}
                  id={data.id}
                  image={Backend_URl + data.image}
                  description={data.descriptions}
                  isUpdatingOrder={isUpdatingOrder}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}
    </div>
  );
};

export default Home_main;