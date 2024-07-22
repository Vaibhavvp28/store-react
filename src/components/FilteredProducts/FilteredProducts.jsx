import React from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import ProductCard from "./ProductCard";

const FilteredProducts = () => {
  const filteredProducts = useSelector(
    (state) => state.products.filteredProducts
  );
  const { type } = useParams();
  return (
    <div>
      <div className="bg-black p-2 w-full">
        <Link to={"/"}>
          <h3 className="text-white font-inter text-xl font-bold tracking-normal leading-none text-center cursor-pointer">
            Home
          </h3>
        </Link>
      </div>
      <div className="pt-16">
        <div className="pl-14">
          <h1 className="text-4xl font-inter font-bold text-black tracking-normal leading-none">
            {type}
          </h1>
        </div>
        <div className="grid grid-cols-4 justify-center py-8 gap-12">
          {filteredProducts
            .filter((product) => product.type === type)
            .map((product, index) => {
              return (
                <div key={index}>
                  <ProductCard
                    id={product.id}
                    name={product.name}
                    text={product.text}
                    img={product.img}
                    price={product.price}
                    colors={product.color}
                  ></ProductCard>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default FilteredProducts;
