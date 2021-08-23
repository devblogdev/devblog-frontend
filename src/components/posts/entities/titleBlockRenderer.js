// import React from 'react'
// import { EditorState, RichUtils, AtomicBlockUtils, EditorBlock } from "draft-js";

// export default function titleBlockRenderer(contentBlock) {
//     const type = contentBlock.getType();

//     if (type === "atomic"){
//         return {
//             component: TitleComponent,
//             editable: true,
//             props: {
//                 holder: 'Title'
//             }
//         }
//     }
// }

// const TitleComponent = props => {
//     return (
//           <div style={{ border: "1px solid #f00" }} >
//             <EditorBlock {...props} />
//           </div>
//     )
// }