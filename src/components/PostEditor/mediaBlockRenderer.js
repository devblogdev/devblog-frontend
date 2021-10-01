import React from 'react'
// import { EditorState, RichUtils, AtomicBlockUtils } from 'draft-js'

export const mediaBlockRenderer = block => {
    const type = block.getType();
    // debugger
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
                    {props.deleteHash  ? (
                        <img 
                            src={props.src} 
                            alt="DevBlog media content" 
                            deletehash={props.deleteHash}
                            style={{height: 'auto', width: '100%' }} 
                        />
                    ) : (
                        <img 
                            src={props.src} 
                            alt="DevBlog media content" 
                            style={{height: 'auto', width: '100%' }} 
                        />
                    )}
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
    // const { src } =entity.getData();
    const srcLinkAndDeleteHash = entity.getData().src.split("-")
    const src = srcLinkAndDeleteHash[0]
    const deleteHash= srcLinkAndDeleteHash[1]
    const type = entity.getType();
    // debugger 
    let media= null
    if (type === 'IMAGE') {
        media= <Image src={src} deleteHash={deleteHash} />
    }
    else if ( type === 'EMBEDDED_LINK')(
        media= <Iframe src={src} />
    )
    return media
}