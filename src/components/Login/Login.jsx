import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";
import { useDispatch } from "react-redux";
import { login } from "../../features/slices/authSlice";
import { errors } from "../../features/slices/authSlice";

const Login = () => {
  const initailState = {
    name: "",
    password: "",
    image: "",
  };

  const [values, setValues] = useState(initailState);
  const onChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const dispatch = useDispatch();

  return (
    <div className="grid grid-cols-1 items-center justify-items-center h-screen">
      <Card className="w-96">
        <CardHeader
          variant="gradient"
          color="gray"
          className="mb-4 grid h-28 place-items-center"
        >
          <Typography variant="h3" color="white">
            Sign In
          </Typography>
        </CardHeader>
        <CardBody className="flex flex-col gap-4">
          <Input
            label="Name"
            size="lg"
            type="text"
            name="name"
            value={values.name}
            onChange={onChange}
          />
          {errors.name && (
            <p style={{ color: "red", font: "inter", fontSize: "13px" }}>
              *{errors.name}
            </p>
          )}
          <Input
            label="Password"
            size="lg"
            type="password"
            name="password"
            value={values.password}
            onChange={onChange}
          />
          {errors.password && (
            <p style={{ color: "red", font: "inter", fontSize: "13px" }}>
              *{errors.password}
            </p>
          )}
          <Input
            label="Image URL address"
            size="lg"
            type="text"
            name="image"
            value={values.image}
            onChange={onChange}
          />
          <Typography variant="small" className="flex justify-between">
            *Image is optional
          </Typography>
        </CardBody>
        <CardFooter className="pt-0">
          <Button
            onClick={() => dispatch(login(values))}
            variant="gradient"
            fullWidth
          >
            Sign In
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
