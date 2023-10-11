'use client'
import { useState } from 'react'
// import { type ReactionsType } from "@/types/reactionsTypes"

// type Reactions = ReactionsType["reactions"]["Row"][]

const ReactionCounter = () => {
  const [reactionsCount, setReactionsCount] = useState(0);

  
  return (
    <small>{reactionsCount}</small>
  )
}

export default ReactionCounter