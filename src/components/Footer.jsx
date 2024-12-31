const Footer = ({ handlePrevHoliday, handleNextHoliday, currentIndex }) => {
    return (
        <section className='p-2 bg-primary rounded-t-lg text-white'>
            <div className='flex p-2 justify-around font-semibold text-white items-center'>
                <div className='flex justify-start'>
                    <button
                        onClick={handlePrevHoliday}
                        className={`hover:cursor-pointer hover:scale-110 ${
                            currentIndex != 0 ? `visible` : `invisible`
                        }`}>
                        <div className='flex items-center'>
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                className='h-8 w-8'
                                fill='none'
                                viewBox='0 0 24 24'
                                stroke='currentColor'>
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth={2}
                                    d='M15 19l-7-7 7-7'
                                />
                            </svg>
                            <p>Previous</p>
                        </div>
                    </button>
                </div>
                <div className='text-center hidden md:block'>
                    <p className='text-md'>
                        Made with{" "}
                        <svg
                            className='w-6 h-6 hover:scale-125 inline-block hover:fill-red-500  hover:stroke-red-500 ease-in duration-300'
                            role='presentation'
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'>
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='2'
                                d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'></path>
                        </svg>{" "}
                        by Cho Hei
                    </p>
                </div>
                <div className='flex justify-end'>
                    <button
                        onClick={handleNextHoliday}
                        className='hover:cursor-pointer hover:scale-110'>
                        <div className='flex items-center'>
                            <p>Next</p>
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                className='h-8 w-8'
                                fill='none'
                                viewBox='0 0 24 24'
                                stroke='currentColor'>
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth={2}
                                    d='M9 5l7 7-7 7'
                                />
                            </svg>
                        </div>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Footer;
