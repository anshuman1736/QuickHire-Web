"use client";
import { RegisterSalesPerson } from "@/hooks/sales/Registeration";
import { ISalesRegister } from "@/types/auth";
import { useMutation } from "@tanstack/react-query";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

const SalesRegister = () => {
  const [showpwd, setshowpwd] = useState(false);
  const router=useRouter()
  const [formData, setformData] = useState<ISalesRegister>({
    email: "",
    password: "",
  });


  const handleonchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setformData((prev) => ({ ...prev, [name]: value }));
  };
  const mutation = useMutation({
    mutationFn: RegisterSalesPerson,
    onSuccess: (data) => {
      toast.success(data.MSG);
      router.push("/login");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const handleonsubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center py-12 px-6">
      <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-200">
        <div className="bg-white px-8 pt-8 pb-4">
          <div className="flex items-center justify-center mb-6">
            <span className="text-3xl font-bold text-yellow-500 transition-transform hover:scale-110 duration-300">
              Q
            </span>
            <span className="text-3xl font-bold text-black transition-transform hover:scale-110 duration-300">
              H
            </span>
            <span className="ml-2 inline-flex items-center justify-center h-6 w-16 rounded-full text-xs font-medium bg-gray-100">
              jobs
            </span>
          </div>
          <p className="text-center text-base mb-6 text-gray-600">
            Sales Registration
          </p>
        </div>

        <form onSubmit={handleonsubmit} className="px-8 pb-8">
          <div className="bg-white/90 backdrop-blur-sm rounded-xl">
            <div>
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-center">
                  Hello! Register to get started
                </h2>

                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleonchange}
                    placeholder="Email"
                    className={`w-full px-4 py-3 rounded-lg bg-gray-50 border  focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                </div>

                <div className="relative">
                  <span
                    onClick={() => setshowpwd(!showpwd)}
                    className="text-xs text-blue-400  cursor-pointer absolute right-5 top-3.5"
                  >
                    {showpwd ? <Eye /> : <EyeOff />}
                  </span>
                  <input
                    type={showpwd ? "text" : "password"}
                    name="password"
                    onChange={handleonchange}
                    placeholder="Password"
                    className={`w-full px-4 py-3 rounded-lg bg-gray-50 border  focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                </div>
                <button className=" w-full cursor-pointer py-3 px-4 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg text-center">
                { mutation.isPending? "Registering..." : "Register"}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SalesRegister;
