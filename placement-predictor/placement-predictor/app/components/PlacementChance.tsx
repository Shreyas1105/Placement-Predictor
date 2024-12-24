import { useEffect, useState } from 'react'
import { Progress } from "@/components/ui/progress"

interface PlacementChanceProps {
  chance: number
}

export default function PlacementChance({ chance }: PlacementChanceProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => setProgress(chance), 100)
    return () => clearTimeout(timer)
  }, [chance])

  const getColorClass = () => {
    if (chance < 30) return 'text-red-500'
    if (chance < 70) return 'text-yellow-500'
    return 'text-green-500'
  }

  return (
    <div>
      <Progress value={progress} className="w-full h-4" />
      <p className={`mt-2 text-2xl font-bold ${getColorClass()}`}>
        {chance}% Chance of Placement
      </p>
      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
        {chance < 30 && "Keep improving your skills and grades!"}
        {chance >= 30 && chance < 70 && "You're on the right track. Keep it up!"}
        {chance >= 70 && "Great job! You have a high chance of placement."}
      </p>
    </div>
  )
}

