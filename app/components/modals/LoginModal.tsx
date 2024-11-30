'use client';

import { useCallback, useState } from "react"; // Importing useCallback and useState hooks from React for state management
import { toast } from "react-hot-toast"; // Importing toast notification from react-hot-toast
import { signIn } from 'next-auth/react'; // Importing signIn function from next-auth/react for authentication
import { 
  FieldValues, 
  SubmitHandler, 
  useForm
} from "react-hook-form"; // Importing useForm, SubmitHandler, and FieldValues from react-hook-form for form handling
import { FcGoogle } from "react-icons/fc"; // Importing FcGoogle icon from react-icons/fc
import { useRouter } from "next/navigation"; // Importing useRouter hook from next/navigation for routing

import useRegisterModal from "@/app/hooks/useRegisterModal"; // Importing useRegisterModal custom hook for registration modal handling
import useLoginModal from "@/app/hooks/useLoginModal"; // Importing useLoginModal custom hook for login modal handling

import Modal from "./Modal"; // Importing Modal component for rendering modal
import Input from "../inputs/Input"; // Importing Input component for rendering form inputs
import Heading from "../Heading"; // Importing Heading component for rendering modal heading
import Button from "../Button"; // Importing Button component for rendering buttons

// LoginModal component for rendering the login modal
const LoginModal = () => {
  const router = useRouter(); // Initializing useRouter hook for accessing router object
  const loginModal = useLoginModal(); // Using useLoginModal hook for managing login modal state
  const registerModal = useRegisterModal(); // Using useRegisterModal hook for managing register modal state
  const [isLoading, setIsLoading] = useState(false); // State variable for loading state

  const { 
    register, // Register function from useForm for registering form inputs
    handleSubmit, // handleSubmit function from useForm for handling form submission
    formState: {
      errors, // Errors object from useForm for handling form errors
    },
  } = useForm<FieldValues>({ // Initializing useForm hook with FieldValues generic type
    defaultValues: {
      email: '',
      password: ''
    },
  });
  
  // Function to handle form submission
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true); // Setting loading state to true during form submission

    signIn('credentials', { 
      ...data, // Passing form data to signIn function
      redirect: false,
    })
    .then((callback) => {
      setIsLoading(false); // Resetting loading state after authentication callback

      if (callback?.ok) { // Handling success callback
        toast.success('Logged in'); // Showing success toast notification
        router.refresh(); // Refreshing the page after successful login
        loginModal.onClose(); // Closing login modal after successful login
      }
      
      if (callback?.error) { // Handling error callback
        toast.error(callback.error); // Showing error toast notification
      }
    });
  }

  // Function to toggle between login and register modals
  const onToggle = useCallback(() => {
    loginModal.onClose(); // Closing login modal
    registerModal.onOpen(); // Opening register modal
  }, [loginModal, registerModal]);

  // JSX for modal body content
  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Welcome back"
        subtitle="Login to your account!"
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

  // JSX for modal footer content
  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr /> {/* Horizontal rule */}
      <Button 
        outline 
        label="Continue with Google"
        icon={FcGoogle} // Google icon for button
        onClick={() => signIn('google')} // Handling Google sign-in
      />
      
      <div className="text-neutral-500 text-center mt-4 font-light">
        <p>First time using KioskMaps?
          <span 
            onClick={onToggle} // Click handler to toggle between login and register modals
            className="text-neutral-800 cursor-pointer hover:underline"
          > Create an account</span>
        </p>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading} // Disabling modal interaction when loading
      isOpen={loginModal.isOpen} // Checking if login modal is open
      title="Login" // Setting modal title
      actionLabel="Continue" // Setting action button label
      onClose={loginModal.onClose} // Handling modal close action
      onSubmit={handleSubmit(onSubmit)} // Handling form submission
      body={bodyContent} // Passing body content JSX to modal
      footer={footerContent} // Passing footer content JSX to modal
    />
  );
}

export default LoginModal; // Exporting LoginModal component
