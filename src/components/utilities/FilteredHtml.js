import React from 'react'
import sanitizeHtml from 'sanitize-html'
import { AllowedEmbedWebsites } from './allowedWebsites'

// allow the default tags from 'sanitizeHtml' dependency; allow the iframe and img tags;
// restrict the allowed attributes for the iframe, img, a, and span tags
// allow CSS styles only for span tags
const FilteredHtml = ( { content } ) => {
    const clean = sanitizeHtml( content, {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(['iframe', 'img']),
        allowedAttributes: {
            iframe: [ 'src', 
                {
                    name: 'sandbox',
                    multiple: true,
                    values: [ 'allow-popups', 'allow-same-origin', 'allow-scripts' ],
                },
            ],
            img: ['src'],
            a: [ 'href', 'name', 'target' ],
            span: ['style'],
        },
        allowedStyles: {
            'span': {
                'color': [/^#(0x)?[0-9a-f]+$/i, /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/],
                'background-color': [/^#(0x)?[0-9a-f]+$/i, /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/],
            },
        },
        allowedIframeHostnames: AllowedEmbedWebsites,
    })
    return(
        <div dangerouslySetInnerHTML= {{__html: clean}} />
    )
}
export default FilteredHtml