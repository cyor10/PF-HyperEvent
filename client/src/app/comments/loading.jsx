"use client";

import { Loader } from "@/app/components/Loader/loader";


const Loading = () => {
  return ( 
    <div className="flex h-full w-full items-center justify-center">
      <Loader />
    </div>
   );
}
 
export default Loading;