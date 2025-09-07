import { Button } from "@/components/ui/button";

export default function Home() {
  return (
   <div className="flex justify-center items-center h-screen">
    <div className="flex flex-col gap-4">
    <h1 className="text-4xl font-bold">Welcome to img-ai</h1>
    <p className="text-lg">Generate images with AI</p>
    <Button>Get Started</Button>
    </div>
   </div>
  );
}
