import React, { useState, useEffect } from "react";
import Toast from "./../LoadingError/Toast";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  editProduct,
  updateProduct,
} from "./../../Redux/Actions/ProductActions";
import { PRODUCT_UPDATE_RESET } from "../../Redux/Constants/ProductConstants";
import { toast } from "react-toastify";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};

const EditProductMain = (props) => {
  const { productId } = props;

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [image4, setImage4] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState("");
  const [categories2, setCategories2] = useState("");
  const [categories3, setCategories3] = useState("");
  const [catTotal, setCatTotal] = useState([]);

  const dispatch = useDispatch();

  const productEdit = useSelector((state) => state.productEdit);
  const { loading, error, product } = productEdit;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      toast.success("Product Updated", ToastObjects);
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(editProduct(productId));
      } else {
        setName(product.name);
        setDescription(product.description);
        setCountInStock(product.countInStock);
        setImage(product.image[0]);
        setImage2(product.image[1]);
        setImage3(product.image[2]);
        setImage4(product.image[3]);
        setPrice(product.price);
        setCategories(product.categories[0]);
        setCategories2(product.categories[1]);
        setCategories3(product.categories[2]);
      }
    }
  }, [product, dispatch, productId, successUpdate]);

  const array = [image, image2, image3, image4];
  const filteredArray = array.filter(Boolean);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        description,
        image: filteredArray,
        countInStock,
        categories: [categories, categories2, categories3],
      })
    );
  };

  return (
    <>
      <Toast />
      <section className="content-main" style={{ maxWidth: "1200px" }}>
        <form onSubmit={submitHandler}>
          <div className="content-header">
            <Link to="/products" className="btn btn-danger text-white">
              Go to products
            </Link>
            <h2 className="content-title">Update Product</h2>
            <div>
              <button type="submit" className="btn btn-primary">
                Publish now
              </button>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-xl-8 col-lg-8">
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  {errorUpdate && (
                    <Message variant="alert-danger">{errorUpdate}</Message>
                  )}
                  {loadingUpdate && <Loading />}
                  {loading ? (
                    <Loading />
                  ) : error ? (
                    <Message variant="alert-danger">{error}</Message>
                  ) : (
                    <>
                      <div className="mb-4">
                        <label htmlFor="product_title" className="form-label">
                          Product title
                        </label>
                        <input
                          type="text"
                          placeholder="Type here"
                          className="form-control"
                          id="product_title"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="product_title" className="form-label">
                          Categories
                        </label>
                        <input
                          type="text"
                          placeholder="Type here"
                          className="form-control"
                          id="product_title"
                          // required
                          value={categories}
                          onChange={(e) => setCategories(e.target.value)}
                        />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="product_title" className="form-label">
                          Categories2
                        </label>
                        <input
                          type="text"
                          placeholder="Type here"
                          className="form-control"
                          id=""
                          // required
                          value={categories2}
                          onChange={(e) => setCategories2(e.target.value)}
                        />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="product_title" className="form-label">
                          Categories3
                        </label>
                        <input
                          type="text"
                          placeholder="Type here"
                          className="form-control"
                          id=""
                          // required
                          value={categories3}
                          onChange={(e) => setCategories3(e.target.value)}
                        />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="product_price" className="form-label">
                          Price
                        </label>
                        <input
                          type="number"
                          placeholder="Type here"
                          className="form-control"
                          id="product_price"
                          required
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                        />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="product_price" className="form-label">
                          Count In Stock
                        </label>
                        <input
                          type="number"
                          placeholder="Type here"
                          className="form-control"
                          id="product_price"
                          required
                          value={countInStock}
                          onChange={(e) => setCountInStock(e.target.value)}
                        />
                      </div>
                      <div className="mb-4">
                        <label className="form-label">Description</label>
                        <textarea
                          placeholder="Type here"
                          className="form-control"
                          rows="7"
                          // required
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                      </div>
                      <div className="mb-4">
                        <label className="form-label">Images1</label>
                        <input
                          className="form-control"
                          type="text"
                          value={image}
                          // required
                          onChange={(e) => setImage(e.target.value)}
                        />
                        <div className="d-flex justify-content-end mt-2">
                          <img
                            src={image}
                            alt=""
                            style={{ maxWidth: "10rem" }}
                          />
                        </div>
                      </div>
                      <div className="mb-4">
                        <label className="form-label">Images2</label>
                        <input
                          className="form-control"
                          type="text"
                          value={image2}
                          // required
                          onChange={(e) => setImage2(e.target.value)}
                        />
                        <div className="d-flex justify-content-end mt-2">
                          <img
                            src={image2}
                            alt=""
                            style={{ maxWidth: "10rem" }}
                          />
                        </div>
                      </div>
                      <div className="mb-4">
                        <label className="form-label">Images3</label>
                        <input
                          className="form-control"
                          type="text"
                          value={image3}
                          // required
                          onChange={(e) => setImage3(e.target.value)}
                        />
                        <div className="d-flex justify-content-end mt-2">
                          <img
                            src={image3}
                            alt=""
                            style={{ maxWidth: "10rem" }}
                          />
                        </div>
                      </div>
                      <div className="mb-4">
                        <label className="form-label">Images4</label>
                        <input
                          className="form-control"
                          type="text"
                          value={image4}
                          // required
                          onChange={(e) => setImage4(e.target.value)}
                        />
                        <div className="d-flex justify-content-end mt-2">
                          <img
                            src={image4}
                            alt=""
                            style={{ maxWidth: "10rem" }}
                          />
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default EditProductMain;
