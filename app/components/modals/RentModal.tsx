"use client"
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { FieldValues, SubmitHandler, useForm, useFieldArray } from 'react-hook-form';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';

import useRentModal from '@/app/hooks/useRentModal';

import Modal from './Modal';
import CountrySelect from '../inputs/CountrySelect';
import ImageUpload from '../inputs/ImageUpload';
import Input from '../inputs/Input'; 
import Heading from '../Heading';

// Enum for steps in the modal
enum STEPS {
  LOCATION = 0,
  INFO = 1,
  IMAGES = 2,
  DESCRIPTION = 3,
}

// Interface for product details
interface Product {
  productName: string;
 quantity: string;
  price: string;
}

const RentModal = () => {
  const router = useRouter();
  const rentModal = useRentModal();

  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(STEPS.LOCATION);
  // Form setup using react-hook-form
  const {
    register,
    handleSubmit,
    setValue,
    control,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      vendingMachine: '',
      location: null,
      imageSrc: '',
      title: '',
      description: '',
      products: [] as Product[], 
    },
  });
 // Field array setup for dynamic product fields
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'products',
  });

  const location = watch('location');
  const vendingMachine = watch('vendingMachine');
  const imageSrc = watch('imageSrc');
 // Dynamic import of the Map component
  const Map = useMemo(() => dynamic(() => import('../Map'), { ssr: false }), [location]);
 // Custom value setter for form fields
  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.DESCRIPTION) {
      return onNext();
    }

    setIsLoading(true);

 
    const productsDescription = data.products.map((product: Product) => {
      return `${product.productName} -quantity: ${product.quantity}, Price: ${product.price}`;
    }).join('\n');


    const updatedData = {
      ...data,
      description: productsDescription,
    };
 // API call to submit the form data
    axios
      .post('/api/listings', updatedData)
      .then(() => {
        toast.success('Listing created!');
        router.refresh();
        reset();
        setStep(STEPS.LOCATION);
        rentModal.onClose();
      })
      .catch(() => {
        toast.error('Something went wrong.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleAddProduct = () => {
    append({
      productName: '',
     quantity: '',
      price: '',
    });
  };

  const handleRemoveProduct = (index: number) => {
    remove(index);
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.DESCRIPTION) {
      return 'Create';
    }

    return 'Next';
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.LOCATION) {
      return undefined;
    }

    return 'Back';
  }, [step]);
// Content for each step in the modal
  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading title="Where is your place located?" subtitle="Help customers find you!" />
      <CountrySelect value={location} onChange={(value) => setCustomValue('location', value)} />
      <Map center={location?.latlng} />
    </div>
  );

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
       <Heading title="How would you describe your place?" subtitle="Short and sweet works best!" />
        <Input id="title" label="Title" disabled={isLoading} register={register} errors={errors} required />
        <hr />
        <Input id="description" label="Description" disabled={isLoading} register={register} errors={errors} required />
        </div>
    );
  }

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="Add a photo of your place" subtitle="Show guests what your place looks like!" />
        <ImageUpload onChange={(value) => setCustomValue('imageSrc', value)} value={imageSrc} />
      </div>
    );
  }

  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
         
        <Heading  title="Add Products" subtitle="Enter details for each product" />
        {fields.map((product, index) => (
          <div key={product.id} className="flex flex-col gap-4 ">
            <Input
              id={`products[${index}].productName`}
              label="Product Name"
              disabled={isLoading}
              register={register}
              errors={errors}
              required
            />
            <Input
              id={`products[${index}].quantity`}
              label="Quantity"
              disabled={isLoading}
              register={register}
              errors={errors}
              required
            />
            <Input
              id={`products[${index}].price`}
              label="Price"
              disabled={isLoading}
              register={register}
              errors={errors}
              required
            />
           <button
  className="bg-black hover:bg-gray-800 text-white py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
  type="button"
  onClick={() => handleRemoveProduct(index)}
>
  Remove Product
</button>

          </div>
        ))}
        <button
  className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
  type="button"
  onClick={handleAddProduct}
>
  Add Product
</button>

      </div>
    );
  }

  return (
    <Modal
      disabled={isLoading}
      isOpen={rentModal.isOpen}
      title="KioskMaps"
      actionLabel={actionLabel}
      onSubmit={handleSubmit(onSubmit)}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
      onClose={rentModal.onClose}
      body={bodyContent}
    />
  );
};

export default RentModal;
