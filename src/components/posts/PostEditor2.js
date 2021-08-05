import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {convertFromRaw, convertToRaw} from 'draft-js';
import { convertToHTML, convertFromHTML } from 'draft-convert';
// import DOMPurify from 'dompurify';

import Button from '@material-ui/core/Button';
import { addPost } from '../../actions/postsAndCommentsActions';


const PostEditor2 = (props) => {
  const user = useSelector(state => state.users.current_user)
  let initialEditorState = null;
  const storeRaw = localStorage.getItem('draftRaw')
    console.log(props)
  if ( props.match.url === "/profile/drafts/new" ) {
      initialEditorState = EditorState.createEmpty();
  } else {
    const draftOrPost = props.user.posts.find(post => post.id == props.match.params.postID)
    console.log(draftOrPost)
    const info = convertFromHTML(draftOrPost.body)
    // debugger
    // const rawContentFromStore = convertToRaw(info);
    initialEditorState = EditorState.createWithContent(info)
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
    const endpoint = "/draft" 
    const postData = {body: data, status: "draft"}
    dispatch(addPost(endpoint, postData))
  }
  const savePost = (event) => {
    const data = convertToHTML(editorState.getCurrentContent());
    const endpoint = "/publish" 
    const postData = {body: data, status: "published"}
    debugger
    dispatch(addPost(endpoint, postData))
  }

  const deleteDraft = () => {

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
      <Button onClick ={deleteDraft} >
          Delete
      </Button>
    </div>
  )
}
export default PostEditor2;