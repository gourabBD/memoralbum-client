import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthProvider";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import { toast } from "react-hot-toast";
const EachImage = () => {
  const [eachImage, setEachImage] = useState([]);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    fetch(`https://memoralbum-server.vercel.app/images/${user?.email}`)
      .then((res) => res.json())
      .then((data) => setEachImage(data.sort((a, b) => a - b)?.reverse()));
  }, [eachImage]);

  const handleDelete = (id) => {
    const proceed = window.confirm(
      "Are you sure, you want to delete this image?"
    );

    if (proceed) {
      fetch(`https://memoralbum-server.vercel.app/images/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount > 0) {
            toast.success(`Image deleted successfully!`);
          }
        });
    }
  };

  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 ">
      {eachImage?.map((each) => (
        <div className="shadow-2xl p-5" key={each?._id}>
          <PhotoProvider>
            <PhotoView src={each?.image}>
              <img
                data-aos="zoom-in"
                className="h-64 w-96 border shadow-xl"
                src={each?.image}
                alt=""
              />
            </PhotoView>
          </PhotoProvider>
          <p className="text-xl text-primary font-semibold text-start">
            {each?.title}
          </p>
          <div className="flex justify-start">
            <button
              onClick={() => handleDelete(each?._id)}
              className="btn btn-outline btn-error btn-xs mt-5 rounded-md"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EachImage;
