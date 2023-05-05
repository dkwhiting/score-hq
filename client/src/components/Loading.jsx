import React from 'react'

const Loading = ({message}) => {
  return (
    <div className="flex items-center justify-center absolute top-0 left-0 w-screen h-screen bg-white/75">
      <p className="text-3xl">
        {message}
      </p>
    </div>
  )
}

export default Loading