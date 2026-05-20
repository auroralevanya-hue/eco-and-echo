"use client";

import { use, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Brain, Check, X, ChevronRight } from "lucide-react";
import { getQuestById, getPuzzleById } from "@/data/mock";
import { notFound } from "next/navigation";

type Params = Promise<{ id: string }>;

export default function PuzzlePage({ params }: { params: Params }) {
  const { id } = use(params);
  const quest = getQuestById(id);
  if (!quest) notFound();
  const puzzle = getPuzzleById(quest.puzzleId);
  if (!puzzle) notFound();

  const router = useRouter();
  const [selected, setSelected] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);
  const correct = selected === puzzle.correctAnswer;

  return (
    <main className="min-h-dvh pb-32">
      {/* Header */}
      <header className="max-w-lg mx-auto px-5 pt-5 flex items-center justify-between">
        <Link
          href={`/quest/${quest.id}/ar`}
          className="text-emerald-100/50 hover:text-emerald-100 flex items-center gap-1 text-sm"
        >
          <ArrowLeft className="w-4 h-4" /> AR Scan
        </Link>
        <div className="chip chip-cyan">
          <Brain className="w-3 h-3" /> Climate Puzzle
        </div>
      </header>

      {/* Topic */}
      <section className="max-w-lg mx-auto px-5 mt-5">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <div className="inline-block chip chip-mint mb-3">{puzzle.topic}</div>
          <h1 className="text-lg font-bold font-display text-white px-2">{puzzle.question}</h1>
        </motion.div>
      </section>

      {/* Choices */}
      <section className="max-w-lg mx-auto px-5 mt-6 space-y-2.5">
        {puzzle.choices.map((c, i) => {
          const isSelected = selected === c.label;
          const isCorrect = c.label === puzzle.correctAnswer;
          const showResult = revealed && isSelected;
          const showCorrect = revealed && isCorrect && !isSelected;

          return (
            <motion.button
              key={c.label}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.08 * i }}
              onClick={() => !revealed && setSelected(c.label)}
              disabled={revealed}
              className={`w-full glass p-4 flex items-center gap-3 text-left transition-all ${
                isSelected && !revealed ? "border-emerald-400/50 bg-emerald-900/30" : ""
              } ${showResult && correct ? "border-emerald-400/60 bg-emerald-500/10" : ""} ${
                showResult && !correct ? "border-rose-400/60 bg-rose-500/10" : ""
              } ${showCorrect ? "border-emerald-400/40" : ""}`}
            >
              <div
                className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold font-display shrink-0 ${
                  showResult && correct
                    ? "bg-emerald-400 text-emerald-950"
                    : showResult && !correct
                    ? "bg-rose-400 text-rose-950"
                    : showCorrect
                    ? "bg-emerald-400/20 text-emerald-400"
                    : isSelected
                    ? "bg-emerald-400/20 text-emerald-400"
                    : "bg-emerald-900/40 text-emerald-100/50"
                }`}
              >
                {showResult ? (
                  correct ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />
                ) : (
                  c.label
                )}
              </div>
              <div className="text-sm text-white flex-1">{c.text}</div>
            </motion.button>
          );
        })}
      </section>

      {/* Explanation */}
      <AnimatePresence>
        {revealed && (
          <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-lg mx-auto px-5 mt-5"
          >
            <div className={`glass p-4 ${correct ? "border-emerald-400/30" : "border-rose-400/30"}`}>
              <div className="flex items-center gap-2 mb-2">
                {correct ? (
                  <>
                    <div className="w-7 h-7 rounded-full bg-emerald-400/20 flex items-center justify-center">
                      <Check className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div className="font-semibold text-emerald-400">Correct!</div>
                  </>
                ) : (
                  <>
                    <div className="w-7 h-7 rounded-full bg-rose-400/20 flex items-center justify-center">
                      <X className="w-4 h-4 text-rose-400" />
                    </div>
                    <div className="font-semibold text-rose-400">Not quite</div>
                    <span className="text-xs text-emerald-100/50 ml-1">
                      · Answer: <span className="text-emerald-400 font-bold">{puzzle.correctAnswer}</span>
                    </span>
                  </>
                )}
              </div>
              <p className="text-sm text-emerald-100/70 leading-relaxed">{puzzle.explanation}</p>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* CTA */}
      <div className="fixed bottom-0 left-0 right-0 glass-strong border-t border-emerald-400/10 px-5 py-4 z-40">
        <div className="max-w-lg mx-auto">
          {!revealed ? (
            <button
              onClick={() => setRevealed(true)}
              disabled={!selected}
              className="btn-mint w-full"
            >
              Submit Answer
            </button>
          ) : (
            <button
              onClick={() => router.push(`/quest/${quest.id}/reward`)}
              className="btn-mint w-full"
            >
              {correct ? "Claim Reward" : "Continue Anyway"} <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
