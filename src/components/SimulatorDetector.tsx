"use client"

import { useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"

function DetectorContent() {
  const searchParams = useSearchParams()
  const isSim = searchParams.get("sim") === "true"

  useEffect(() => {
    if (isSim) {
      document.documentElement.classList.add("simulator-mode")
    } else {
      document.documentElement.classList.remove("simulator-mode")
    }
  }, [isSim])

  return null
}

export function SimulatorDetector() {
  return (
    <Suspense fallback={null}>
      <DetectorContent />
    </Suspense>
  )
}
