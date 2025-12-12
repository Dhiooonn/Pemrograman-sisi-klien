import React from "react";
import Input from "@/Pages/Admin/Components/Input";
import Label from "@/Pages/Admin/Components/Label";
import Button from "@/Pages/Admin/Components/Button";
import Link from "@/Pages/Admin/Components/Link";
import Card from "@/Pages/Admin/Components/Card";
import Heading from "@/Pages/Admin/Components/Heading";
import Form from "@/Pages/Admin/Components/Form";

import Swal from "sweetalert2";
import { toast } from "react-hot-toast"

import { dummyUser } from "@/Data/Dummy";
import { useNavigate } from "react-router-dom";
import { login } from "@/utils/Apis/AuthApi";


const Login = () => {
    const navigate = useNavigate();

    // State Form
    const [ form, setForm ] = React.useState({
      email: "",
      password: "",
    })

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const email = e.target.email.value;
  //   const password = e.target.password.value;

  //   if (email === dummyUser.email && password === dummyUser.password) {
  //     localStorage.setItem("user", JSON.stringify(dummyUser));
  //     navigate("/admin")
  //   } else {
  //     alert("Email atau password salah!");
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = form;

    try {
      const user = await login(email, password);

      // Simpan user
      localStorage.setItem("user", JSON.stringify(user.data ?? user));

      // Toast Success
      toast.success("Login Berhasil!, Selamat datang 👋");

      navigate("/admin/dashboard");
    } catch (err) {
      // Toast error
      toast.error(err.response?.data?.message || "Login Gagal! Coba lagi ya");
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