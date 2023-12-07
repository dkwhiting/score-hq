import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { useGetSingleGameQuery } from '../app/shopAPI'


const SingleGameDash = () => {
  const currentUser = useSelector(state=> state.user?.currentUser)
  const params = useParams()
  const { data, error, isLoading } = useGetSingleGameQuery(params.gameId)

  console.log(params.gameId)
  console.log(data, error)



  return (
    <div className="h-full">{data?.name}</div>
  )
}

export default SingleGameDash