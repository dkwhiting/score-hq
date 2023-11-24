import React, { useRef, useState } from 'react'
import { useCreateNewGameMutation } from '../app/shopAPI'

const NewGameModal = ({setShowNewGameModal}) => {
  const gameNameRef = useRef('')
  const playerNameRef = useRef('')
  const [gamePlayers, setGamePlayers] = useState([])
  const [toggleNewPlayer, setToggleNewPlayer] = useState(false)
  const [createGame, {isLoading, error}] = useCreateNewGameMutation()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (gamePlayers.length < 1){
      console.log('Must add at least one player')
    }
    if (gameNameRef.current?.value == ''){
      console.log('Must create a name')
    }
    if (gamePlayers.length > 1 && gameNameRef.current?.value != '') {
      createGame({name: gameNameRef.current.value, gamePlayers})
    }
  }

  const handleAddPlayer = (playerName) => {
    if (playerName !== '') {
      setGamePlayers([...gamePlayers, playerName])
    }
    setToggleNewPlayer(false)
  }

  return (
    <div onClick={(e) => {e.stopPropagation(); setShowNewGameModal(false)}} className="absolute w-screen h-screen bg-black/25 -top-16 flex items-center justify-center">
      <div onClick={(e) => e.stopPropagation()} className="p-6 bg-white rounded-xl w-2/3 h-2/3 flex flex-col justify-between">
      <button onClick={()=> setShowNewGameModal(false)} className="p-2 text-xl text-right">X</button>
      <div className='h-full flex flex-col'>
        <h3>New Game</h3>
        <form className="flex flex-col" onSubmit={(e) => handleSubmit(e)}>
          <input placeholder='Game ' ref={gameNameRef} className="" />
          <div className="h-full flex flex-col flex-1">

              { gamePlayers.length > 0
                ? <div className="flex flex-col">
                  <h3>Players</h3>
                  {gamePlayers.map((player, i)=>{
                    return <p key={i}>{player}</p>
                  })}
                  </div>
                : null
              }
              {toggleNewPlayer
                ? <div className="flex">
                    <input placeholder='Name' ref={playerNameRef} className="w-full" />
                    <button onClick={()=>handleAddPlayer(playerNameRef.current.value)}>✅</button>
                    <button>❌</button>
                  </div>
                : <button onClick={()=>setToggleNewPlayer(true)}>Add New Player</button>
              }
          </div>
          
            <button className='justify-self-end' type="submit">Submit</button>
        </form>
      </div>
      </div>
    </div>
  )
}

export default NewGameModal