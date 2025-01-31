import React from 'react';

export default function Section2({ tag, info, iconPath = "/images/cooperation.png" }) {
    return (
        <div className="h-full w-full transition-transform transform duration-300 hover:scale-105">
            <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-xl 
                            transition-shadow duration-300 
                            min-h-[300px] 
                            flex flex-col 
                            items-center 
                            justify-between 
                            text-center 
                            border border-gray-100">
                <div className="flex flex-col items-center">
                    <img
                        className="w-16 h-16 mb-5 object-contain"
                        src={iconPath}
                        alt="Feature icon"
                    />
                    <h4 className="mb-4 text-lg font-bold text-gray-800">{tag}</h4>
                    <p className="text-gray-600 text-sm">{info}</p>
                </div>
            </div>
        </div>
    );
}