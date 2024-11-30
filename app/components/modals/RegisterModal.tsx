'use client';

import axios from "axios";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import { 
  FieldValues, 
  SubmitHandler,
  useForm
} from "react-hook-form";

import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";

import Modal from "./Modal"; // Importing the Modal component
import Input from "../inputs/Input"; // Importing the Input component
import Heading from "../Heading"; // Importing the Heading component
import Button from "../Button"; // Importing the Button component

const RegisterModal = () => {
  const registerModal = useRegisterModal(); // Using the custom hook for register modal
  const loginModal = useLoginModal(); // Using the custom hook for login modal
  const [isLoading, setIsLoading] = useState(false); // State for loading state during registration

  const { 
    register, 
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: ''
    },
  });

  // Function to handle form submission for registration
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true); // Set loading state to true during submission

    axios.post('/api/register', data) // Sending registration data to the backend API
      .then(() => {
        toast.success('Registered successfully!'); // Show success message upon successful registration
        registerModal.onClose(); // Close the register modal
        loginModal.onOpen(); // Open the login modal
      })
      .catch((error) => {
        toast.error('Registration failed. Please try again.'); // Show error message if registration fails
        console.error(error); // Log the error to the console
      })
      .finally(() => {
        setIsLoading(false); // Set loading state to false after submission completes (whether success or failure)
      });
  };

  // Callback function to toggle between register and login modals
  const onToggle = useCallback(() => {
    registerModal.onClose(); // Close the register modal
    loginModal.onOpen(); // Open the login modal
  }, [registerModal, loginModal]);

  // Content for the body of the register modal
  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Welcome to KioskMaps"
        subtitle="Create an account!"
      />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  // Content for the footer of the register modal
  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr className="border-neutral-200" />
      <Button 
        outline 
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => signIn('google')} 
        disabled={isLoading} // Disable Google sign-in button if loading state is true
      />
      <div className="text-neutral-500 text-center mt-4 font-light">
        <p>Already have an account?
          <span 
            onClick={onToggle} 
            className="text-neutral-800 cursor-pointer hover:underline"
          >
            Log in
          </span>
        </p>
      </div>
    </div>
  );

  // Render the register modal component with defined props and content
  return (
    <Modal
      disabled={isLoading} // Pass loading state to disable interaction with the modal
      isOpen={registerModal.isOpen} // Pass modal open state from custom hook
      title="Register" // Title for the register modal
      actionLabel="Continue" // Label for the primary action button
      onClose={registerModal.onClose} // Function to handle modal close
      onSubmit={handleSubmit(onSubmit)} // Function to handle form submission
      body={bodyContent} // Body content of the modal
      footer={footerContent} // Footer content of the modal
    />
  );
};

export default RegisterModal;
