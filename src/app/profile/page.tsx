"use client";

import React, { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import Swal from "sweetalert2";

interface UserSession {
  id: number;
  name: string;
  role: string;
  image?: string | null;
}

export default function ProfilePage() {
  const { data: session, update } = useSession();
  const user = session?.user as UserSession | undefined;

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [imagePreview, setImagePreview] = useState("/images/picture/default.png");
  const [imageFile, setImageFile] = useState<File | null>(null);

  // Load data user
  useEffect(() => {
    if (user) {
      setName(user.name);
      setImagePreview(user.image || "/images/picture/default.png");
    }
  }, [user]);

  if (!user) return <p>Loading...</p>;

  // Preview image
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  // Save Changes
  const handleSave = async () => {
    if (!name.trim()) {
      Swal.fire("Error", "Nama tidak boleh kosong", "error");
      return;
    }

    const formData = new FormData();
    formData.append("id", String(user.id));
    formData.append("name", name);
    if (imageFile) formData.append("image", imageFile);

    try {
      const res = await fetch("/api/profile/update", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        Swal.fire("Error", data.message || "Gagal update profil", "error");
        return;
      }

      Swal.fire("Berhasil", "Profil berhasil diperbarui", "success");

      // Update session user data
      await update({ ...session, user: data.user });

      setImagePreview(data.user.image || "/images/picture/default.png");
      setIsEditing(false);
      setImageFile(null);
    } catch (err) {
      Swal.fire("Error", "Terjadi kesalahan server", "error");
      console.error(err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 flex flex-col gap-6">
      <h1 className="text-2xl font-bold">Profile</h1>

      {/* VIEW MODE */}
      {!isEditing ? (
        <div className="bg-white rounded-2xl shadow p-6 flex gap-6 items-center">
          <div className="w-24 h-24 rounded-full overflow-hidden shadow relative">
            <Image
              src={imagePreview}
              alt="Avatar"
              width={96}
              height={96}
              className="object-cover"
            />
          </div>

          <div>
            <h2 className="text-xl font-semibold">{name}</h2>
            <p className="text-gray-400 text-sm">Role: {user.role.toUpperCase()}</p>

            <button
              onClick={() => setIsEditing(true)}
              className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Edit Profile
            </button>
          </div>
        </div>
      ) : (
        /* EDIT MODE */
        <div className="bg-white rounded-2xl shadow p-6 flex flex-col gap-4">
          <div className="flex flex-col items-center gap-3 relative w-28 h-28">
            <div className="relative w-28 h-28 rounded-full overflow-hidden">
              <Image
                src={imagePreview}
                alt="Avatar"
                fill
                sizes="112px"
                className="object-cover"
              />

              <label
                htmlFor="avatarUpload"
                className="absolute bottom-1 right-1 bg-blue-600 text-white text-xs p-2 rounded-full cursor-pointer shadow"
              >
                ✏️
              </label>

              <input
                id="avatarUpload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>

            <p className="text-sm text-gray-500">Klik ikon untuk ganti foto</p>
          </div>

          <input
            type="text"
            className="border px-3 py-2 rounded w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nama lengkap"
          />

          <div className="flex gap-3 mt-2">
            <button
              onClick={handleSave}
              className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
            >
              Simpan
            </button>

            <button
              onClick={() => setIsEditing(false)}
              className="flex-1 bg-gray-300 py-2 rounded-lg hover:bg-gray-400"
            >
              Batal
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => signOut({ callbackUrl: "/login" })}
        className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
      >
        Sign Out
      </button>
    </div>
  );
}
