import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { X } from 'lucide-react'

interface SkillInputProps {
  skills: string[]
  setSkills: React.Dispatch<React.SetStateAction<string[]>>
}

export default function SkillInput({ skills, setSkills }: SkillInputProps) {
  const [currentSkill, setCurrentSkill] = useState('')

  const handleAddSkill = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && currentSkill.trim() !== '') {
      setSkills([...skills, currentSkill.trim()])
      setCurrentSkill('')
    }
  }

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove))
  }

  return (
    <div>
      <Label htmlFor="skills">Skills</Label>
      <Input
        id="skills"
        type="text"
        placeholder="Enter a skill and press Enter"
        value={currentSkill}
        onChange={(e) => setCurrentSkill(e.target.value)}
        onKeyPress={handleAddSkill}
      />
      <div className="flex flex-wrap gap-2 mt-2">
        {skills.map((skill, index) => (
          <Badge key={index} variant="secondary" className="text-sm py-1 px-2">
            {skill}
            <X
              className="h-4 w-4 ml-1 cursor-pointer"
              onClick={() => handleRemoveSkill(skill)}
            />
          </Badge>
        ))}
      </div>
    </div>
  )
}

