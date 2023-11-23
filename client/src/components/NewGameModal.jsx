import React from 'react'

const NewGameModal = ({setShowNewGameModal}) => {

  const handleSubmit = () => {

  }

  return (
    <div onClick={(e) => {e.stopPropagation(); setShowNewGameModal(false)}} className="absolute w-screen h-screen bg-black/25 -top-16 flex items-center justify-center">
      <div onClick={(e) => e.stopPropagation()} className="bg-white rounded-xl w-2/3 h-2/3 flex flex-col">
      <button onClick={()=> setShowNewGameModal(false)} className="p-2 text-xl text-right">X</button>
      <div>
        <form onSubmit={() => handleSubmit()}>

        </form>
      </div>
      </div>
    </div>
  )
}

export default NewGameModal