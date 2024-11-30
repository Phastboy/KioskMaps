'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
  const router = useRouter();

  return ( 
    <Image
      onClick={() => router.push('/')}
      className="  cursor-pointer" 
      src="/images/Logo.png" 
      height="100" 
      width="140" 
      alt="Logo" 
    />
   );
}
 
export default Logo;
