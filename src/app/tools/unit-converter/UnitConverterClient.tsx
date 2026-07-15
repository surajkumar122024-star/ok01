<p className="text-center text-xs text-muted-foreground">
          All conversions happen locally in your browser. Nothing is uploaded or stored.
        </p>

        <div className="glass rounded-2xl border p-6 md:p-8 space-y-4">
          <h2 className="text-lg font-semibold">About this converter</h2>
          <p className="text-muted-foreground leading-relaxed text-sm">
            Switching between metric and imperial units comes up constantly — checking a recipe
            written in cups when your kitchen scale reads grams, converting a US shoe size chart
            listed in inches, or figuring out how many kilometers a 10-mile run actually covers.
            This tool covers eight everyday categories (length, weight, temperature, area, volume,
            speed, data storage, and time) with the common units people actually search for, so you
            rarely need to open a second tab to double-check a formula.
          </p>
        </div>

        <div className="glass rounded-2xl border p-6 md:p-8 space-y-3">
          <h2 className="text-lg font-semibold">Common conversions people look up</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
            <div className="rounded-lg bg-muted/50 p-3">
              <p className="font-medium">1 mile</p>
              <p className="text-muted-foreground">1.609 km</p>
            </div>
            <div className="rounded-lg bg-muted/50 p-3">
              <p className="font-medium">1 kg</p>
              <p className="text-muted-foreground">2.205 lb</p>
            </div>
            <div className="rounded-lg bg-muted/50 p-3">
              <p className="font-medium">100°F</p>
              <p className="text-muted-foreground">37.8°C</p>
            </div>
            <div className="rounded-lg bg-muted/50 p-3">
              <p className="font-medium">1 GB</p>
              <p className="text-muted-foreground">1024 MB</p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="text-lg font-semibold px-1">Questions people ask</h2>
          <details className="glass rounded-xl border p-4">
            <summary className="cursor-pointer font-medium text-sm">Why do my results have so many decimal places?</summary>
            <p className="text-muted-foreground text-sm mt-2 leading-relaxed">
              Some conversions (like miles to kilometers) don't land on round numbers, so the tool
              shows up to six decimal places for accuracy. You can round the displayed value to
              whatever precision your use case needs.
            </p>
          </details>
          <details className="glass rounded-xl border p-4">
            <summary className="cursor-pointer font-medium text-sm">Is this accurate enough for professional or scientific use?</summary>
            <p className="text-muted-foreground text-sm mt-2 leading-relaxed">
              The conversion factors used here match standard international definitions (e.g. 1 inch
              = 2.54 cm exactly), so results are accurate for everyday, academic, and most
              professional purposes. For regulated or legal measurements, always confirm against an
              official reference.
            </p>
          </details>
          <details className="glass rounded-xl border p-4">
            <summary className="cursor-pointer font-medium text-sm">Does it work without an internet connection?</summary>
            <p className="text-muted-foreground text-sm mt-2 leading-relaxed">
              Once the page has loaded, all math runs locally in your browser using JavaScript — no
              server call is made for the conversion itself, so it keeps working even on a flaky
              connection.
            </p>
          </details>
        </div>
      </div>
    </div>
  )
}
