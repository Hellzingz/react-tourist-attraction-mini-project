import React, { useEffect, useState } from 'react'
import { FaLink } from "react-icons/fa6";
import axios from 'axios'

function TouristAttraction() {

    const [data,setData] = useState([])
    const [status,setStatus] = useState("")
    const [query,setQuery] = useState("")

    const isLoading = status === "Loading"
    const isError = status === "Error"
    const isCompeled= status === "Completed"

    useEffect(()=>{
        const getData = async () =>{
            try{
            setStatus("Loading")
            const {data} = await axios.get(`http://localhost:4001/trips?keywords=${query}`) 
            console.log(data.data);           
            setData(data.data)
            setStatus("Completed")
            }catch(err){
            setStatus("Error")    
            console.log(err);    
            }        
        }
        getData()
    },[query])

  return (
    <div className='container mx-auto'>
        <h1 className='text-5xl text-center'>เที่ยวไหนดี</h1>
        <p>ค้นหาที่เที่ยว</p>
        <input 
        type="text" 
        placeholder='หาที่เที่ยวแล้วไปกัน...' 
        className='border-b-1' 
        onChange={e=>setQuery(e.target.value)}/>
        {data.map((location=>
            <div key={location.eid}
            className='flex mt-5 relative'>
                <div>
                    <img src={location.photos[0]} alt={location.title} 
                    className='rounded-xl h-54 w-84'/>   
                </div>
                <div className='flex flex-col gap-1 w-[70%] ml-5'>
                    <p className='font-semibold text-2xl'>{location.title}</p>
                    <p className='line-clamp-1'>{location.description.length > 100
                    ? location.description.slice(0, 100) + "..."
                    : location.description
                    }</p>
                    <p className='text-sky-400 underline cursor-pointer'><a href={location.url}>อ่านต่อ</a></p>
                    <div className='flex gap-2'>
                        <p>หมวด :</p>
                        {location.tags.map(tag=>(
                            <p key={tag} className='underline'>{tag}</p>
                        ))}                       
                    </div>
                    <div className='flex gap-2 mt-5'>
                        <img src={location.photos[1]} width={100} alt={location.title} className='rounded-sm'/>
                        <img src={location.photos[2]} width={100} alt={location.title} className='rounded-sm'/>
                        <img src={location.photos[3]} width={100} alt={location.title} className='rounded-sm'/>
                    </div>
                </div>
                <div className='absolute right-5 bottom-2'>
                    <a href={location.url}><FaLink color='skyblue' size={25}/></a>
                </div>
            </div>
        ))}
    </div>
  )
}

export default TouristAttraction