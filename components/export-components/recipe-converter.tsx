"use client";
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Scale, ArrowRight, Loader2 } from 'lucide-react';
import { analyzeRecipe } from '@/lib/gemini';

interface ConversionResult {
  ingredients: {
    original: string;
    grams: number;
    explanation: string;
  }[];
}

export default function RecipeConverter() {
  const [recipeText, setRecipeText] = useState('');
  const [result, setResult] = useState<ConversionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConvert = async () => {
    if (!recipeText.trim()) {
      setError('Please enter a recipe to convert');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const conversion = await analyzeRecipe(recipeText);
      setResult(conversion);
    } catch (err) {
      setError('Failed to convert recipe. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Scale className="h-5 w-5 text-primary" />
          <h2 className="text-2xl font-semibold">Enter Your Recipe</h2>
        </div>
        
        <Textarea
          value={recipeText}
          onChange={(e) => setRecipeText(e.target.value)}
          placeholder="Paste your recipe here..."
          className="min-h-[200px] mb-4"
        />
        
        <Button
          onClick={handleConvert}
          disabled={loading}
          className="w-full"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Converting...
            </>
          ) : (
            <>
              <ArrowRight className="mr-2 h-4 w-4" />
              Convert to Grams
            </>
          )}
        </Button>

        {error && (
          <p className="text-destructive mt-2 text-sm">{error}</p>
        )}
      </Card>

      {result && (
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4">Converted Recipe</h3>
          <div className="space-y-4">
            {result.ingredients.map((ingredient, index) => (
              <div key={index} className="p-4 bg-secondary rounded-lg">
                <p className="text-muted-foreground">{ingredient.original}</p>
                <p className="font-semibold">{ingredient.grams}g</p>
                <p className="text-sm text-muted-foreground">{ingredient.explanation}</p>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}