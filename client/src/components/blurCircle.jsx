import React from 'react'

const blurCircle = ({ top ="auto" , left ="auto" ,right ="auto", bottom ="auto" }) => {
  
  return (
    <div className='absolute -z-50 h-58 w-58 aspect-square  bg-primary/30 rounded-full blur-3xl r5'style={{ top : top, left:left, right: right, bottom:bottom }}>
      
    </div>
  )
}

export default blurCircle
