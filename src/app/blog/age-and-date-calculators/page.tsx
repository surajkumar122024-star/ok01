import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'How Old Am I Exactly? Age & Date Calculators Explained',
  description: 'How to calculate exact age in years, months, and days, and how to count days between two dates correctly — including the one detail most people get wrong.',
  keywords: 'age calculator, how old am i, date difference calculator, days between dates, calculate age from date of birth',
  openGraph: {
    title: 'How Old Am I Exactly? Age & Date Calculators Explained',
    description: 'How to calculate exact age in years, months, and days, and how to count days between two dates correctly — including the one detail most people get wrong.',
    url: '/blog/age-and-date-calculators',
    type: 'article',
  },
  alternates: { canonical: '/blog/age-and-date-calculators' },
}

export default function AgeAndDateCalculatorsArticle() {
  return (
    <article className="min-h-screen pt-32 pb-20 px-4">
      <div className="max-w-3xl mx-auto space-y-8">

        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/blog" className="hover:text-foreground">Blog</Link>
            <span>→</span>
            <span>Everyday Tools</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
            &quot;How Old Am I, Exactly?&quot; — And Other Date Math
          </h1>
          <p className="text-muted-foreground text-lg">
            Two questions people search for constantly, and the one counting mistake that trips up
            almost everyone doing it by hand.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>📅 August 2026</span>
            <span>•</span>
            <span>⏱ 4 min read</span>
            <span>•</span>
            <span>🏷 Everyday Tools</span>
          </div>
        </div>

        <hr className="border-border" />

        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6 text-base leading-relaxed">

          <p>
            Both of these come down to subtracting dates — but calendars don&apos;t divide evenly,
            which is exactly why doing this by hand goes wrong more often than it should.
          </p>

          <h2 className="text-2xl font-bold mt-8">Q: I know my birth date. Why isn&apos;t my age just this year minus my birth year?</h2>
          <p>
            Because that only works after your birthday has passed this year. Someone born on
            15 November, checking their age on 1 August, is still one year younger than a plain
            year-subtraction suggests — their birthday for this year hasn&apos;t happened yet.
          </p>
          <p>
            The correct approach subtracts years, then checks whether the current month/day has
            reached the birth month/day yet — borrowing a year if not, the same way you&apos;d borrow
            when subtracting a larger number from a smaller one. The{' '}
            <Link href="/tools/age-calculator" className="text-primary underline underline-offset-2">Age Calculator</Link>{' '}
            handles that borrowing automatically and also shows total days, weeks, and months lived,
            plus a countdown to your next birthday.
          </p>

          <h2 className="text-2xl font-bold mt-8">Q: I need to count the days between two dates. Do I include both dates or not?</h2>
          <p>
            This is the detail that causes the most off-by-one errors. If a booking runs from the 1st
            to the 5th of a month, is that 4 days or 5 days? Both are &quot;correct&quot; depending on what
            you&apos;re counting — 4 nights of a hotel stay, but 5 calendar days if you&apos;re counting every
            day the room was occupied, including both the 1st and the 5th.
          </p>
          <p>
            The{' '}
            <Link href="/tools/date-difference-calculator" className="text-primary underline underline-offset-2">Date Difference Calculator</Link>{' '}
            has an explicit toggle for this — leave it off for a plain gap between two dates (like
            days until a deadline), or turn it on when both endpoints should count (event durations,
            inclusive booking ranges).
          </p>

          <h2 className="text-2xl font-bold mt-8">A worked example: age is a calendar calculation</h2>
          <p>
            Imagine someone was born on 15 November 2000 and checks their age on 1 August 2026.
            Subtracting the years alone gives 26, but the November birthday has not arrived yet.
            The completed age is therefore 25 years, with the remaining months and days counted
            from the last birthday. This is why an age calculator needs the full birth date and
            the date on which the age is being checked, not just two year numbers.
          </p>
          <p>
            The same rule matters when comparing two people or checking an age requirement:
            decide which date is the reference date first. An age on the day an application is
            submitted may differ from the age on the application deadline or event date.
          </p>

          <h2 className="text-2xl font-bold mt-8">Date ranges: choose the counting rule before you calculate</h2>
          <p>
            For a simple gap, subtract the start date from the end date. For a range where every
            calendar date is included, add one to that gap. For example, 1 August through 5 August
            covers five calendar dates, while the elapsed time from the start of 1 August to the
            start of 5 August is four days. Neither result is a calculator error: they answer
            different questions.
          </p>
          <p>
            For travel, check-in and check-out dates are often counted as nights rather than
            occupied calendar dates. For a school or work attendance record, the counting rule
            may instead depend on the institution. Confirm the rule before using a date total
            for an official form or deadline.
          </p>

          <h2 className="text-2xl font-bold mt-8">Leap years, birthdays, and time zones</h2>
          <p>
            A leap year adds 29 February, so a day-count calculation across February can differ
            from a non-leap year. People born on 29 February should also check the rule used by
            the relevant institution when an age threshold matters; legal and administrative
            rules can define the birthday treatment for their own purpose.
          </p>
          <p>
            Date-only calculations are different from measuring elapsed hours. If you are
            comparing timestamps across locations, time zones and daylight-saving changes can
            affect the number of hours between two local clock readings. Use the correct
            location and time zone when the exact hour matters.
          </p>

          <h2 className="text-2xl font-bold mt-8">Q: Why does a date-difference tool show months differently than I&apos;d expect?</h2>
          <p>
            Because months aren&apos;t a fixed number of days — going from 31 January to 28 February is
            one month, even though that&apos;s fewer days than going from 1 March to 28 March. A tool that
            divides total days by 30 to approximate &quot;months&quot; will drift out of sync with the actual
            calendar the longer the date range gets. Calculating years/months/days the way a calendar
            actually works (like both tools here do) avoids that drift entirely.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
            <Link href="/tools/age-calculator" className="glass rounded-xl border p-5 hover:border-primary/40 transition">
              <p className="font-semibold">Age Calculator →</p>
              <p className="text-sm text-muted-foreground mt-1">Exact age in years, months, days + next birthday countdown.</p>
            </Link>
            <Link href="/tools/date-difference-calculator" className="glass rounded-xl border p-5 hover:border-primary/40 transition">
              <p className="font-semibold">Date Difference Calculator →</p>
              <p className="text-sm text-muted-foreground mt-1">Days, weeks, and months between any two dates.</p>
            </Link>
          </div>

        </div>
      </div>
    </article>
  )
}
