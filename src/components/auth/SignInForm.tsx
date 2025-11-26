"use client";

import Checkbox from "@/components/form/input/Checkbox";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "@/icons";
import Link from "next/link";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ identifier: "", password: "" });
  const [errorMsg, setErrorMsg] = useState("");
  const [remember, setRemember] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    const res = await signIn("credentials", {
      redirect: false,
      identifier: form.identifier,
      password: form.password,
    });

    if (res?.error) {
      setErrorMsg("Identifier atau password salah!");
      return;
    }

    const sessionRes = await fetch("/api/auth/session");
    const data = await sessionRes.json();

    if (data?.user?.role === "siswa") redirect("/user");
    else if (data?.user?.role === "admin") redirect("/admin");
    else if (data?.user?.role === "guru") redirect("/petugas");
    else redirect("/login");
  };

  return (
    <div className="flex flex-col flex-1 lg:w-1/2 w-full">
      <div className="w-full max-w-md sm:pt-10 mx-auto mb-5">
        <Link href="/" className="inline-flex items-center text-sm text-gray-500">
          <ChevronLeftIcon />
          Back to Landing Page
        </Link>
      </div>

      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto px-3 sm:px-0">
        <div>
          <h1 className="mb-2 font-semibold text-gray-800 text-title-sm sm:text-title-md">
            Sign In
          </h1>
          <p className="text-sm text-gray-500">Enter your identifier & password!</p>

          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              {errorMsg && (
                <div className="p-3 text-sm text-red-600 bg-red-100 border border-red-300 rounded-md">
                  {errorMsg}
                </div>
              )}

              <div>
                <Label>NIPD / NIK / Admin ID *</Label>
                <Input
                  name="identifier"
                  placeholder="Masukkan identifier"
                  value={form.identifier}
                  onChange={handleChange}
                />
              </div>

              <div>
                <Label>Password *</Label>
                <div className="relative">
                  <Input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={form.password}
                    onChange={handleChange}
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
                  >
                    {showPassword ? <EyeIcon /> : <EyeCloseIcon />}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Checkbox checked={remember} onChange={setRemember} />
                <span className="text-sm">Keep me logged in</span>
              </div>

              <Button type="submit" className="w-full">
                Sign In
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
