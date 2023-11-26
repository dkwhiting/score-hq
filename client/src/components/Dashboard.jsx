import React, { useState } from 'react'
import {useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useGetAllGamesQuery } from '../app/shopAPI';
import { setGames } from '../app/gamesSlice';
import Skeleton from './Skeleton';
import NewGameModal from './NewGameModal';

const Dashboard = ({navigation}) => {
  const dispatch = useDispatch()
  const currentUser = useSelector(state=> state.user?.currentUser)
  const { data, error, isLoading } = useGetAllGamesQuery(currentUser?.id)
  const games = useSelector(state => state.games?.games)
  const [showNewGameModal, setShowNewGameModal] = useState(false)
  
  useEffect(()=>{
    if (currentUser){
      dispatch(setGames(data))
    }    
  }, [currentUser])


  return (
    <div className="flex flex-col flex-1 m-6 items-center gap-2 relative">
      <button onClick={()=>setShowNewGameModal(true)}>New Game</button>
      {
        isLoading
        ? <div className="w-full flex flex-col gap-2">
        <div className="w-full">
          <h3>In Progress</h3>
          <Skeleton />
        </div>
        <div className="w-full">
          <h3>Completed</h3>
          <Skeleton />
        </div>
        </div>
        
        : <div className="w-full flex flex-col gap-2">
          {data?.filter((game) =>{return !game.completed}).length > 0
          ? <div className="w-full">
            <h3>In Progress</h3>
              {data?.length > 0
                ? data
                  .filter((game) =>{
                    return !game.completed
                  })
                  .map(game =>{
                    return(
                      <div role="status" key={game.id} className="w-full p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow dark:divide-gray-700 md:p-6 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                          <div>
                            <p>{game.name}</p>
                          </div>
                        </div>
                      </div>
                    )
                  })
                : null
              }
          </div>
          : <a href="#">Click here to start a new game</a>
        }
        
        {data?.filter((game) =>{return game.completed}).length > 0
          ? <div className="w-full">
            <h3>Completed</h3>
              {data?.length > 0
                ? data
                  .filter((game) =>{
                    return !game.completed
                  })
                  .map(game =>{
                    return(
                      <div role="status" key={game.id} className="w-full p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow dark:divide-gray-700 md:p-6 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                          <div>
                            <p>{game.name}</p>
                          </div>
                        </div>
                      </div>
                    )
                  })
                : null
              }
          </div>
          : null
        }
         </div>
      }
      {showNewGameModal
        ? <NewGameModal setShowNewGameModal={setShowNewGameModal}/>
        : null
      }
    </div>
  )
}

export default Dashboard