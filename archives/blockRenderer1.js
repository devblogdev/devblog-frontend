// import React, { Fragment } from "react";
// import { render } from "react-dom";
// import {
//   Editor,
//   EditorState,
//   EditorBlock,
//   AtomicBlockUtils,
//   RichUtils,
//   convertToRaw
// } from "draft-js";

// class TestEditor extends React.Component {
//   state = {
//     editorState: EditorState.createEmpty()
//   };

//   render() {
//     const { editorState } = this.state;

//     return (
//       <Fragment>
//         <button onClick={this.insertBlock}>Insert block</button>
//         <Editor
//           editorState={editorState}
//           onChange={this.onChange}
//           blockRendererFn={blockRenderer}
//         />
//       </Fragment>
//     );
//   }

//   onChange = editorState => this.setState({ editorState });

//   insertBlock = () => {
//     const { editorState } = this.state;

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

//     this.setState({
//       editorState: AtomicBlockUtils.insertAtomicBlock(
//         newEditorState,
//         entityKey,
//         " "
//       )
//     });
//   };
// }

// const blockRenderer = contentBlock => {
//   const type = contentBlock.getType();

//   if (type === "atomic") {
//     return {
//       component: Component,
//       editable: true,
//       props: {
//         foo: "bar"
//       }
//     };
//   }
// };

// const Component = props => {
//   // const { block, contentState, blockProps } = props;
//   // const data = contentState.getEntity(block.getEntityAt(0)).getData();

//   // console.log(props, data, blockProps);

//   return (
//     <div style={{ border: "1px solid #f00" }}>
//       <EditorBlock {...props} />
//     </div>
//   );
// };

// // render(<App />, document.getElementById("root"));
// export default TestEditor