import React from 'react'
import axios from 'axios'
import { useEffect } from 'react'
const JSCard = () => {
    const fetchJSdata=async()=>{
        axios.get('http://localhost:8080/Edashboard').then(response=>{
        }).catch(error=>{console.log(error)})
    }

    useEffect(() => {
        fetchJSdata();
      
    }, [])
    
    return (
        <div className='jscard'>
            <div className="s1">
                <img className='jsimage' src="public/images/person1.png" alt="Profile Photo" />
                <div className='s1info'>
                    <h4>Dave Gray</h4>
                    <p>Age:35</p>
                </div>
            </div>
            <div className="s2">
                <h4>Skills</h4>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequuntur excepturi explicabo totam possimus culpa ipsum repellat ipsam vero impedit quasi?</p>
                <h6>Experience: 3 years</h6>
            </div>
            <div className="btns">
                <button className='viewprofilebtn '>View Profile</button>
                <button className='shortlistbtn '>ShortList</button>
            </div>
        </div>
    )
}

export default JSCard