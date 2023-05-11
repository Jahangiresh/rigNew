import React, { useEffect } from "react";
import { useFormik } from "formik";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { IMAGE_URL } from "../../constants";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSingleBlog,
  getSingleBlogs,
  getSingleStatus,
  updateBlog,
} from "../../features/blogSlice";
import LoadingBox from "../../components/LoadingBox";
import LangugaeService from "../services/LangugaeService";

const EditBlog = () => {
  const params = useParams();
  const id = params.id;
  const [editortxt, setEditotxt] = useState("");
  const dispatch = useDispatch();
  const blog = useSelector(getSingleBlogs);
  const status = useSelector(getSingleStatus);

  useEffect(() => {
    dispatch(fetchSingleBlog({ id }));
  }, [dispatch, id]);

  const handleOnChange = (e, editor) => {
    setEditotxt(editor.getData());
  };
  const formik = useFormik({
    initialValues: {
      title: "",
      body: "",
      imageFile: "",
      isFeatured: "",
    },
    onSubmit: async (values) => {
      try {
        var req = new FormData();
        req.append("title", values.title);
        req.append("body", editortxt);
        req.append("isFeatured", values.isFeatured);
        req.append("imageFile", values.imageFile);
        req.append("languageCulture", LangugaeService.getCookies());
        dispatch(updateBlog({ req, id }));
      } catch (error) {
        toast.error(error.response.data.Detail);
      }
    },
  });

  if (status === "loading") return <LoadingBox />;

  return (
    <div className="createadvocates">
      <Helmet>
        <title>update blog</title>
      </Helmet>
      <img
        style={{
          width: "150px",
        }}
        src={`${IMAGE_URL}${blog.image && blog.image.filePath}`}
        alt=""
      />
      <div>
        <Toaster />
      </div>
      <form className="createadvocates__forms" onSubmit={formik.handleSubmit}>
        <label className="createadvocates__forms__label mb-2" htmlFor="image">
          şəkil
        </label>
        <input
          className="createadvocates__forms__input"
          id="image"
          name="imageFile"
          accept="image/*"
          type="file"
          onChange={(e) => {
            formik.setFieldValue("imageFile", e.currentTarget.files[0]);
          }}
        />
        <label className="createadvocates__forms__label" htmlFor="title">
          başlıq
        </label>
        <input
          className="createadvocates__forms__input"
          id="title"
          name="title"
          type="text"
          onChange={formik.handleChange}
          defaultValue={blog.title}
        />
        <label className="createadvocates__forms__label" htmlFor="body">
          mövzu
        </label>
        <CKEditor
          editor={ClassicEditor}
          onChange={handleOnChange}
          data={blog.body}
        />
        <label
          className="createadvocates__forms__label"
          htmlFor="isFeatured"
          style={{ paddingTop: "10px" }}
        >
          Seçilmiş
        </label>
        <select
          className="createadvocates__forms__input"
          id="isFeatured"
          name="isFeatured"
          onChange={formik.handleChange}
          defaultValue={blog && blog.isFeatured}
        >
          <option value="true">Hə</option>
          <option value="false">Yox</option>
        </select>
        <button className="createadvocates__forms__button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default EditBlog;
