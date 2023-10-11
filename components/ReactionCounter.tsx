'use client'
import { useState } from 'react'
import { type ReactionsType } from "@/types/reactionsTypes"

type Reactions = ReactionsType["reactions"]["Row"][]

const ReactionCounter = ({reactions}: { reactions: Reactions}) => {
  const [reactionsCount, setReactionsCount] = useState(0);

  
  return (
    <small>{reactionsCount}</small>
  )
}

export default ReactionCounter