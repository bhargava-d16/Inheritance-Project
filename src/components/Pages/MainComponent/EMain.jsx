import React from 'react'

import JSCard from '../../Others/JSCard'

const EMain = () => {
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
                <div className="candidates"> <JSCard></JSCard>
                <JSCard></JSCard>
                <JSCard></JSCard>
                <JSCard></JSCard>
                <JSCard></JSCard> <JSCard></JSCard> <JSCard></JSCard> <JSCard></JSCard> <JSCard></JSCard> <JSCard></JSCard>
                <JSCard></JSCard><JSCard></JSCard><JSCard></JSCard><JSCard></JSCard><JSCard></JSCard><JSCard></JSCard><JSCard></JSCard>
                </div>

            </div>
        </div>
    )
}

export default EMain