import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Sparkles, Trophy, RotateCcw } from "lucide-react";

const Index = () => {
  const [targetNumber, setTargetNumber] = useState<number>(0);
  const [guess, setGuess] = useState<string>("");
  const [attempts, setAttempts] = useState<number>(0);
  const [message, setMessage] = useState<string>("Угадайте число от 1 до 100!");
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [bestScore, setBestScore] = useState<number>(
    parseInt(localStorage.getItem("bestScore") || "999")
  );

  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    const random = Math.floor(Math.random() * 100) + 1;
    setTargetNumber(random);
    setGuess("");
    setAttempts(0);
    setMessage("Угадайте число от 1 до 100!");
    setGameOver(false);
  };

  const handleGuess = () => {
    const numGuess = parseInt(guess);

    if (isNaN(numGuess) || numGuess < 1 || numGuess > 100) {
      toast.error("Введите число от 1 до 100");
      return;
    }

    const newAttempts = attempts + 1;
    setAttempts(newAttempts);

    if (numGuess === targetNumber) {
      setMessage(`🎉 Поздравляю! Вы угадали число ${targetNumber}!`);
      setGameOver(true);
      
      if (newAttempts < bestScore) {
        setBestScore(newAttempts);
        localStorage.setItem("bestScore", newAttempts.toString());
        toast.success(`🏆 Новый рекорд: ${newAttempts} попыток!`);
      } else {
        toast.success(`Угадано за ${newAttempts} попыток!`);
      }
    } else if (numGuess < targetNumber) {
      setMessage("⬆️ Загаданное число больше!");
      toast.info("Попробуйте число побольше");
    } else {
      setMessage("⬇️ Загаданное число меньше!");
      toast.info("Попробуйте число поменьше");
    }

    setGuess("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !gameOver) {
      handleGuess();
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-4" style={{ background: "var(--gradient-hero)" }}>
      <div className="w-full max-w-md space-y-6 animate-in fade-in duration-700">
        {/* Header */}
        <header className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-8 h-8 text-primary animate-pulse" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Угадай Число
            </h1>
            <Sparkles className="w-8 h-8 text-accent animate-pulse" />
          </div>
          <p className="text-muted-foreground text-lg">
            Проверьте свою интуицию!
          </p>
        </header>

        {/* Game Card */}
        <Card className="p-8 space-y-6 shadow-2xl" style={{ boxShadow: "var(--shadow-card)" }}>
          {/* Stats */}
          <section className="flex justify-between items-center">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Попытки</p>
              <p className="text-3xl font-bold text-primary">{attempts}</p>
            </div>
            <div className="text-center">
              <div className="flex items-center gap-1 justify-center mb-1">
                <Trophy className="w-4 h-4 text-accent" />
                <p className="text-sm text-muted-foreground">Рекорд</p>
              </div>
              <p className="text-3xl font-bold text-accent">
                {bestScore === 999 ? "-" : bestScore}
              </p>
            </div>
          </section>

          {/* Message */}
          <div className="text-center p-4 bg-secondary rounded-lg">
            <p className="text-lg font-medium">{message}</p>
          </div>

          {/* Input Section */}
          {!gameOver && (
            <div className="space-y-4">
              <Input
                type="number"
                placeholder="Введите число..."
                value={guess}
                onChange={(e) => setGuess(e.target.value)}
                onKeyPress={handleKeyPress}
                min="1"
                max="100"
                className="text-center text-2xl h-14 border-2"
              />
              <Button 
                onClick={handleGuess} 
                className="w-full h-12 text-lg font-semibold"
                variant="default"
              >
                Проверить
              </Button>
            </div>
          )}

          {/* New Game Button */}
          {gameOver && (
            <Button 
              onClick={startNewGame} 
              className="w-full h-12 text-lg font-semibold"
              variant="default"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Новая игра
            </Button>
          )}
        </Card>

        {/* Instructions */}
        <footer className="text-center text-sm text-muted-foreground bg-card/50 p-4 rounded-lg backdrop-blur-sm">
          <p>💡 Компьютер загадал число от 1 до 100.</p>
          <p>Попробуйте угадать его за минимальное количество попыток!</p>
        </footer>
      </div>
    </main>
  );
};

export default Index;
