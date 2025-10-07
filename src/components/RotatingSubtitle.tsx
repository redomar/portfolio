import { useEffect, useState } from 'react'
import { Typewriter } from './Typewriter'

const subtitles = [
  "Programmer. Coffee-fueled code wrangler. Professional project starter (and occasional finisher).",
  "Building web experiences with JavaScript & TypeScript. One bug fix at a time.",
  "Passionate about clean code, elegant solutions, and really good documentation.",
  "Diving deep into configuration rabbit holes so you don't have to.",
  "Turning caffeine into code and ideas into reality. Mostly."
]

export function RotatingSubtitle() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [key, setKey] = useState(0)

  useEffect(() => {
    // Calculate the duration based on text length (roughly 20ms per character + 2s pause)
    const currentText = subtitles[currentIndex]
    const typingDuration = currentText.length * 20
    const pauseDuration = 2000
    const totalDuration = typingDuration + pauseDuration

    const timer = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % subtitles.length)
      setKey((prev) => prev + 1) // Force re-render of Typewriter
    }, totalDuration)

    return () => clearTimeout(timer)
  }, [currentIndex])

  return (
    <Typewriter
      key={key}
      text={subtitles[currentIndex]}
      delay={20}
    />
  )
}
