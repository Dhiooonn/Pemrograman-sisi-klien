import React from "react";
import Input from "@/Layouts/Components/Input";
import Label from "@/Layouts/Components/Label";
import Button from "@/Layouts/Components/Button";
import Link from "@/Layouts/Components/Link";
import Card from "@/Layouts/Components/Card";
import Heading from "@/Layouts/Components/Heading";
import Form from "@/Layouts/Components/Form";
import AuthLayout from "@/Layouts/AuthLayout";

const Login = () => {
  return (
    <AuthLayout>
      <Card>
        <Heading as="h2">Login</Heading>
        <Form>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input type="email" name="email" placeholder="Masukkan email" required />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input type="password" name="password" placeholder="Masukkan password" required />
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
    </AuthLayout>
  );
};

export default Login;