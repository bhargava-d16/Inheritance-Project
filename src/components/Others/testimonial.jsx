// import React from 'react'
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

//  export default function Testimonial(){
//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 3,
//     slidesToScroll: 3,
    
//   };
//   return (
//    <div className='w-3/4 m-auto ' >
//          <div className='mt-20 mb-10'>
//           <h2 id="testheading">Our Testimonials</h2>
//          <Slider {...settings}>
//             {reviews.map((d)=>(
//                 <div key={d.id} className='h-50 text-black rounded-xl'>
//                    <div className='h-30 rounded-t-xl bg-white flex justify-center items-center'>
//                       <img src={d.image} alt="" className='h-44 w-44'/>
//                     </div> 
//                     <div className='rounded-b-xl  p-4 flex flex-col justify-center items-center gap-4 text-center'>
//                         <p className='text-xl font-semibold'>{d.name}</p>
//                         <p>{d.text}</p>
//                         <button className='rounded-xl bg-slate-900 text-white text-lg px-6'>Read More</button>
//                     </div>
//                 </div>
//             ))}
                
//           </Slider>
//          </div>
//    </div>
//   )
// }

// const reviews = [
//     {
//       id:1,
//       image:'/images/person.png',
//       name: 'John Doe',
//       text: 'I was extremely pleased with the quality of the product. It exceeded my expectations and provided great value for the price.',
//     },
//     {
//       id:2,
//       image:'/images/person1.png',
//       name: 'Jane Smith',
//       text: 'The customer service was excellent. They were responsive and helpful throughout the entire process, making it a smooth experience for me.',
//     },
//     {
//       id:3,
//       image:'/images/person2.png',
//       name: 'Alex Johnson',
//       text: 'The attention to detail in their work is impressive. Every aspect of the project was handled with precision and care. I highly recommend their services.',
//     },
//     {
//       id:4,
//       image:'/images/person3.png',
//       name: 'Emily Davis',
//       text: 'The team demonstrated a deep understanding of my requirements. They were able to capture the essence of my vision.',
//     },
//     {
//       id:5,
//       image:'/images/person.png',
//       name: 'David Miller',
//       text: "The product not only met but exceeded my expectations. It's clear that the team is dedicated to delivering high-quality work.",
//     },
//     {
//      id:6,
//       image:'/images/person.png',
//       name: 'John Doe',
//       text: 'I was extremely pleased with the quality of the product. It exceeded my expectations and provided great value for the price.',
//     },
//     {
//       id:7,
//       image:'/images/person1.png',
//       name: 'Jane Smith',
//       text: 'The customer service was excellent. They were responsive and helpful throughout the entire process, making it a smooth experience for me.',
//     },
//     {
//       id:8,
//       image:'/images/person2.png',
//       name: 'Alex Johnson',
//       text: 'The attention to detail in their work is impressive. Every aspect of the project was handled with precision and care. I highly recommend their services.',
//     },
//   ];


import React from 'react'
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

export default function Testimonial() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            }
        ],
        prevArrow: <button className="slick-prev">Previous</button>,
        nextArrow: <button className="slick-next">Next</button>
    }

    return (
        // Full width light blue background section
        <div className="w-full" style={{ backgroundColor: '#CBDCEB' }}>
            {/* Content container with max width */}
            <div className="w-[90%] max-w-7xl mx-auto px-4 py-16">
                <div className="relative">
                    <h2 className="text-3xl font-bold text-center mb-12" style={{ color: '#133E87' }}>
                        Our Testimonials
                    </h2>
                    <div className="relative">
                        <Slider {...settings}>
                            {reviews.map((d) => (
                                <div key={d.id} className="px-4 min-w-[280px]">
                                    {/* Card with white background */}
                                    <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 p-6 mx-2">
                                        <div className="flex items-center justify-center mb-4">
                                            <img 
                                                src={d.image} 
                                                alt={d.name} 
                                                className="h-20 w-20 rounded-full object-cover"
                                            />
                                        </div>
                                        <div className="text-center space-y-4">
                                            <p className="text-xl font-semibold" style={{ color: '#133E87' }}>{d.name}</p>
                                            <p style={{ color: '#608BC1' }} className="line-clamp-3">{d.text}</p>
                                            <button 
                                                className="px-6 py-2 text-white rounded-lg transition-colors duration-200"
                                                style={{ 
                                                    backgroundColor: '#133E87',
                                                    ':hover': {
                                                        backgroundColor: '#608BC1'
                                                    }
                                                }}
                                            >
                                                Read More
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>
            </div>

            <style jsx global>{`
                .slick-list {
                    margin: 0 -8px;
                }
                .slick-slide > div {
                    padding: 0 8px;
                }
                .slick-dots {
                    bottom: -40px;
                }
                /* Using dark blue (#133E87) for dots */
                .slick-dots li button:before {
                    color: #133E87;
                }
                .slick-dots li.slick-active button:before {
                    color: #133E87;
                }
                .slick-prev, .slick-next {
                    z-index: 10;
                }
                /* Using dark blue (#133E87) for arrows */
                .slick-prev:before, .slick-next:before {
                    color: #133E87;
                }
                .slick-prev {
                    left: -25px;
                }
                .slick-next {
                    right: -25px;
                }
                @media (max-width: 640px) {
                    .slick-prev {
                        left: -15px;
                    }
                    .slick-next {
                        right: -15px;
                    }
                }
            `}</style>
        </div>
    )
}

const reviews = [
    {
        id: 1,
        image: '/images/person.png',
        name: 'John Doe',
        text: 'I was extremely pleased with the quality of the product. It exceeded my expectations and provided great value for the price.',
    },
    {
        id: 2,
        image: '/images/person1.png',
        name: 'Jane Smith',
        text: 'The customer service was excellent. They were responsive and helpful throughout the entire process, making it a smooth experience for me.',
    },
    {
        id: 3,
        image: '/images/person2.png',
        name: 'Alex Johnson',
        text: 'The attention to detail in their work is impressive. Every aspect of the project was handled with precision and care. I highly recommend their services.',
    },
    {
        id: 4,
        image: '/images/person3.png',
        name: 'Emily Davis',
        text: 'The team demonstrated a deep understanding of my requirements. They were able to capture the essence of my vision.',
    },
    {
        id: 5,
        image: '/images/person.png',
        name: 'David Miller',
        text: "The product not only met but exceeded my expectations. It's clear that the team is dedicated to delivering high-quality work.",
    },
    {
        id: 6,
        image: '/images/person.png',
        name: 'John Doe',
        text: 'I was extremely pleased with the quality of the product. It exceeded my expectations and provided great value for the price.',
    },
    {
        id: 7,
        image: '/images/person1.png',
        name: 'Jane Smith',
        text: 'The customer service was excellent. They were responsive and helpful throughout the entire process, making it a smooth experience for me.',
    },
    {
        id: 8,
        image: '/images/person2.png',
        name: 'Alex Johnson',
        text: 'The attention to detail in their work is impressive. Every aspect of the project was handled with precision and care. I highly recommend their services.',
    },
]