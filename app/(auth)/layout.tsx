import Image from "next/image";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="h-screen w-full  relative">
     <div className="absolute size-full">
    <Image src="/images/bg-img.png" fill className="size-full" alt="background"/>
     </div>
      {children}
     
    </main>
  );
}
