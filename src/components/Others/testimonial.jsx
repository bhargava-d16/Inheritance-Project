import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

 export default function Testimonial(){
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    
  };
  return (
   <div className='w-3/4 m-auto ' >
         <div className='mt-20 mb-10'>
          <h2 id="testheading">Our Testimonials</h2>
         <Slider {...settings}>
            {reviews.map((d)=>(
                <div key={d.id} className='h-50 text-black rounded-xl'>
                   <div className='h-30 rounded-t-xl bg-white flex justify-center items-center'>
                      <img src={d.image} alt="" className='h-44 w-44'/>
                    </div> 
                    <div className='rounded-b-xl  p-4 flex flex-col justify-center items-center gap-4 text-center'>
                        <p className='text-xl font-semibold'>{d.name}</p>
                        <p>{d.text}</p>
                        <button className='rounded-xl bg-slate-900 text-white text-lg px-6'>Read More</button>
                    </div>
                </div>
            ))}
                
          </Slider>
         </div>
   </div>
  )
}

const reviews = [
    {
      id:1,
      image:'/images/person.png',
      name: 'John Doe',
      text: 'I was extremely pleased with the quality of the product. It exceeded my expectations and provided great value for the price.',
    },
    {
      id:2,
      image:'/images/person1.png',
      name: 'Jane Smith',
      text: 'The customer service was excellent. They were responsive and helpful throughout the entire process, making it a smooth experience for me.',
    },
    {
      id:3,
      image:'/images/person2.png',
      name: 'Alex Johnson',
      text: 'The attention to detail in their work is impressive. Every aspect of the project was handled with precision and care. I highly recommend their services.',
    },
    {
      id:4,
      image:'/images/person3.png',
      name: 'Emily Davis',
      text: 'The team demonstrated a deep understanding of my requirements. They were able to capture the essence of my vision.',
    },
    {
      id:5,
      image:'/images/person.png',
      name: 'David Miller',
      text: "The product not only met but exceeded my expectations. It's clear that the team is dedicated to delivering high-quality work.",
    },
    {
     id:6,
      image:'/images/person.png',
      name: 'John Doe',
      text: 'I was extremely pleased with the quality of the product. It exceeded my expectations and provided great value for the price.',
    },
    {
      id:7,
      image:'/images/person1.png',
      name: 'Jane Smith',
      text: 'The customer service was excellent. They were responsive and helpful throughout the entire process, making it a smooth experience for me.',
    },
    {
      id:8,
      image:'/images/person2.png',
      name: 'Alex Johnson',
      text: 'The attention to detail in their work is impressive. Every aspect of the project was handled with precision and care. I highly recommend their services.',
    },
  ];
