import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import BeatLoader from "react-spinners/BeatLoader";
import * as Yup from "yup";
import useFetch from "../hooks/use-fetch";
import {  signup } from "@/db/apiAuth";
import ErrorMessage from "./ErrorMessage";
import { useNavigate, useSearchParams } from "react-router-dom";
import { UrlState } from "@/context";

const SignUp = () => {
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    profilepic: null,
  });

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const longLink = searchParams.get("createNew");

  const handleInputChange = (e) => {
    const { name, value,files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] :  value,
    }));
  };

  const { data, loading, error, fn: fnSignup } = useFetch(signup);
  const { fetchUser } = UrlState();
  useEffect(() => {
    if (error === null && data) {
      navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`);
      fetchUser();
    }
  });

  const handleSignUp = async () => {
    setErrors({});
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        email: Yup.string()
          .email("Invalid email")
          .required("Email is required"),
        password: Yup.string()
          .min(6, "Password must be at least 6 characters")
          .required("Password is required"),
        profilepic: Yup.mixed().required("Profile picture is required"),
      });
      await schema.validate(formData, { abortEarly: false });

      // API Call after validation
      await fnSignup(formData);
    } catch (e) {
      const newErrors = {};
      e?.inner?.forEach((err) => {
        newErrors[err.path] = err.message;
      });
      setErrors(newErrors);
    }
  };

  // Redirect on success
  if (data) {
    navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>SignUp</CardTitle>
        <CardDescription>Create an account to get started</CardDescription>
        {error && <ErrorMessage message={error} />}
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-1">
          <Input
            name="name"
            placeholder="Enter Name"
            type="name"
            onChange={handleInputChange}
          />
          {errors.name && <ErrorMessage message={errors.name} />}
        </div>
        <div className="space-y-1">
          <Input
            name="email"
            placeholder="Enter Email"
            type="email"
            onChange={handleInputChange}
          />
          {errors.email && <ErrorMessage message={errors.email} />}
        </div>
        <div className="space-y-1">
          <Input
            name="password"
            placeholder="Enter Password"
            type="password"
            onChange={handleInputChange}
          />
          {errors.password && <ErrorMessage message={errors.password} />}
        </div>
        <div className="space-y-1">
          <Input
            name="profilepic"
            accept="image/*"
            type="file"
            onChange={handleInputChange}
          />
          {errors.profilepic && <ErrorMessage message={errors.profilepic} />}
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSignUp}>
          {loading ? (
            <BeatLoader size={10} color="#36d7b7" />
          ) : (
            "Create Account"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SignUp;