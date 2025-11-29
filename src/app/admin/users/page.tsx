"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";

export default function AdminUserManagement() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  // Form tambah user
  const [form, setForm] = useState({
    name: "",
    password: "",
    role: "siswa",
    class: "",
    nipd: "",
    nik: "",
    admin_id: "",
  });

  // Form edit user
  const [editForm, setEditForm] = useState<any>({});

  // Load users
  const loadUsers = async () => {
    setLoading(true);
    const res = await fetch("/api/users", { cache: "no-store" });
    const data = await res.json();
    setUsers(data);
    setLoading(false);
  };

  // Delete — Admin tidak bisa dihapus
  const deleteUser = async (user: any) => {
    if (user.role === "admin")
      return alert("User admin tidak bisa dihapus!");

    if (!confirm("Yakin ingin menghapus user ini?")) return;

    const res = await fetch(`/api/users/${user.id}`, { method: "DELETE" });
    if (res.ok) loadUsers();
  };

  // Create
  const createUser = async () => {
    const res = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setOpenAddModal(false);
      setForm({
        name: "",
        password: "",
        role: "siswa",
        class: "",
        nipd: "",
        nik: "",
        admin_id: "",
      });
      loadUsers();
    } else {
      alert("Gagal menambah user!");
    }
  };

  // Open edit modal
  const openEdit = (user: any) => {
    setEditForm(user);
    setOpenEditModal(true);
  };

  // Save edit
  const saveEdit = async () => {
    const res = await fetch(`/api/users/${editForm.id}`, {
      method: "PUT",
      body: JSON.stringify(editForm),
    });

    if (res.ok) {
      setOpenEditModal(false);
      loadUsers();
    } else {
      alert("Gagal mengedit user!");
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  // Pisah per role
  const admins = users.filter((u) => u.role === "admin");
  const gurus = users.filter((u) => u.role === "guru");
  const siswa = users.filter((u) => u.role === "siswa");

  // Style warna per role
  const roleColor = {
    admin: "bg-yellow-50",
    guru: "bg-blue-50",
    siswa: "bg-green-50",
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Kelola User</h1>

      {/* Tombol Tambah User */}
      <button
        onClick={() => setOpenAddModal(true)}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded mb-6"
      >
        <Plus size={20} /> Tambah Data User
      </button>

      {/* -------------- TABEL ADMIN -------------- */}
      <h2 className="text-xl font-semibold mb-2 text-yellow-700">
        Daftar Admin
      </h2>
      <UserTable
        data={admins}
        color={roleColor.admin}
        loading={loading}
        onEdit={openEdit}
        onDelete={deleteUser}
        canDelete={false}
      />

      {/* -------------- TABEL GURU -------------- */}
      <h2 className="text-xl font-semibold mt-8 mb-2 text-blue-700">
        Daftar petugas
      </h2>
      <UserTable
        data={gurus}
        color={roleColor.guru}
        loading={loading}
        onEdit={openEdit}
        onDelete={deleteUser}
        canDelete={true}
      />

      {/* -------------- TABEL SISWA -------------- */}
      <h2 className="text-xl font-semibold mt-8 mb-2 text-green-700">
        daftar siswa
      </h2>
      <UserTable
        data={siswa}
        color={roleColor.siswa}
        loading={loading}
        onEdit={openEdit}
        onDelete={deleteUser}
        canDelete={true}
      />

      {/* MODAL TAMBAH USER */}
      {openAddModal && (
        <Modal title="Tambah User" onClose={() => setOpenAddModal(false)}>
          <UserForm form={form} setForm={setForm} />

          <div className="flex justify-end gap-2 mt-4">
            <button
              onClick={() => setOpenAddModal(false)}
              className="px-4 py-2 bg-gray-500 text-white rounded"
            >
              Batal
            </button>
            <button
              onClick={createUser}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Simpan
            </button>
          </div>
        </Modal>
      )}

      {/* MODAL EDIT USER */}
      {openEditModal && (
        <Modal title="Edit User" onClose={() => setOpenEditModal(false)}>
          <UserForm form={editForm} setForm={setEditForm} isEdit />

          <div className="flex justify-end gap-2 mt-4">
            <button
              onClick={() => setOpenEditModal(false)}
              className="px-4 py-2 bg-gray-500 text-white rounded"
            >
              Batal
            </button>
            <button
              onClick={saveEdit}
              className="px-4 py-2 bg-green-600 text-white rounded"
            >
              Simpan Perubahan
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

/* ============================
   COMPONENT: TABLE USER
============================= */
function UserTable({
  data,
  color,
  loading,
  onEdit,
  onDelete,
  canDelete,
}: any) {
  return (
    <div className="bg-white rounded shadow overflow-x-auto">
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="p-3 text-left">ID</th>
            <th className="p-3 text-left">Nama</th>
            <th className="p-3 text-left">Role</th>
            <th className="p-3 text-left">Kelas</th>
            <th className="p-3 text-left">NIPD</th>
            <th className="p-3 text-left">NIK</th>
            <th className="p-3 text-left">Admin ID</th>
            <th className="p-3 text-left">Aksi</th>
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr>
              <td colSpan={8} className="text-center py-4">
                Loading...
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={8} className="text-center py-4 text-gray-500">
                Tidak ada data.
              </td>
            </tr>
          ) : (
            data.map((u: any) => (
              <tr key={u.id} className={`${color} border-b`}>
                <td className="p-3">{u.id}</td>
                <td className="p-3">{u.name}</td>
                <td className="p-3 capitalize">{u.role}</td>
                <td className="p-3">{u.class || "-"}</td>
                <td className="p-3">{u.nipd || "-"}</td>
                <td className="p-3">{u.nik || "-"}</td>
                <td className="p-3">{u.admin_id || "-"}</td>

                <td className="p-3">
                  <div className="flex gap-2">
                    <button
                      onClick={() => onEdit(u)}
                      className="px-3 py-1 text-sm bg-yellow-500 text-white rounded"
                    >
                      Edit
                    </button>

                    {canDelete && (
                      <button
                        onClick={() => onDelete(u)}
                        className="px-3 py-1 text-sm bg-red-600 text-white rounded"
                      >
                        Hapus
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

/* ============================
   COMPONENT: MODAL
============================= */
function Modal({ title, children, onClose }: any) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        {children}
      </div>
    </div>
  );
}

/* ============================
   COMPONENT: FORM USER
============================= */
function UserForm({ form, setForm, isEdit = false }: any) {
  return (
    <div className="space-y-3">
      <input
        type="text"
        placeholder="Nama"
        className="w-full border p-2 rounded"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      {!isEdit && (
        <input
          type="text"
          placeholder="Password"
          className="w-full border p-2 rounded"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
      )}

      <select
        className="w-full border p-2 rounded"
        value={form.role}
        onChange={(e) => setForm({ ...form, role: e.target.value })}
      >
        <option value="siswa">Siswa</option>
        <option value="guru">Guru</option>
        <option value="admin">Admin</option>
      </select>

      <input
        type="text"
        placeholder="Kelas (opsional)"
        className="w-full border p-2 rounded"
        value={form.class}
        onChange={(e) => setForm({ ...form, class: e.target.value })}
      />

      <input
        type="text"
        placeholder="NIPD"
        className="w-full border p-2 rounded"
        value={form.nipd}
        onChange={(e) => setForm({ ...form, nipd: e.target.value })}
      />

      <input
        type="text"
        placeholder="NIK"
        className="w-full border p-2 rounded"
        value={form.nik}
        onChange={(e) => setForm({ ...form, nik: e.target.value })}
      />

      <input
        type="text"
        placeholder="Admin ID"
        className="w-full border p-2 rounded"
        value={form.admin_id || ""}
        onChange={(e) => setForm({ ...form, admin_id: e.target.value })}
      />
    </div>
  );
}
