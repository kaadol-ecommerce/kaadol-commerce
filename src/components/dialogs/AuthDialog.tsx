import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { loginSchema, signUpSchema } from "@/lib/zod";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Kinput from "../custom/KInput";
import { Loader2 } from "lucide-react";
import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useState } from "react";
import { KErrorAlert } from "../custom/KErrorAlert";

type FormData = {
  email: string;
  password: string;
};

type SignUpFormData = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

interface UserDO {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

interface LoginResponse {
  user: UserDO;
  access_token: string;
}

export default function authDialog() {
  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const {
    handleSubmit,
    register,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(loginSchema),
  });
  const {
    handleSubmit: handleSignupSubmit,
    register: signupRegister,
    control: signupControl,
    getValues,
    formState: { errors: signupErrors, isSubmitting: signupIsSubmitting },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const router = useRouter();

  const handleLogin = async (data: FieldValues) => {
    try {
      const res = await axios.post<LoginResponse>(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login`,
      {
        username: data.email,
        password: data.password,
      }
    );
    Cookies.set("token", res.data.access_token, { expires: 7 });
    router.reload();
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 401) {
        return setError("Invalid Email or password");
      }
    }
    
  };

  const handleSignup = async (data: FieldValues) => {
    console.log(data, "I got there in signup");
    try {
      const res = await axios.post<LoginResponse>(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/register`,
        {
          email: data.email,
          password: data.password,
          firstName: data.firstName,
          lastName: data.lastName,
        }
      );
      Cookies.set("token", res.data.access_token, { expires: 7 });
      router.reload();
      setError(null);
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 409) {
        return setError("User already exists");
      }
      setError("An error occurred, Please try again");
    }
  };

  console.log(signupErrors, "signupErrors", getValues(), "getValues");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"secondary"}>Login or Signup</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isSignup ? "Register" : "Login"}</DialogTitle>
          <DialogDescription>
            {isSignup
              ? "Enter your credentials to get started"
              : "Enter your credentials to access your account."}
          </DialogDescription>
        </DialogHeader>
        {error && <KErrorAlert title="Error" description={error} />}
        {isSignup ? (
          <form
            className="space-y-4 pt-4"
            key={"signup"}
            onSubmit={handleSignupSubmit(handleSignup)}
          >
            <div className="space-y-2">
              <Kinput
                id="firstName"
                label="First name"
                type="text"
                control={signupControl}
                {...signupRegister("firstName")}
                error={signupErrors.firstName?.message}
              />
            </div>
            <div className="space-y-2">
              <Kinput
                id="lastName"
                label="Last name"
                type="text"
                control={signupControl}
                {...signupRegister("lastName")}
                error={signupErrors.lastName?.message}
              />
            </div>
            <div className="space-y-2">
              <Kinput
                id="email"
                label="Email"
                type="email"
                control={signupControl}
                {...signupRegister("email")}
                error={signupErrors.email?.message}
              />
            </div>
            <div className="space-y-2">
              <Kinput
                id="password"
                label="Password"
                type="password"
                control={signupControl}
                {...signupRegister("password")}
                error={signupErrors.password?.message}
              />
            </div>
            <Button type="submit" className="w-full">
              {signupIsSubmitting ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Register"
              )}
            </Button>
            <p>
              Already joined,{" "}
              <Button
                variant="ghost"
                type="button"
                onClick={() => {
                  setIsSignup(false);
                  setError(null);
                }}
              >
                login here
              </Button>
            </p>
          </form>
        ) : (
          <form
            onSubmit={handleSubmit(handleLogin)}
            key={"login"}
            className="space-y-4 pt-4"
          >
            <div className="space-y-2">
              <Kinput
                id="email"
                label="Email"
                type="email"
                control={control}
                {...register("email")}
                error={errors.email?.message}
              />
            </div>
            <div className="space-y-2">
              <Kinput
                id="password"
                label="Password"
                type="password"
                control={control}
                {...register("password")}
                error={errors.password?.message}
              />
            </div>
            <Button type="submit" className="w-full">
              {isSubmitting ? <Loader2 className="animate-spin" /> : "Login"}
            </Button>
            <p>
              Not yet joined,{" "}
              <Button
                variant="ghost"
                onClick={() => {
                  setIsSignup(true);
                  setError(null);
                }}
                type="button"
              >
                Register
              </Button>
            </p>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
