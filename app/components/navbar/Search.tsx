'use client';

import { BiSearch } from 'react-icons/bi';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import useSearchModal from '@/app/hooks/useSearchModal';
import useCountries from '@/app/hooks/useCountries'; 

const Search = () => {
  const searchModal = useSearchModal();
  const params = useSearchParams();
  const { getByValue } = useCountries();

  const locationValue = params?.get('locationValue');

  const locationLabel = useMemo(() => {
    if (locationValue) {
      const value = getByValue(locationValue as string);
      if (value) {
        return value.label;
      }
    }
  
    return 'Anywhere';
  }, [locationValue, getByValue]);

  return (
    <div className="flex items-center justify-end md:justify-end">
      <button
        onClick={searchModal.onOpen}
        className="flex items-center bg-white border border-black rounded-lg px-4 py-2 md:px-8 cursor-pointer hover:bg-gray-200 focus:outline-none"
      >
        <BiSearch className="text-black" size={24} />
        <span className="text-black font-medium ">{locationLabel}</span>
      </button>
    </div>
  );
};

export default Search;
