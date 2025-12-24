"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDebounceValue } from "usehooks-ts";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { SignUpSchema } from "@/schemas/signupSchema";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/apiResponse";

function Page() {
  const [username, setUsername] = useState("");
  const [usernameMessage, setUsernameMessage] = useState("");
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);
  const debounceUsername = useDebounceValue(username, 300);
  const router = useRouter();
  //zod implementation
  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });
  useEffect(() => {
    const checkUsername = async () => {
      if (debounceUsername) {
        setIsCheckingUsername(true);
        setUsernameMessage("");
        try {
          const response = await axios.get(
            `api/username?username=${debounceUsername}`
          );
          console.log(response);
          setUsernameMessage(response.data.message);
        } catch (error) {
          const axiosError = error as AxiosError<ApiResponse>;
          setUsernameMessage(
            axiosError.response?.data.message ?? `Error checking Username`
          );
        } finally {
          setIsCheckingUsername(false);
        }
      }
    };

    checkUsername();
  }, [debounceUsername]);

  const onSubmit = async (data: z.infer<typeof SignUpSchema>) => {
    setSubmitting(true);
    try {
      const response = await axios.post<ApiResponse>("/api/signup", data);
      console.log(response);
      if (response.data.success) {
        toast.success(response.data.message);
        router.replace(`/verify/${username}`);
      }
    } catch (error) {
      console.error(`error in Signup User ${error}`);
      const axiosError = error as AxiosError<ApiResponse>;
      const errrorMessage = axiosError.response?.data.message;
      toast.error("SignUp failed", {
        description: errrorMessage,
      });
      setSubmitting(false); // Set isSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Join Mystry Message
          </h1>
          <p className="mb-4">Signup To Start Your anonymous adventure</p>
        </div>
      </div>
    </div>
  );
}

export default Page;
