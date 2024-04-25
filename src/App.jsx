import React, { useState } from 'react'

const App = () => {
  const [subdomain, setSubdomain] = useState('')
  const [repoUrl, setRepoUrl] = useState('')
  const [siteUrl, setSiteUrl] = useState('')
  const handleSubmit = async (e) =>{
    e.preventDefault()
    console.log(subdomain, repoUrl)
    try {
      const result = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({subdomain, repoUrl})
      })
      const res = await result.json()
      if(res.success){
        setSiteUrl(res.url)
      }
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <main className="min-h-screen bg-gray-50 flex justify-center items-center">
      <form onSubmit={handleSubmit} className='flex shadow-md  flex-col gap-4 border-2 p-4 py-8 rounded-2xl'>
        <h1 className='text-xl md:text-2xl text-center font-bold my-4'>Insta Deploy by Alok Skj</h1>
        <input className='p-2.5 rounded-xl border' required type="text" placeholder='Project Name' name='subdomain' value={subdomain} onChange={(e)=> setSubdomain(e.target.value)}/>
        <input className='p-2.5 rounded-xl border' required type="text" placeholder='Git Url' value={repoUrl} onChange={(e)=> setRepoUrl(e.target.value)}/>
        <button className='p-4 bg-blue-700 text-white font-bold rounded-xl' type='submit'>Deploy</button>
        {siteUrl && <p className='font-semibold'>Website upload successfully : <a className='text-blue-800' href={siteUrl}>{siteUrl}</a></p>}
      </form>
    </main>
  )
}

export default App