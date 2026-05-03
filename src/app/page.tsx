import ScrollyCanvas from "@/components/ScrollyCanvas";
import Projects from "@/components/Projects";

export default function Home() {
  return (
    <main className="bg-black min-h-screen text-white selection:bg-blue-500/30">
      <ScrollyCanvas />
      <Projects />
    </main>
  );
}
