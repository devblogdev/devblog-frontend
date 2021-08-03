import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {convertFromRaw, convertToRaw} from 'draft-js';
import { convertToHTML } from 'draft-convert';
// import DOMPurify from 'dompurify';

import Button from '@material-ui/core/Button';
import { addPost } from '../../actions/postsAndCommentsActions'

const MyEditor = () => {

  let initialEditorState = null;
  const storeRaw = localStorage.getItem('draftRaw')

  if (storeRaw) {
      const rawContentFromStore = convertFromRaw(JSON.parse(storeRaw));
      initialEditorState = EditorState.createWithContent(rawContentFromStore)
  } else {
      initialEditorState = EditorState.createEmpty();
  }

  const [editorState, setEditorState] = useState( 
      () => initialEditorState
  );

  const dispatch = useDispatch()

  const saveRaw = () => {
      let contentRaw = convertToRaw(editorState.getCurrentContent());
      localStorage.setItem('draftRaw', JSON.stringify(contentRaw))
  }

  function handleEditorChange(state){
    setEditorState(state)
    const contentState = editorState.getCurrentContent();
    saveRaw(contentState);
  }

  const saveDraft = (event) => {
    const data = convertToHTML(editorState.getCurrentContent());
    const endpoint = "/drafy" 
    const postData = {body: data, status: "draft"}
    dispatch(addPost(endpoint, postData))
  }
  const savePost = (event) => {
    const data = convertToHTML(editorState.getCurrentContent());
    const endpoint = "/publish" 
    const postData = {body: data, status: "published"}
    dispatch(addPost(endpoint, postData))
  }

  return (
    <div className="App">
      <header className="App-header">
        Post Editor
      </header>
      <Editor 
        editorState={editorState}
        // onEditorStateChange={setEditorState}
        onEditorStateChange={handleEditorChange}
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
      />
      <Button onClick ={saveDraft}>
          Save as Draft
      </Button>
      <Button onClick ={savePost}>
          Publish
      </Button>
    </div>
  )
}
export default MyEditor;