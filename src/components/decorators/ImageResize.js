import React, { useState } from 'react';

// @TODO: refactor component as needed to produce image grow effect upon 'active' variable set to true
const ImageResize = ({source, altText}) => {
    const [active, setActive] = useState(false);
    return (
        <>
            {active 
                ?   <div 
                        className={`resize-container ${active ? "resize-show" : ""} resize-initial`}
                        onClick={() => setActive(!active)}
                    >
                        <img src={source} 
                            className="image resize" 
                            alt={altText}
                            onClick={() => setActive(!active)}
                        />
                    </div>
                :   <div className="resize-initial">
                        <img src={source}
                            className="image" 
                            alt={altText}
                            onClick={() => setActive(!active)}
                        />
                    </div>
            }
        </>
    )
}

export default ImageResize;