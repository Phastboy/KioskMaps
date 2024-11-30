'use client';

import qs from 'query-string';
import dynamic from 'next/dynamic'
import { useCallback, useMemo, useState } from "react";
import { useRouter, useSearchParams } from 'next/navigation';

import useSearchModal from "@/app/hooks/useSearchModal";

import Modal from "./Modal";
import CountrySelect, { 
  CountrySelectValue
} from "../inputs/CountrySelect";
import Heading from '../Heading';

// Enum for steps in the modal
enum STEPS {
  LOCATION = 0,
}

const SearchModal = () => {
  const router = useRouter();
  const searchModal = useSearchModal();
  const params = useSearchParams();

  const [step, setStep] = useState(STEPS.LOCATION);

  const [location, setLocation] = useState<CountrySelectValue>();

  // Dynamic import of the Map component
  const Map = useMemo(() => dynamic(() => import('../Map'), { 
    ssr: false 
  }), [location]);

  // Function to move to the previous step
  const onBack = useCallback(() => {
    setStep((value) => value - 1);
  }, []);

  // Function to move to the next step
  const onNext = useCallback(() => {
    setStep((value) => value + 1);
  }, []);

  // Submit handler for the search form
  const onSubmit = useCallback(async () => {
    let currentQuery = {};

    // Parse current URL query parameters
    if (params) {
      currentQuery = qs.parse(params.toString())
    }

    // Update query parameters with the selected location
    const updatedQuery: any = {
      ...currentQuery,
      locationValue: location?.value,
    };

    // Construct the new URL with updated query parameters
    const url = qs.stringifyUrl({
      url: '/',
      query: updatedQuery,
    }, { skipNull: true });

    // Reset the step and close the modal
    setStep(STEPS.LOCATION);
    searchModal.onClose();
    // Navigate to the new URL
    router.push(url);
  }, 
  [
    step, 
    searchModal, 
    location, 
    router, 
    onNext,
    params
  ]);

  // Label for the primary action button
  const actionLabel = useMemo(() => {
    return 'Next'
  }, [step]);

  // Label for the secondary action button
  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.LOCATION) {
      return undefined
    }

    return 'Back'
  }, [step]);

  // Content for the location step
  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Where do you want to search?"
        subtitle="Find the location!"
      />
      <CountrySelect 
        value={location} 
        onChange={(value) => 
          setLocation(value as CountrySelectValue)} 
      />
      <hr />
      <Map center={location?.latlng } />
    </div>
  )

  return (
    <Modal
      isOpen={searchModal.isOpen}
      title="Filters"
      actionLabel={actionLabel}
      onSubmit={onSubmit}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
      onClose={searchModal.onClose}
      body={bodyContent}
    />
  );
}

export default SearchModal;
