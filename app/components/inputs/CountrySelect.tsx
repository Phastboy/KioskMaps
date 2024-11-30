'use client';

import Select from 'react-select'; // Importing Select component from react-select library
import useCountries from '@/app/hooks/useCountries'; // Importing useCountries hook

export type CountrySelectValue = {
  flag: string; // Flag representing the country
  label: string; // Label for displaying country name
  latlng: number[]; // Latitude and longitude coordinates
  region: string; // Region or area of the country
  value: string; // Value representing the country
  country: string; // Country name
  postalCode: string; // Postal code
  city: string; // City name
  street: string; // Street name
  nr: string; // Number or address
  latitude: number; // Latitude coordinate
  longitude: number; // Longitude coordinate
};

interface CountrySelectProps {
  value?: CountrySelectValue; // Optional selected value
  onChange: (value: CountrySelectValue) => void; // Function to handle value change
}

// CountrySelect component for selecting countries with additional details
const CountrySelect: React.FC<CountrySelectProps> = ({ value, onChange }) => {
  const { getAll } = useCountries(); // Using useCountries hook to get all countries

  return (
    <div>
      <Select
        placeholder="Anywhere" // Placeholder text when no option is selected
        isClearable // Option to clear selected value
        options={getAll()} // Options for the Select component, retrieved using useCountries hook
        value={value} // Selected value
        onChange={(value) => onChange(value as CountrySelectValue)} // Handling value change with onChange function
        formatOptionLabel={(option: any) => (
          <div className="flex flex-col">
            <div className="flex flex-row items-center gap-3">
              <div>{option.flag}</div> {/* Displaying country flag */}
              <div>
                {option.label},
                <span className="text-neutral-500 ml-1">
                  {option.region} {/* Displaying country name and region */}
                </span>
              </div>
            </div>
            <div className="text-neutral-500 text-sm">
              {option.street} {option.nr}, {option.postalCode} {option.city} {/* Displaying address details */}
            </div>
          </div>
        )}
        classNames={{ // Customizing Select component styles
          control: () => 'p-3 border-2', // Styling for control element
          input: () => 'text-lg', // Styling for input element
          option: () => 'text-lg', // Styling for option elements
        }}
        theme={(theme) => ({ // Customizing Select component theme
          ...theme,
          borderRadius: 6, // Setting border radius
          colors: {
            ...theme.colors,
            primary: 'black', // Setting primary color
            primary25: '#ffe4e6', // Setting color for hover and focus
          },
        })}
      />
    </div>
  );
};

export default CountrySelect; // Exporting CountrySelect component
