'use client';

import { IconType } from "react-icons";
import MaxWidthWrapper from "../MaxWidthWrapper";

interface CategoryViewProps {
  icon: IconType,
  label: string,
  productName: string,
  quantity: string,
  price: string,
}
// ListingCategory component for displaying a single listing category

const CategoryView: React.FC<CategoryViewProps> = ({ 
  icon: Icon,
  label,
  productName,
  quantity,
  price,
 }) => {
  const description = `${productName} - quantity: ${quantity}, Price: ${price}`;

  return ( 
    <MaxWidthWrapper>
      <div className="flex flex-col gap-6">
        <div className="flex flex-row items-center gap-4">
          <Icon size={40} className="text-neutral-600" />
          <div className="flex flex-col">
            <div className="text-lg font-semibold">
              {label}
            </div>
            <div className="text-neutral-500 font-light">
              {description}
            </div>
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
}
 
export default CategoryView;
