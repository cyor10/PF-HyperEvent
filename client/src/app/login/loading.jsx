"use client";

import { Loader } from "../components/Loader/loader";


const Loading = () => {
  return ( 
    <div className="flex h-full w-full items-center justify-center min-h-[100vh]">
      <Loader />
    </div>
   );
}
 
export default Loading;