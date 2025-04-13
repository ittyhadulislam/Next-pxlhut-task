"use client";

import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";

const ShowData = () => {
  const router = useRouter();
  const { getData } = useSelector((state: RootState) => state.showDetails) as {
    getData: {
      fullName: string;
      email: string;
      phoneNo: string;
      streetAddress: string;
      city: string;
      zipCode: string;
      userName: string;
      password: string;
    } | null;
  };
  
  console.log(getData);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-green-600 mb-4">
          Thanks for Submission
        </h1>
        <p className="text-gray-600 mb-6">
          We&#39;ve received your information successfully.
        </p>
        {getData ? (
          <div className="text-left mb-4">
            <p className="text-gray-700 mb-2">
              Full Name : {getData?.fullName}
            </p>
            <p className="text-gray-700 mb-2">Email: {getData?.email}</p>
            <p className="text-gray-700 mb-2">Phone No: {getData?.phoneNo}</p>
            <p className="text-gray-700 mb-2">
              Address: {getData?.streetAddress}
            </p>
            <p className="text-gray-700 mb-2">City: {getData?.city}</p>
            <p className="text-gray-700 mb-2">Zip Code: {getData?.zipCode}</p>
            <p className="text-gray-700 mb-2">UserName: {getData?.userName}</p>
            <p className="text-gray-700 mb-2">
              Pass Word: {"*".repeat(getData?.password?.length || 0)}
            </p>
          </div>
        ) : (
          <p className="text-gray-700 mb-4">No data available</p>
        )}

        <button
          className="mt-1 rounded-md bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700 cursor-pointer"
          onClick={() => router.push("/")}
        >
          Submit Another Records
        </button>
      </div>
    </div>
  );
};

export default ShowData;
