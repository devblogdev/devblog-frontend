// import React, { Fragment, useState } from "react";
// import {
//   Editor,
//   EditorState,
//   EditorBlock,
//   AtomicBlockUtils,
// } from "draft-js";

// const TestEditorFFunctional = () => {
//   const [editorState, setEditorState] = useState(() => EditorState.createEmpty())
// ;

//  const onChange = state => setEditorState(state);

//   const insertBlock = () => {
    
//     const contentState = editorState.getCurrentContent();

//     const contentStateWithEntity = contentState.createEntity(
//       "TEST",
//       "MUTABLE",
//       { a: "b" }
//     );

//     const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
//     const newEditorState = EditorState.set(editorState, {
//       currentContent: contentStateWithEntity
//     });

//     setEditorState(
//       AtomicBlockUtils.insertAtomicBlock(
//         newEditorState,
//         entityKey,
//         " "
//       )
//     );
//   };

//     return (
//       <Fragment>
//         <button onClick={insertBlock}>Insert block</button>
//         <Editor
//           editorState={editorState}
//           onChange={onChange}
//           blockRendererFn={blockRenderer}
//         />
//       </Fragment>
//     );  
// }


// // render(<App />, document.getElementById("root"));
// export default TestEditorFFunctional

// const blockRenderer = contentBlock => {
//     const type = contentBlock.getType();
  
//     if (type === "atomic") {
//       return {
//         component: titleComponent,
//         editable: true,
//         props: {
//           foo: "bar"
//         }
//       };
//     }
//   };
  
//   const titleComponent = props => {
//     return (
//       <div style={{ border: "1px solid #f00" }}>
//         <EditorBlock {...props} />
//       </div>
//     );
//   };