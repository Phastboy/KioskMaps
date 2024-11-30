"use client"
import { useEffect, useState } from "react";
import ContentLoader from "react-content-loader";

const Loader = () => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    
    window.addEventListener("resize", updateDimensions);
    
    updateDimensions();

    
    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <ContentLoader 
        speed={2}
        width={dimensions.width}
        height={dimensions.height}
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      >
        
        <rect x="20" y="20" rx="3" ry="3" width="300" height="15" />
        <rect x="20" y="50" rx="3" ry="3" width="250" height="15" />
        <rect x="20" y="80" rx="3" ry="3" width="350" height="15" />
        <rect x="20" y="110" rx="3" ry="3" width="200" height="15" />
        <rect x="20" y="140" rx="3" ry="3" width="280" height="15" />
        
      </ContentLoader>
    </div>
  );
};

export default Loader;
