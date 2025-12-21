import React from "react";
import Sidebar from "@/Pages/Admin/Components/Sidebar";
import Header from "@/Pages/Admin/Components/Header";
import Footer from "@/Pages/Admin/Components/Footer";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <>
        {/* Sidebar */}
        <Sidebar />

        {/* Content */}
        <div className="ml-64 min-h-screen bg-gray-100 flex flex-col">
          {/* Header */}
          <Header />
          
          <main className="flex-1 p-6 pt-24 overflow-x-auto">
              <Outlet />
          </main>

          <Footer />
        </div>
    </>
  );
};

export default AdminLayout;