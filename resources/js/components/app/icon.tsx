import React from 'react';

const Icon = ({ src, label }: { src: string; label: string }) => {
    const [show, setShow] = React.useState(false);

    return (
        <div>
            <div
                onMouseEnter={() => setShow(true)}
                onMouseLeave={() => setShow(false)}
                data-ripple-light="true"
                data-tooltip-target="label"
                className="bg-white w-12 m-2 md:w-16 border-2 border-slate-400 hover:border-orange-600 rounded-md p-1 md:p-4 shadow md:m-4"
            >
                <img src={src} alt={label} className="object-cover w-full rounded" />
            </div>
            {show && (
                <div
                    data-tooltip="label"
                    className="uppercase absolute z-50 whitespace-normal break-words rounded-lg bg-orange-600 py-1.5 px-3 font-sans text-xs md:text-xs font-normal text-white focus:outline-none"
                >
                    {label}
                </div>
            )}
        </div>
    );
};

export default Icon;