"use client";
import RecipeConverter from "@/components/export-components/recipe-converter";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">
          Recipe Measurement Converter
        </h1>
        <RecipeConverter />
      </main>
    </div>
  );
}