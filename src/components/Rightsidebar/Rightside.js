import React from 'react'

function Rightside() {
  return (
    <div>
      <div>
        <input type='text' className='border-black outline-none bg-gray-300 h-8 rounded-full pl-5 mt-5 mr-10 w-96'></input>
      </div>

      
            <div>
                <h1>Who to Follow</h1>
                <div className='flex'>
                <div className=''>
                    <h1>Yash</h1>
                    <p>@yogeshkumar</p>
                </div>
                <div>
                    <button className='bg-gray-500'>Follow</button>
                </div>
                </div>
            </div>
    </div>
  )
}

export default Rightside
