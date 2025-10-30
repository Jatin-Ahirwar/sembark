import React from 'react'

const GetInTouch = () => {
    return (
        <div className='md:p-6 p-4 text-white'>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end w-full rounded-2xl bg-gradient-to-b from-[#1c1c1c] via-[#121212] to-[#000000] md:p-8 p-5 gap-8 text-white">
                <div className="flex flex-col gap-5 w-full md:w-1/2">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-medium leading-snug">
                        Ready To Get <br /> Our New Stuff?
                    </h1>

                    <div className="w-full max-w-xs">
                        <div className="relative">
                            <input
                                type="email"
                                placeholder="Your email"
                                className="w-full bg-white text-gray-900 border border-gray-200 rounded-full md:py-2.5 py-2  pl-4 pr-20 text-sm focus:outline-none focus:ring-2 focus:ring-black placeholder-gray-400 transition-all"
                            />
                            <button className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-black text-white font-medium px-4 py-1.5 rounded-full text-xs sm:text-sm hover:bg-gray-800 transition-all">
                                Send
                            </button>
                        </div>
                    </div>
                </div>

                <div className="w-full md:w-fit text-gray-300 text-sm md:text-base">
                    <p className="capitalize mb-4 font-semibold text-white">
                        Stuffus for homes and needs
                    </p>
                    <p className="max-md:text-sm max-md:mb-2 capitalize text-[#f3f3f385]">
                        We'll listen to your needs, identify the best approach, and then
                    </p>
                    <p className="max-md:text-sm capitalize text-[#f3f3f385]">
                        create a bespoke smart EV charging solution that's right for you.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default GetInTouch