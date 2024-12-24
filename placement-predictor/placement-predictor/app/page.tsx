"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Radar } from 'react-chartjs-2'
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js'
import { Sun, Moon } from 'lucide-react'
import SkillInput from './components/SkillInput'
import PlacementChance from './components/PlacementChance'

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend)

export default function PlacementPredictor() {
  const [darkMode, setDarkMode] = useState(false)
  const [skills, setSkills] = useState<string[]>([])
  const [cgpa, setCGPA] = useState('')
  const [placementChance, setPlacementChance] = useState<number | null>(null)

  const handlePrediction = async () => {
    // In a real application, this would be an API call to your backend
    // For demonstration, we'll use a mock prediction
    const mockPrediction = Math.floor(Math.random() * 101)
    setPlacementChance(mockPrediction)
  }

  const radarData = {
    labels: skills,
    datasets: [
      {
        label: 'Skill Level',
        data: skills.map(() => Math.floor(Math.random() * 5) + 1), // Mock data, replace with actual skill levels
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgb(75, 192, 192)',
        pointBackgroundColor: 'rgb(75, 192, 192)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(75, 192, 192)'
      }
    ]
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="container mx-auto p-4 bg-gray-100 dark:bg-gray-900 min-h-screen transition-colors duration-300">
        <Card className="mb-8">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-3xl font-bold">Placement Predictor</CardTitle>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setDarkMode(!darkMode)}
                aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
              >
                {darkMode ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
              </Button>
            </div>
            <CardDescription>Estimate your placement chances based on your skills and CGPA</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <Label htmlFor="cgpa">CGPA</Label>
                <Input
                  id="cgpa"
                  type="number"
                  placeholder="Enter your CGPA"
                  value={cgpa}
                  onChange={(e) => setCGPA(e.target.value)}
                  min="0"
                  max="10"
                  step="0.01"
                />
              </div>
              <SkillInput skills={skills} setSkills={setSkills} />
            </div>
            <div className="mt-6">
              <Button onClick={handlePrediction} className="w-full">Predict Placement Chance</Button>
            </div>
          </CardContent>
        </Card>

        {skills.length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Your Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <Radar data={radarData} />
            </CardContent>
          </Card>
        )}

        {placementChance !== null && (
          <Card>
            <CardHeader>
              <CardTitle>Placement Prediction</CardTitle>
            </CardHeader>
            <CardContent>
              <PlacementChance chance={placementChance} />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

