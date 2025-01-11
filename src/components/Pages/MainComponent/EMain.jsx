import React from 'react'
import { useEffect,useState } from 'react'
import axios from 'axios'
import JSCard from '../../Others/JSCard'

const EMain = () => {
    const [data, setData] = useState(null)
        const fetchJSdata=async()=>{
            const response=await axios.get('http://localhost:8080/EDashboard').then(response=>{
                setData(response.data)
            }).catch(error=>{console.log(error)})
        }
    
        useEffect(() => {
            fetchJSdata();
        },)
    return (
        <div>
            <div className="heading bg-red-500">
                <h3>Empowering Your Hiring with Multi-Skilled Candidates</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique earum, necessitatibus blanditiis, consectetur in hic quidem natus voluptatem quasi voluptates, a labore deleni</p>
            </div>
            <div className="X">
                <div>
                <input className='search' type="text" placeholder='Search Here' name='search' />
                <button className='JSbutton '>Search</button>
                </div>
                <div className="candidates">
                    {data && Array.isArray(data) && data.map((e,idx)=>{return <JSCard 
                        key={idx}
                        name={e.name}
                        location={e.place}
                        DOB={e.DOB}
                        skills={e.skills.join(',')}
                        exp={e.workexperices}></JSCard>})
                    }
                </div>

            </div>
        </div>
    )
}

export default EMain
