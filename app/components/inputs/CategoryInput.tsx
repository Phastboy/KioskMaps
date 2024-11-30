'use client';

import { IconType } from "react-icons"; // Importing IconType from react-icons

interface CategoryBoxProps {
  icon: IconType; // IconType for specifying the icon component
  label: string; // Label for displaying category name
  selected?: boolean; // Optional prop to indicate if category is selected
  onClick: (value: string) => void; // Function to handle click events
}

// CategoryBox component displays a category with an icon and label
const CategoryBox: React.FC<CategoryBoxProps> = ({
  icon: Icon, // Destructuring Icon from props
  label, // Destructuring label from props
  selected, // Destructuring selected from props
  onClick // Destructuring onClick function from props
}) => {
  return ( 
    <div
      onClick={() => onClick(label)} // Click handler triggers onClick function with label
      className={`
        rounded-xl
        border-2
        p-4
        flex
        flex-col
        gap-3
        hover:border-black
        transition
        cursor-pointer
        ${selected ? 'border-black' : 'border-neutral-200'} // Conditionally applying border color based on selected prop
      `}
    >
      <Icon size={30} /> {/* Rendering Icon component with size 30 */}
      <div className="font-semibold">
        {label} {/* Displaying category label */}
      </div>
    </div>
   );
}
 
export default CategoryBox; // Exporting CategoryBox component
