import React, { useRef, useState } from 'react'
import { useCreateNewGameMutation } from '../app/shopAPI'


const NewGameModal = ({setShowNewGameModal}) => {
  const gameNameRef = useRef('')
  const playerNameRef = useRef('')
  const [gamePlayers, setGamePlayers] = useState([])
  const [toggleNewPlayer, setToggleNewPlayer] = useState(false)
  const [createGame, {isLoading, error}] = useCreateNewGameMutation()
  const iconColors = [
    'bg-red-600',
    'bg-blue-800',
    'bg-green-600',
    'bg-orange-600',
    'bg-pink-600'
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    if (gamePlayers.length < 1){
      console.log('Must add at least one player')
    }
    if (gameNameRef.current?.value == ''){
      console.log('Must create a name')
    }
    if (gamePlayers.length > 0 && gameNameRef.current?.value != '') {
      createGame({name: gameNameRef.current.value, gamePlayers})
    }
  }

  const handleAddPlayer = (playerName) => {
    if (playerName !== '') {
      setGamePlayers([...gamePlayers, {name: playerName}])
    }
    console.log(iconColors[0])
    setToggleNewPlayer(false)
  }

  return (
    <div onClick={(e) => {e.stopPropagation(); setShowNewGameModal(false)}} className="absolute w-screen h-screen bg-black/25 -top-16 flex items-center justify-center">
      <div onClick={(e) => e.stopPropagation()} className="p-6 bg-white dark:bg-slate-600 rounded-xl w-2/3 h-2/3 flex flex-col justify-between">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold">New Game</h3>
                <button onClick={()=> setShowNewGameModal(false)} className="text-lg text-right">X</button>
        </div>
      <div className='h-full flex flex-col'>
        <form className="flex flex-col gap-4" onSubmit={(e) => handleSubmit(e)}>
          <input placeholder='What game are you playing?' ref={gameNameRef} className="border-2 border-black/50 text-black rounded-xl p-1" autoFocus />
          <div className="h-full flex flex-col flex-1">

              { gamePlayers.length > 0
                ? <div className="flex flex-col">
                  <h3  className="text-lg font-bold">Players</h3>
                  {gamePlayers.map((player, i)=>{
                    return (
                      <div className="flex">
                      <div className={`${iconColors[i]} w-4 h-4 rounded-full`}></div>
                      <p key={i}>{player.name}</p>
                      </div>
                    )
                  })}
                  </div>
                : null
              }
              {toggleNewPlayer
                ? <div className="flex">
                    <input placeholder='Enter player name' ref={playerNameRef} className="w-full text-black" autoFocus/>
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