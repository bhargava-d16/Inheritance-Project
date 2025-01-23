import React, { useEffect } from 'react'
import Section1 from './Section1'
import Section2 from './Section2'
import Testimonial from './testimonial'
const Main = () => {
    return (
        <div>
            <Section1 />
            <div className='section2'>
                <Section2 />
                <Section2 />
                <Section2 />
                <Section2 />
            </div>
            <Testimonial />
        </div>
    )
}

export default Main