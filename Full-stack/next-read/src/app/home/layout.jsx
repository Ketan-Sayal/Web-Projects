import { Navbar } from "@/components";


export default function Page({children}) {

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {children}
    </div>
  );
};
