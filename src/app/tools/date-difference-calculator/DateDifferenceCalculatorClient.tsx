'use client'

import { useState, useMemo } from 'react'
import { ToolContentSection } from "@/components/ToolContentSection"
import { toolContent } from "@/data/toolContent"
import { ToolPageGlow } from "@/components/ToolPageGlow"

function diffYMD(start: Date, end: Date) {
  let years = end.getFullYear() - start.getFullYear()
  let months = end.getMonth() - start.getMonth()
  let days = end.getDate() - start.getDate()

  if (days < 0) {
    months -= 1
    const prevMonth = new Date(end.getFullYear(), end.getMonth(), 0)
    days += prevMonth.getDate()
  }
  if (months < 0) {
    years -= 1
    months += 12
  }
  return { years, months, days }
}

export default function DateDifferenceCalculatorClient() {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [includeEndDay, setIncludeEndDay] = useState(false)

  const today = useMemo(() => new Date().toISOString().split('T')[0], [])

  const result = useMemo(() => {
    if (!startDate || !endDate) return null
    const start = new Date(startDate + 'T00:00:00')
    const end = new Date(endDate + 'T00:00:00')
    if (isNaN(start.getTime()) || isNaN(end.getTime())) return null

    const earlier = start.getTime() <= end.getTime() ? start : end
    const later = start.getTime() <= end.getTime() ? end : start
    const swapped = start.getTime() > end.getTime()

    const extraDay = includeEndDay ? 1 : 0
    const totalDays = Math.round((later.getTime() - earlier.getTime()) / (1000 * 60 * 60 * 24)) + extraDay
    const totalWeeks = Math.floor(totalDays / 7)
    const remainderDays = totalDays % 7
    const ymd = diffYMD(earlier, new Date(later.getTime() + extraDay * 86400000))
    const totalMonths = ymd.years * 12 + ymd.months

    return { totalDays, totalWeeks, remainderDays, totalMonths, ymd, swapped }
  }, [startDate, endDate, includeEndDay])

  const inputClass = "w-full px-4 py-3 rounded-xl bg-muted/30 border outline-none focus:border-primary text-lg"

  return (
    <div className="force-light min-h-screen bg-background text-foreground pt-32 pb-20 px-4">
      <ToolPageGlow />
      <div className="max-w-2xl mx-auto space-y-8">

        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Date Difference Calculator</h1>
          <p className="text-muted-foreground">Find the exact number of days, weeks, months, and years between two dates.</p>
        </div>

        <div className="glass rounded-3xl border p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label htmlFor="start-date" className="text-sm font-semibold text-muted-foreground">Start Date</label>
              <input id="start-date" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className={inputClass} />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="end-date" className="text-sm font-semibold text-muted-foreground">End Date</label>
              <input id="end-date" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} placeholder={today} className={inputClass} />
            </div>
          </div>
          <div className="flex items-center justify-between p-4 bg-muted/30 rounded-xl">
            <span className="text-sm font-medium">Include the end date in the count</span>
            <button
              onClick={() => setIncludeEndDay(!includeEndDay)}
              aria-label="Include the end date in the count"
              aria-pressed={includeEndDay}
              className={`w-12 h-6 rounded-full transition-colors relative flex-shrink-0 ${includeEndDay ? 'bg-primary' : 'bg-muted'}`}
            >
              <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${includeEndDay ? 'left-7' : 'left-1'}`} />
            </button>
          </div>
        </div>

        {result && (
          <div className="space-y-4">
            {result.swapped && (
              <p className="text-sm text-muted-foreground text-center">Note: end date was earlier than start date — showing the absolute difference.</p>
            )}
            <div className="glass rounded-3xl border p-8 text-center space-y-2">
              <p className="text-sm text-muted-foreground">Difference</p>
              <p className="text-4xl font-bold text-primary">
                {result.ymd.years} <span className="text-lg font-normal text-muted-foreground">years</span>{' '}
                {result.ymd.months} <span className="text-lg font-normal text-muted-foreground">months</span>{' '}
                {result.ymd.days} <span className="text-lg font-normal text-muted-foreground">days</span>
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="glass rounded-2xl border p-4 text-center">
                <p className="text-2xl font-bold text-primary">{result.totalDays.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground mt-1">Total Days</p>
              </div>
              <div className="glass rounded-2xl border p-4 text-center">
                <p className="text-2xl font-bold text-primary">{result.totalWeeks.toLocaleString()}<span className="text-sm text-muted-foreground"> w</span> {result.remainderDays}<span className="text-sm text-muted-foreground"> d</span></p>
                <p className="text-xs text-muted-foreground mt-1">Weeks + Days</p>
              </div>
              <div className="glass rounded-2xl border p-4 text-center">
                <p className="text-2xl font-bold text-primary">{result.totalMonths.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground mt-1">Total Months</p>
              </div>
            </div>
          </div>
        )}

        <ToolContentSection data={toolContent["date-difference-calculator"]} />

      </div>
    </div>
  )
}
