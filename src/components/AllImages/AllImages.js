import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { AuthContext } from "../../contexts/AuthProvider";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import EachImage from "../EachImage/EachImage";
const AllImages = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { user } = useContext(AuthContext);
  // console.log(user?.email)
  const imageHostKey = process.env.REACT_APP_imgbb_key;
  const navigate = useNavigate();
  // const { data: image, isLoading } = useQuery({
  //     queryKey: ["email"],
  //     queryFn: async () => {
  //       const res = await fetch(
  //         "https://memoralbum-server.vercel.app/users"
  //       );
  //       const data = await res.json();
  //       return data;
  //     },
  //   });

  const handleAddImage = (data, event) => {
    const form = event.target;

    const image = data.image[0];
    const formData = new FormData();
    formData.append("image", image);
    const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imageData) => {
        if (imageData.success) {
          console.log(imageData);
          const imageInfo = {
            email: user?.email,
            title: data?.title,
            image: imageData?.data?.url,
          };
          //save image information to the database
          fetch(`https://memoralbum-server.vercel.app/images`, {
            method: "POST",
            headers: {
              "content-type": "application/json",
              // authorization: `bearer ${localStorage.getItem("accessToken")}`,
            },
            body: JSON.stringify(imageInfo),
          })
            .then((res) => res.json())
            .then((result) => {
              toast.success(`image is added successfully!`);
              form.reset();
              navigate("/images");
            });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  return (
    <div>
      <form className="mb-16 p-2" onSubmit={handleSubmit(handleAddImage)}>
        <div className="">
          <input
            {...register("image", {
              required: "Image is Required",
            })}
            type="file"
            className="file-input file-input-bordered file-input-primary w-full max-w-xs"
          />
          {errors.image && (
            <p className="text-red-500">{errors.image.message}</p>
          )}
        </div>
        <div className="mt-5">
          <input
            {...register("title", {
              required: "Title is required",
            })}
            type="text"
            className="p-2  border border-primary w-full max-w-xs"
            placeholder="Title"
          />
          {errors.title && (
            <p className="text-red-500">{errors.title.message}</p>
          )}
        </div>
        <input
          className="btn btn-primary w-full mt-4 max-w-xs "
          value="Upload"
          type="submit"
        />
      </form>
      <div className="p-5">
        <EachImage></EachImage>
      </div>
    </div>
  );
};

export default AllImages;
