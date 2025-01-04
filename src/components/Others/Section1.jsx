import Card from './Card'
export default function Section1(){
    return(
      <main>
         <div className='div1'>
            <div>
             <h1 className='heading2'>Largest Job Site In The World</h1>
             <h4 className='heading1'>Here we are for Bridging the Gap Between Talent and Opportunity!</h4>
             <Card/>
             <Card/>
            </div>
           <img  
           className="backimg"src="/images/img1.jpg" alt="" 
           />
         </div>

            
      </main>
)
}