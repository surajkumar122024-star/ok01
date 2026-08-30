'use client'

import { useState, useMemo } from 'react'
import { ToolContentSection } from "@/components/ToolContentSection"
import { toolContent } from "@/data/toolContent"
import { ToolPageGlow } from "@/components/ToolPageGlow"

function calculateAge(dob: Date, at: Date) {
  let years = at.getFullYear() - dob.getFullYear()
  let months = at.getMonth() - dob.getMonth()
  let days = at.getDate() - dob.getDate()

  if (days < 0) {
    months -= 1
    const prevMonth = new Date(at.getFullYear(), at.getMonth(), 0)
    days += prevMonth.getDate()
  }
  if (months < 0) {
    years -= 1
    months += 12
  }
  return { years, months, days }
}

function nextBirthday(dob: Date, from: Date) {
  const next = new Date(from.getFullYear(), dob.getMonth(), dob.getDate())
  if (next.getTime() < new Date(from.getFullYear(), from.getMonth(), from.getDate()).getTime()) {
    next.setFullYear(from.getFullYear() + 1)
  }
  const diffMs = next.getTime() - new Date(from.getFullYear(), from.getMonth(), from.getDate()).getTime()
  const daysUntil = Math.round(diffMs / (1000 * 60 * 60 * 24))
  return { date: next, daysUntil }
}

export default function AgeCalculatorClient() {
  const [dob, setDob] = useState('')
  const [asOf, setAsOf] = useState('')

  const today = useMemo(() => new Date(), [])
  const todayStr = today.toISOString().split('T')[0]

  const result = useMemo(() => {
    if (!dob) return null
    const dobDate = new Date(dob + 'T00:00:00')
    const targetDate = asOf ? new Date(asOf + 'T00:00:00') : today

    if (isNaN(dobDate.getTime())) return null
    if (dobDate.getTime() > targetDate.getTime()) {
      return { error: "Date of birth can't be after the target date." as const }
    }

    const age = calculateAge(dobDate, targetDate)
    const totalDays = Math.floor((targetDate.getTime() - dobDate.getTime()) / (1000 * 60 * 60 * 24))
    const totalWeeks = Math.floor(totalDays / 7)
    const totalMonths = age.years * 12 + age.months
    const nb = nextBirthday(dobDate, targetDate)

    return { age, totalDays, totalWeeks, totalMonths, nextBirthday: nb, error: null as null }
  }, [dob, asOf, today])

  const inputClass = "w-full px-4 py-3 rounded-xl bg-muted/30 border outline-none focus:border-primary text-lg"

  return (
    <div className="force-light min-h-screen bg-background text-foreground pt-32 pb-20 px-4">
      <ToolPageGlow />
      <div className="max-w-2xl mx-auto space-y-8">

        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Age Calculator</h1>
          <p className="text-muted-foreground">Find your exact age in years, months, and days. Free, instant, no sign-up.</p>
        </div>

        <div className="glass rounded-3xl border p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label htmlFor="dob" className="text-sm font-semibold text-muted-foreground">Date of Birth</label>
              <input
                id="dob"
                type="date"
                value={dob}
                max={todayStr}
                onChange={(e) => setDob(e.target.value)}
                className={inputClass}
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="as-of" className="text-sm font-semibold text-muted-foreground">Calculate Age As Of (optional)</label>
              <input
                id="as-of"
                type="date"
                value={asOf}
                onChange={(e) => setAsOf(e.target.value)}
                placeholder="Today"
                className={inputClass}
              />
            </div>
          </div>
          {result?.error && <p className="text-sm text-destructive">{result.error}</p>}
        </div>

        {result && !result.error && (
          <div className="space-y-4">
            <div className="glass rounded-3xl border p-8 text-center space-y-2">
              <p className="text-sm text-muted-foreground">Your age is</p>
              <p className="text-4xl font-bold text-primary">
                {result.age.years} <span className="text-lg font-normal text-muted-foreground">years</span>{' '}
                {result.age.months} <span className="text-lg font-normal text-muted-foreground">months</span>{' '}
                {result.age.days} <span className="text-lg font-normal text-muted-foreground">days</span>
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="glass rounded-2xl border p-4 text-center">
                <p className="text-2xl font-bold text-primary">{result.totalMonths.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground mt-1">Total Months</p>
              </div>
              <div className="glass rounded-2xl border p-4 text-center">
                <p className="text-2xl font-bold text-primary">{result.totalWeeks.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground mt-1">Total Weeks</p>
              </div>
              <div className="glass rounded-2xl border p-4 text-center">
                <p className="text-2xl font-bold text-primary">{result.totalDays.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground mt-1">Total Days</p>
              </div>
              <div className="glass rounded-2xl border p-4 text-center">
                <p className="text-2xl font-bold text-primary">{result.nextBirthday.daysUntil}</p>
                <p className="text-xs text-muted-foreground mt-1">Days to Next Birthday</p>
              </div>
            </div>
          </div>
        )}

        <ToolContentSection data={toolContent["age-calculator"]} />

      </div>
    </div>
  )
}
