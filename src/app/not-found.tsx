import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

const notFound = () => {

  return (
    <>
      <Navbar showArrowBack />
      <div className="flex flex-col h-screen w-full items-center justify-center px-4 text-[18px] font-bold">
        <h1 className="font-custom text-center">¡Oh, no! Esta página no existe, vuelve a la página principal.</h1>
        <Link href="/">
          <Button className="mt-4">VOLVER</Button>
        </Link>
      </div>
      <div className="fixed bottom-0 left-0 flex h-16 w-full items-end justify-center">
        <Footer />
      </div>
    </>
  );
};

export default notFound;
