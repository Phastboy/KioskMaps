'use client';

import dynamic from "next/dynamic"; // Importing dynamic from next/dynamic for dynamic component import
import { useState } from "react"; // Importing useState hook from React for state management

import useCountries from "@/app/hooks/useCountries"; // Importing useCountries hook for country data handling
import { SafeUser } from "@/app/types"; // Importing SafeUser type from app types

const Map = dynamic(() => import('../Map'), { 
  ssr: false // Dynamic import configuration to disable server-side rendering for Map component
});

interface ListingInfoProps {
  user: SafeUser; // SafeUser object representing listing owner
  description: string; // Description of the listing
  vendingMachine: string; // String representing vending machine details
  locationValue: string; // Location value for fetching coordinates
}

// ListingInfo component displaying listing information
const ListingInfo: React.FC<ListingInfoProps> = ({
  user,
  description,
  vendingMachine,
  locationValue,
}) => {
  const { getByValue } = useCountries(); // Accessing country data using useCountries hook
  const coordinates = getByValue(locationValue)?.latlng; // Fetching coordinates based on locationValue

  const [vendingMachines, setVendingMachines] = useState<string[]>([]); // State for managing vending machine list
  const [inputValue, setInputValue] = useState<string>(""); // State for managing input value

  // Function to add a new vending machine to the list
  const addVendingMachine = () => {
    if (inputValue.trim()) {
      setVendingMachines([...vendingMachines, inputValue.trim()]); // Adding trimmed input value to vendingMachines array
      setInputValue(""); // Clearing input value after adding
    }
  };

  return ( 
    <div className="col-span-4 flex flex-col gap-8"> {/* Flex container for listing information */}
      <div className="flex flex-col gap-2">
        <div 
          className="
            text-xl 
            font-semibold 
            flex 
            flex-row 
            items-center
            gap-2
          "
        >
          <div>Owner {user?.name}</div> {/* Displaying listing owner's name */}
        </div>
        <div className="flex flex-col gap-4 font-light text-neutral-500">
          <div>
            {vendingMachines.length > 0 && (
              <ul className="list-disc pl-5">
                {vendingMachines.map((machine, index) => (
                  <li key={index}>{machine}</li> // Mapping and displaying each vending machine
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
      <hr /> {/* Horizontal rule */}
      <div className="text-lg font-light text-neutral-500">
        {description} {/* Displaying listing description */}
      </div>
      <hr /> {/* Horizontal rule */}
      <Map center={coordinates} /> {/* Displaying Map component with center coordinates */}
    </div>
  );
}

export default ListingInfo; // Exporting ListingInfo component
