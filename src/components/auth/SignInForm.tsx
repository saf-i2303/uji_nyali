"use client";

import React, { useState } from "react";
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "@/icons";
import Checkbox from "@/components/form/input/Checkbox";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";
import Image from "next/image";

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [form, setForm] = useState({
    identifier: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    const res = await signIn("credentials", {
      redirect: false,
      ...form,
    });

    if (res?.error) {
      setErrorMsg("Identifier atau password salah!");
      return;
    }

    const sessionRes = await fetch("/api/auth/session");
    const data = await sessionRes.json();

    const role = data?.user?.role;
    if (role === "siswa") redirect("/user");
    else if (role === "admin") redirect("/admin");
    else if (role === "guru") redirect("/petugas");
    else redirect("/login");
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-linear-to-br from-[#F5EDE4] via-[#FAF5F0] to-[#E8D5C4] p-4">
      <div className="w-full max-w-5xl bg-white shadow-2xl rounded-3xl overflow-hidden flex flex-col lg:flex-row">

        {/* ============= LEFT FORM SECTION ============= */}
        <div className="flex flex-col flex-1 p-8 lg:p-14">

          {/* Back Button */}
          <div className="mb-6 lg:mb-10">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-[#281A14]"
            >
              <ChevronLeftIcon />
              Kembali ke Landing Page
            </Link>
          </div>

          {/* Form Container */}
          <div className="max-w-md">
            <h1 className="text-3xl font-bold text-[#281A14]">Selamat Datang!</h1>
            <p className="text-gray-600 mt-1 mb-8">
              Masukkan kredensial Anda untuk melanjutkan
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Error Message */}
              {errorMsg && (
                <div className="p-4 bg-red-50 text-red-700 border border-red-200 rounded-xl text-sm">
                  {errorMsg}
                </div>
              )}

              {/* Identifier */}
              <div>
                <Label>NIPD / NIK / Admin ID *</Label>
                <Input
                  name="identifier"
                  placeholder="Masukkan identifier Anda"
                  value={form.identifier}
                  onChange={handleChange}
                />
              </div>

              {/* Password */}
              <div>
                <Label>Password *</Label>
                <div className="relative">
                  <Input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Masukkan password Anda"
                    value={form.password}
                    onChange={handleChange}
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
                  >
                    {showPassword ? <EyeIcon /> : <EyeCloseIcon />}
                  </span>
                </div>
              </div>

              {/* Remember */}
              <div className="flex items-center gap-3">
                <Checkbox checked={remember} onChange={setRemember} />
                <span className="text-sm text-gray-700">Ingat saya</span>
              </div>

              {/* Submit */}
             <Button
              type="submit"
              className="w-full bg-[#7C4F39] text-[#281A14] hover:bg-[#6C4432] transition-colors"
              >
                Masuk Sekarang
              </Button>
              </form>

            <p className="text-center text-xs text-gray-500 mt-8">
              © 2024 Perpusan. Semua hak dilindungi.
            </p>
          </div>
        </div>

        {/* ============= RIGHT IMAGE SECTION ============= */}
        <div className="hidden lg:flex justify-center items-center w-1/2 bg-[#F8F3ED] p-10">
          <Image
            src="/images/picture/Library-amico.png"
            alt="Library Illustration"
            width={600}
            height={600}
            className="object-contain"
          />
        </div>

      </div>
    </div>
  );
}
