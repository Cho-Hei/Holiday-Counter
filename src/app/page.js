import Header from "@/components/Header";
import Hero from "@/components/Hero";

export default function Home() {
  const colors = [
    "bg-orange-500",
    "bg-amber-500",
    "bg-lime-600",
    "bg-violet-500",
  ];
  const random = Math.floor(Math.random() * colors.length);
  return (
    <>
      <div className={`min-h-svh min-w-full flex flex-col bg-[#4a795c]`}>
        <Header />
        <Hero />
      </div>
    </>
  );
}
