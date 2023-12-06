import React, { useRef, useState } from 'react'
import { useCreateNewGameMutation } from '../app/shopAPI'
import { useSelector } from 'react-redux'
import { Icon } from '@iconify/react'


const NewGameModal = ({setShowNewGameModal}) => {
  const currentUser = useSelector(state=> state.user?.currentUser)
  const gameNameRef = useRef('')
  const [playerName, setPlayerName] = useState(currentUser.name)
  const [gamePlayers, setGamePlayers] = useState([])
  const [toggleNewPlayer, setToggleNewPlayer] = useState(true)
  const [createGame, {isLoading, error}] = useCreateNewGameMutation()
  const iconColors = [
    'bg-green-600',
    'bg-red-600',
    'bg-blue-600',
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
      setShowNewGameModal(false)
      setPlayerName(false)
      setGamePlayers([])
    }
  }

  const handleEnter = (e) => {
    if (e.target.className.includes('player-input') && e.key === "Enter"){
      handleAddPlayer(playerName)
    }
  }

  const handleAddPlayer = (playerName) => {
    if (playerName !== '') {
      setGamePlayers([...gamePlayers, {name: playerName}])
      setPlayerName('')
      // setToggleNewPlayer(false)
    }
  }

  return (
    <div className="absolute w-screen h-screen bg-black/25 -top-16 flex items-center justify-center">
      <div className="p-6 bg-white dark:bg-slate-600 rounded-xl w-full h-full md:h-2/3 md:w-2/3 flex flex-col justify-between">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-4xl font-bold">New Game</h3>
          <button onClick={()=> setShowNewGameModal(false)} className="text-2xl text-right w-10 h-10">
            <Icon icon="ph:x-bold" color="#E74C3C" className="w-full h-full" />
          </button>
        </div>
        <div className='h-full flex flex-col'>
          <form className="flex flex-col gap-4 h-full" onSubmit={(e) => handleSubmit(e)}>
            <input placeholder='What game are you playing?' ref={gameNameRef} className="border-2 border-black/50 text-black rounded-xl p-1" autoFocus />
            <div className="h-full flex flex-col flex-1 grow">
              <h3  className="text-xl font-bold mb-2">Players</h3>
              <div className="flex flex-col gap-1 w-full">
                { gamePlayers.length > 0
                  ? <>
                    {gamePlayers.map((player, i)=>{
                      return (
                        <div className="flex items-center gap-2 flex-none">
                        <div className={`${iconColors[i]} w-8 h-8 rounded-full border-2 dark:border-white/75 border-black/75 flex items-center justify-center`}>
                          <p className="font-bold text-xl text-white">{player.name.toUpperCase().slice(0,1)}</p>
                        </div>
                        <p className="text-lg grow" key={i}>{player.name}</p>
                        <div className="hover:cursor-pointer flex-0 h-8 w-8 text-2xl flex-none flex items-center justify-center" onClick={()=> setGamePlayers(gamePlayers.filter((p)=> p.name != player.name))}>
                          <Icon icon="ion:trash" className="w-full h-full" />
                        </div>
                        </div>
                      )
                    })}
                    </>
                  : null
                }
                {toggleNewPlayer
                  ? <div className="flex items-center gap-2">
                      <input onKeyUp={(e)=>handleEnter(e)} placeholder='Enter player name' value={playerName} className="player-input grow w-full border-2 border-black/50 text-black rounded-xl p-1" onChange={(e)=>setPlayerName(e.target.value)} autoFocus/>
                      <div className="hover:cursor-pointer flex-0 h-8 w-8 text-2xl flex-none flex items-center justify-center" onClick={()=>handleAddPlayer(playerName)}>
                        <Icon icon="ph:check-bold" color="#58D68D" className="w-full h-full" />
                      </div>
                      <div className="hover:cursor-pointer flex-0 h-8 w-8 text-2xl flex-none flex items-center justify-center" onClick={()=> {setToggleNewPlayer(false); setPlayerName('')}}>
                        <Icon icon="ph:x-bold" color="#E74C3C" className="w-full h-full" />
                      </div>
                    </div>
                  : <button onClick={()=>setToggleNewPlayer(true)}>Add New Player</button>
                }
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <h3  className="text-xl font-bold mb-2">Settings</h3>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" value="" class="sr-only peer" />
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-400 dark:peer-focus:ring-orange-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-orange-600"></div>
                <span class="ms-3 text-md font-medium text-gray-900 dark:text-gray-300">Highest score wins</span>
              </label>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" value="" class="sr-only peer" />
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-400 dark:peer-focus:ring-orange-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-orange-600"></div>
                <span class="ms-3 text-md font-medium text-gray-900 dark:text-gray-300">Allow ties</span>
              </label>
            </div>  
            <button className='justify-self-end' type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default NewGameModal