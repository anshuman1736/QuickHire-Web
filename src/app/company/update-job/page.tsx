import Updatejob from "@/components/company/Updatejob";
import React, { Suspense } from "react";

const page = () => {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-gray-600">Loading...</div>
        </div>
      }
    >
      <Updatejob />
    </Suspense>
  );
};

export default page;
