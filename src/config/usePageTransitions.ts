"use client"

import { useState, useCallback } from "react"

export interface TransitionState {
  isTransitioning: boolean
  currentPage: string
  isLoading: boolean
}

export const usePageTransitions = (initialPage = "home") => {
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [currentPage, setCurrentPage] = useState(initialPage)
  const [isLoading, setIsLoading] = useState(true)

  const transitionToPage = useCallback(
    (page: string) => {
      if (page === currentPage || isTransitioning) return

      setIsTransitioning(true)

      // Simulate page transition delay
      setTimeout(() => {
        setCurrentPage(page)
        setTimeout(() => {
          setIsTransitioning(false)
        }, 500)
      }, 500)
    },
    [currentPage, isTransitioning],
  )

  const finishLoading = useCallback(() => {
    setIsLoading(false)
  }, [])

  return {
    isTransitioning,
    currentPage,
    isLoading,
    transitionToPage,
    finishLoading,
  }
}
