import React from 'react'
// import { EditorState, RichUtils, AtomicBlockUtils } from 'draft-js'

export const mediaBlockRenderer = block => {
    const type = block.getType();
    if (type === 'atomic') {
      return {
        component: MediaComponent,
        editable: false,
        // props: {
        //   foo: 'bar',
        // },
      };
    }
    return null;
  }

  const Image = props => {
      if (!!props.src) {
        return (
            <span className="rdw-image-alignment rdw-image-center">
                <span className="rdw-image-imagewrapper">
                    <img 
                        src={props.src} 
                        alt="DevBlog media content" 
                        style={{height: 'auto', width: '100%' }} 
                    />
                </span>
            </span>
        )
      }
      return null;
  }

  const Iframe = props => {
      if (!!props.src) {
          return (
              <iframe 
                    src={props.src} 
                    title = 'Wysiwyg Embedded Content'
                    frameBorder="0"  
                    style={{
                            height:'auto',
                             width:'100%', 
                    }}
              />
          )
      }
      return null
  }

  const MediaComponent = props => {
    const entity = props.contentState.getEntity(props.block.getEntityAt(0));
    const src = entity.getData().src
    const type = entity.getType();
    let media = null
    if (type === 'IMAGE') {
      // If the image is an uploaded image, it will include a 'deleteHash' fragment in its url; split the string at this point and get the url address only
        media = <Image src={src.split("deleteHash")[0]} /> 
    }
    else if ( type === 'EMBEDDED_LINK')(
        // If src starts with the character '<', it means it is probably a code snippet with a script tag
        src && src[0] === "<" ? (
            media = <Iframe src={entity.getData().src.split("=")[1].split(">")[0]} />  // extract the http address from src
        ) : (
            media = <Iframe src={entity.getData().src} />
        )
        // <script src="https://gist.github.com/mmartinezluis/b0ee57fc92ee0771d8230af0f3ca98ab.js"></script>
    )
    return media
  }