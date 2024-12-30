import Image from "next/image";
import Link from "next/link";
import Menu from "../components/Menu";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen flex">
      {/*Left*/}
      <div className="relative w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%]">
        <Link href="/" className="flex items-center">
        <Image className="mt-1"src="/logoNew.png" alt="logo" width={280} height={50}/>
        </Link>
        <Menu/>
      </div>
      {/*Right*/}
      <div className="bg-gray-50 w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%">{children}
      </div>
      </div>
  );
}
