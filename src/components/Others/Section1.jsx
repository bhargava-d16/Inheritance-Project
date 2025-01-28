
import React from 'react'
import Card from './Card'

export default function Section1() {
    return (
        <main className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
            <div className="flex flex-col items-center justify-between lg:flex-row">
                <div className="mb-10 lg:max-w-lg lg:pr-5 lg:mb-0">
                    <h1 className="max-w-lg mb-6 font-sans text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl sm:leading-tight">
                        Largest Job Site
                        <br className="hidden md:block" />
                        <span className="inline-block text-blue-600">In The World</span>
                    </h1>
                    <h4 className="text-xl text-gray-700 mb-8">
                        Here we are for Bridging the Gap Between Talent and Opportunity!
                    </h4>
                    <div className="space-y-4">
                    <Card 
                    icon="briefcase"
                    title="Find Your Dream Job Here!"
                    description="Explore exciting opportunities and achieve your career goals with us. We connect top talent with leading companies."
                  />
                  <Card 
                    icon="building"
                    title="Connect with Top Companies"
                    description="Access thousands of job listings from industry-leading companies and start your journey to success."
                  />
                    </div>
                </div>
                <div className="relative lg:w-1/2">
                    <img
                        className="w-full rounded-2xl shadow-2xl lg:w-4/5 lg:ml-auto "
                        src="/images/img1.jpg"
                        alt="Job search illustration"
                    />
                </div>
            </div>
        </main>
    )
}