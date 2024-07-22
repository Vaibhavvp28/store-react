import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { Tooltip, Button } from "@material-tailwind/react";
import { addtoCart } from "../../features/slices/cartSlice";
import Cart from "../Cart/Cart";

const SingleProduct = () => {
  const product = useSelector((state) => state.products.singleProduct);
  const { id } = useParams();

  const productSize = product[0].size ? product[0].size[0] : "";
  const [size, setSize] = useState(productSize);

  const productColor = product[0].color[0];
  const [color, setColor] = useState(productColor);

  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const totalAmount = useSelector((state) => state.cart.totalAmount);

  return (
    <div>
      <div className="bg-black p-2 w-full flex justify-center items-center gap-5 h-12 ">
        <Link to={"/"}>
          <h3 className="text-white font-inter text-xl font-bold text-center cursor-pointer">
            Home
          </h3>
        </Link>
        <div
          className="flex flex-row items-center cursor-pointer"
          onClick={handleOpen}
        >
          {totalAmount > 0 ? (
            <span
              className="rounded-full bg-gray-300 px-2
            font-inter text-sm mr-1"
            >
              {totalAmount}
            </span>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="#FFF"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>
          )}

          <p className="font-inter text-base font-medium text-center text-white ">
            Shopping Bag
          </p>
          <div>{open && <Cart openModal={open} setOpen={setOpen}></Cart>}</div>
        </div>
      </div>
      {product
        .filter((product) => product.id === id)
        .map((item, index) => {
          return (
            <div key={index} className="flex justify-center items-center py-10">
              <div className="pl-44 grow-[2]">
                <img
                  className="h-[650px] rounded-lg"
                  src={item.img}
                  alt={item.name}
                />
              </div>
              <div className="grow-[3]">
                <div className="max-w-lg">
                  <h5 className="text-2xl font-inter font-bold tracking-normal leading-none pb-4">
                    {item.name}
                  </h5>
                  <p className="text-orange-500 text-xl font-inter font-bold tracking-normal leading-none">
                    15% OFF
                  </p>
                  <p className="text-gray-500 text-xl font-inter font-bold tracking-normal pt-2">
                    {item.text}
                  </p>
                  <div className="pb-4">
                    {item.size ? (
                      <div className="pt-10">
                        <label
                          htmlFor="size"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Pick a Size
                        </label>
                        <select
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          name="size"
                          id="size"
                          value={size}
                          onChange={(e) => setSize(e.target.value)}
                        >
                          {item.size.map((item, index) => {
                            return <option key={index}>{item}</option>;
                          })}
                        </select>
                      </div>
                    ) : (
                      <div className="">
                        <label
                          htmlFor="size"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Pick a Size
                        </label>
                        <select
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          name="size"
                          id="size"
                          disabled={true}
                          value={size}
                          onChange={(e) => setSize(e.target.value)}
                        >
                          {item.size?.map((item, index) => {
                            return <option key={index}>{item}</option>;
                          })}
                        </select>
                      </div>
                    )}
                  </div>

                  <div className="pb-4">
                    <label
                      htmlFor="color"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Pick a Colour
                    </label>
                    <select
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      name="color"
                      id="color"
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                    >
                      {item.color.map((color, index) => {
                        return <option key={index}>{color}</option>;
                      })}
                    </select>
                  </div>
                  <Tooltip content="Add to Cart" placement="bottom">
                    <Button
                      color="gray"
                      size="lg"
                      variant="outlined"
                      ripple={true}
                      onClick={() =>
                        dispatch(
                          addtoCart({
                            id: item.id,
                            name: item.name,
                            img: item.img,
                            text: item.text,
                            size: size,
                            color: color,
                            price: item.price,
                            amount: 1,
                            totalPrice: item.price,
                          })
                        )
                      }
                    >
                      Add to Cart
                    </Button>
                  </Tooltip>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default SingleProduct;
