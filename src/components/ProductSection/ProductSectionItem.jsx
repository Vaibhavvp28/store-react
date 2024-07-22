import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Tooltip,
  Button,
} from "@material-tailwind/react";
import { useDispatch } from "react-redux";
import { addtoCart } from "../../features/slices/cartSlice";

const ProductSectionItem = ({
  id,
  img,
  name,
  text,
  size,
  price,
  color,
  totalPrice,
}) => {
  const dispatch = useDispatch();
  const defaultSize = size[0];
  const defaultColor = color[0];

  return (
    <div>
      <Card className="w-96 relative">
        <Typography
          variant="h4"
          className="absolute -rotate-45 right-8 z-10 text-red-700 top-8"
        >
          SALE%
        </Typography>
        <CardHeader floated={false} className="h-80">
          <img src={img} alt={name} />
        </CardHeader>
        <CardBody className="text-center">
          <Typography variant="h4" color="blue-gray" className="mb-2">
            {name}
          </Typography>
          <Typography color="blue-gray" className="font-medium" textGradient>
            {text}
          </Typography>
          <div className="flex justify-between items-center pt-4">
            <Typography
              color="blue-gray"
              className="font-medium text-red-700"
              textGradient
            >
              Size left: {defaultSize}
            </Typography>
            <Typography color="blue-gray" className="font-medium" textGradient>
              Color left:{" "}
              <span
                style={{ backgroundColor: defaultColor }}
                className="px-2 rounded-full ml-2"
              ></span>
            </Typography>
          </div>
        </CardBody>
        <CardFooter className="flex justify-center gap-7 pt-2">
          <Tooltip conent="Add to Cart" placement="bottom">
            <Button
              onClick={() =>
                dispatch(
                  addtoCart({
                    id: id,
                    img: img,
                    text: text,
                    amount: 1,
                    price: price,
                    totalPrice: totalPrice,
                    name: name,
                    size: defaultSize,
                    color: defaultColor,
                  })
                )
              }
              size="lg"
              color="gray"
              variant="outlined"
              ripple={true}
            >
              Add to Cart
            </Button>
          </Tooltip>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProductSectionItem;
