const customLocations = [
  {
    flag: "🇮🇳", value: 'delhi', label: 'Delhi', latlng: [28.6139, 77.209], region: 'Delhi NCR',
    country: "India", postalCode: "110001", city: "Delhi", street: "Connaught Place", nr: "1"
  },
  {
    flag: "🇮🇳", value: 'gurgaon', label: 'Gurgaon', latlng: [28.4595, 77.0266], region: 'Haryana',
    country: "India", postalCode: "122001", city: "Gurgaon", street: "MG Road", nr: "45"
  },
  {
    flag: "🇮🇳", value: 'noida', label: 'Noida', latlng: [28.5355, 77.3910], region: 'Uttar Pradesh',
    country: "India", postalCode: "201301", city: "Noida", street: "Sector 18", nr: "12"
  },
  {
    flag: "🇮🇳", value: 'faridabad', label: 'Faridabad', latlng: [28.4089, 77.3178], region: 'Haryana',
    country: "India", postalCode: "121001", city: "Faridabad", street: "Sector 15", nr: "22"
  },
  {
    flag: "🇮🇳", value: 'ghaziabad', label: 'Ghaziabad', latlng: [28.6610, 77.2836], region: 'Uttar Pradesh',
    country: "India", postalCode: "201001", city: "Ghaziabad", street: "Raj Nagar", nr: "33"
  },
  {
    flag: "🇮🇳", value: 'greater_noida', label: 'Greater Noida', latlng: [28.4136, 77.5046], region: 'Uttar Pradesh',
    country: "India", postalCode: "201310", city: "Greater Noida", street: "Knowledge Park", nr: "8"
  },
  {
    flag: "🇮🇳", value: 'noida_extension', label: 'Noida Extension', latlng: [28.5359, 77.3772], region: 'Uttar Pradesh',
    country: "India", postalCode: "201013", city: "Noida Extension", street: "Sector 4", nr: "21"
  },
  {
    flag: "🇮🇳", value: 'sonipat', label: 'Sonipat', latlng: [29.0853, 77.0113], region: 'Haryana',
    country: "India", postalCode: "131001", city: "Sonipat", street: "Rai Industrial Area", nr: "3"
  },
];

const formattedCustomLocations = customLocations.map(location => ({
  ...location,
  flag: "🇮🇳",
  value: location.value.toLowerCase(),
  latlng: [location.latlng[0], location.latlng[1]],
  latitude: location.latlng[0],
  longitude: location.latlng[1],
}));

const formattedCountries = formattedCustomLocations;

const useCountries = () => {
  const getAll = () => formattedCountries;

  const getByValue = (value: string) => {
    return formattedCountries.find((item) => item.value === value);
  };

  return {
    getAll,
    getByValue
  };
};

export default useCountries;
