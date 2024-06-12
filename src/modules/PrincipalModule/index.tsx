"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { DrawerDialog } from "./components/drawer";

const PrincipalModule = () => {
  return (
    <main className="font-custom h-[100vh] w-screen flex flex-col justify-between items-center">
      <Navbar />
      <DrawerDialog />
      <Footer />
    </main>
  );
};

export default PrincipalModule;
