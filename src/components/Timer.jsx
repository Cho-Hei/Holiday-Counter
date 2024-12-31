const Timer = ({ time }) => {
    return (
        <div className='gap-5 md:flex lg:text-4xl text-2xl'>
            <div className='m-4 flex flex-col items-center md:flex-row'>
                <span className='font-mono'>
                    <span>{time.days}</span>
                </span>
                <span className='hidden md:block'>&nbsp;</span>
                <p>days</p>
            </div>
            <div className='m-4 flex flex-col items-center justify-between md:flex-row'>
                <div className='countdown font-mono '>
                    <span style={{ "--value": time.hours }}></span>
                </div>
                <span className='hidden md:block'>&nbsp;</span>
                <p>hours</p>
            </div>
            <div className='m-4 flex flex-col items-center md:flex-row'>
                <span className='countdown font-mono '>
                    <span style={{ "--value": time.minutes }}></span>
                </span>
                <span className='hidden md:block'>&nbsp;</span>
                <p>min</p>
            </div>
            <div className='m-4 flex flex-col items-center md:flex-row'>
                <span className='countdown font-mono '>
                    <span style={{ "--value": time.seconds }}></span>
                </span>
                <span className='hidden md:block'>&nbsp;</span>
                <p>sec</p>
            </div>
        </div>
    );
};

export default Timer;
