import React, { useEffect, useState } from "react";
import useUser from "../Hooks/useUser";
import { useSelector } from "react-redux";
import { Backend_URl, Image_upload_URL } from "../Utils/Constance";
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
import { SortableImage } from "./SortableImage";
import ImageDeleteModal from "./ImageDeleteModal";
import EditImageModal from "./EditImageModal";

const Home_main = () => {
  const [images, setImages] = useState([{ file: null, description: "" }]);
  const [newImage, setNewImage] = useState(false);
  const {
    Image_Upload_axios,
    Get_Image_axios,
    Image_Ordering_axios,
    Image_Delete_axios,
  } = useUser();
  const userimages = useSelector((state) => state.userdata.images);
  const [orderedImages, setOrderedImages] = useState([]);
  const [isUpdatingOrder, setIsUpdatingOrder] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [ErrorMessage, setErrorMessages] = useState("");
  const [CurrentSelectImage , setCurrentEditImage] = useState("")

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
        order: img.order || index,
      }));
      const sortedImages = [...processedImages].sort(
        (a, b) => a.order - b.order
      );
      setOrderedImages(sortedImages);
    }
  }, [userimages]);

  const updateImageOrder = async (reorderedImages) => {
    setIsUpdatingOrder(true);
    const orderUpdates = reorderedImages.map((image, index) => ({
      id: image.id,
      order: index,
    }));
    await Image_Ordering_axios(orderUpdates);
    setIsUpdatingOrder(false);
    setOrderedImages([...reorderedImages]);
  };

  const handleFileChange = (index, e) => {
    const newImages = [...images];
    const file = e.target.files[0];
    newImages[index].file = file;
    const validImageExtensions = ["jpg", "jpeg", "png", "gif", "webp"];
    console.log(file.name, "file");
    const fileExtension = file.name.split(".").pop().toLowerCase();
    if (
      file.type.startsWith("image/") &&
      validImageExtensions.includes(fileExtension)
    ) {
      setImages(newImages);
      setErrorMessages("");
    } else {

      setErrorMessages(
        "Please select a valid image file (jpg, jpeg, png, gif, webp)."
      );
    }
  };

  const handleDescriptionChange = (index, e) => {

    const description = e.target.value;
    const newImages = [...images];
    
    if (description.trim() === "" && description.length > 0) {
      setErrorMessages("Please enter a valid description.");
      newImages[index].description = "";
      setImages(newImages);
      return;
    } else if (description === "") {
      newImages[index].description = ""
      setErrorMessages("");
    } else {
      setErrorMessages("");
      newImages[index].description = description;
    }
  
    setImages(newImages);
   
  };

  const handleAddMore = () => {
    setImages([...images, { file: null, description: "" }]);
  };

  const handleUpload = async () => {
    try {
      await Image_Upload_axios(Image_upload_URL,images);
      setImages([{ file: null, description: "" }]);
    } catch (error) {
      console.error("Failed to upload images:", error);
    }
  };

  const handleDragEnd = async (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setOrderedImages((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        const newOrder = arrayMove(items, oldIndex, newIndex);
        updateImageOrder(newOrder);
        return newOrder;
      });
    }
  };

  const handleDeleteImage = (image) => {
    setSelectedImage(image);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedImage(null);
  };

  const handleConfirmDelete = async () => {
    if (selectedImage) {
      Image_Delete_axios(selectedImage);
    }
    handleCloseDeleteModal();
  };

  const handleEditImage = (image) => {

    setCurrentEditImage(image);
    setShowEditModal(true);

  };
  
  const handleCloseEditImage = ()=>{
   setCurrentEditImage(null)
   setShowEditModal(false)

  }

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
            <div key={index} className=" space-y-2 flex flex-col ">
              <input
                type="file"
                onChange={(e) => handleFileChange(index, e)}
                className="py-2 px-4 border-2 border-gray-500 rounded-lg"
                accept="image/*"
              />
              <input
                type="text"
                value={image.description}
                onChange={(e) => handleDescriptionChange(index, e)}
                className="py-3 px-4 border-2 border-gray-500 rounded-lg font-semibold"
                placeholder="Description"
              />
              <p className="text-center text-red-600 text-sm font-semibold">
                {ErrorMessage && ErrorMessage}
              </p>
            </div>
          ))}
          <div className="flex w-full space-x-4 ">
            <button
              disabled={
                !images[images.length - 1].file ||
                !images[images.length - 1].description
              }
              onClick={handleAddMore}
              className={`py-2 px-4 rounded-lg w-1/2 text-lg font-bold text-white ${
                !images[images.length - 1].file ||
                !images[images.length - 1].description
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-emerald-600 hover:bg-emerald-800"
              }`}
            >
              Add More
            </button>

            <button
              disabled={
                !images[0].file || !images[0].description || isUpdatingOrder
              }
              onClick={handleUpload}
              className={`py-2 px-4 rounded-lg w-1/2 text-lg font-bold text-white ${
                !images[0].file || !images[0].description || isUpdatingOrder
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-emerald-600 hover:bg-emerald-800"
              }`}
            >
              Upload
            </button>
          </div>
        </div>
      )}

      {orderedImages && orderedImages.length > 0 && (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={orderedImages.map((item) => item.id)}
            strategy={rectSortingStrategy}
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 p-10 rounded-lg border-2 border-gray-300 m-10">
              {orderedImages.map((data) => (
                <SortableImage
                  key={data.id}
                  id={data.id}
                  image={Backend_URl + data.image}
                  description={data.descriptions}
                  onEdit={() => handleEditImage(data)}
                  onDelete={() => handleDeleteImage(data)}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}

      {showDeleteModal && (
        <ImageDeleteModal
          isOpen={showDeleteModal}
          onClose={handleCloseDeleteModal}
          onConfirm={handleConfirmDelete}
        />
      )}

      {showEditModal && (
        <EditImageModal
        isOpen={showEditModal}
        onClose = {handleCloseEditImage}
        initialImage = {CurrentSelectImage}
        initialDescription ={CurrentSelectImage.descriptions}
        />
      )}
    </div>
  );
};

export default Home_main;
