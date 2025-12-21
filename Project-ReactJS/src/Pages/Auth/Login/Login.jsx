import React from "react";
import Input from "@/Pages/Admin/Components/Input";
import Label from "@/Pages/Admin/Components/Label";
import Button from "@/Pages/Admin/Components/Button";
import Link from "@/Pages/Admin/Components/Link";
import Card from "@/Pages/Admin/Components/Card";
import Heading from "@/Pages/Admin/Components/Heading";
import Form from "@/Pages/Admin/Components/Form";

import { toast } from "react-hot-toast";
import { useNavigate, Navigate } from "react-router-dom";

import { login } from "@/Utils/Apis/AuthApi";
import { useAuthStateContext } from "../Context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { user, setUser } = useAuthStateContext();

  const [form, setForm] = React.useState({
    email: "",
    password: "",
  });

  // Jika sudah login, tidak boleh buka halaman login
  if (user) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await login(form.email, form.password);

      // json-server biasanya mengembalikan array
      const loggedUser = res.data?.[0] ?? res.data ?? res;

      // SIMPAN LEWAT CONTEXT
      setUser(loggedUser);

      toast.success("Login berhasil! 👋");

      navigate("/admin/dashboard");
    } catch (err) {
      toast.error("Login gagal! Email atau password salah");
    }
  };

  return (
      <Card className="max-w-md">
        <Heading as="h2">Login</Heading>
        <Form onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input 
              type="email" 
              name="email" 
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="Masukkan email" 
              required />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
              <Input 
              type="password" 
              name="password" 
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="Masukkan password" 
              required />
          </div>
          <div className="flex justify-between items-center">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span className="text-sm text-gray-600">Ingat saya</span>
            </label>
            <Link href="#" className="text-sm">Lupa password?</Link>
          </div>
          <Button type="submit" className="w-full">Login</Button>
        </Form>
        <p className="text-sm text-center text-gray-600 mt-4">
          Belum punya akun? <Link href="#">Daftar</Link>
        </p>
      </Card>
  );
};

export default Login;
