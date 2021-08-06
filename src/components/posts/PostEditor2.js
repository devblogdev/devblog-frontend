import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {convertFromRaw, convertToRaw} from 'draft-js';
import { convertToHTML, convertFromHTML } from 'draft-convert';
// import DOMPurify from 'dompurify';

import Button from '@material-ui/core/Button';
import { addPost, editPost, deletePost } from '../../actions/postsAndCommentsActions';

const PostEditor2 = (props) => {

    const user = useSelector(state => state.users.current_user)

    let initialEditorState = null;

    const storeRaw = localStorage.getItem('draftRaw')

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

    //  CRUD ACTIONS STRAT
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
        dispatch(addPost(endpoint, postData))
    }
    const updateDraft = (event) => {
        const data = convertToHTML(editorState.getCurrentContent());
        const endpoint = `/posts/${props.match.params.postID}`
        const postData = {body: data, status: "draft"}
        dispatch(editPost(endpoint, postData))
    }
    const updatePost = () => {
        const data = convertToHTML(editorState.getCurrentContent());
        const endpoint = `/posts/${props.match.params.postID}`
        const postData = {body: data, status: "published"}
        dispatch(editPost(endpoint, postData))
    }
    const removePost = () => {
        const postID = props.match.params.postID
        const endpoint = `/posts/${postID}`
        dispatch(deletePost(endpoint, postID))
    }
        //   ------------ New psot  ---------------
    const saveAsDraftButton = <Button onClick={saveDraft}>Save as Draft</Button>
    const publishNewButton = <Button onClick={savePost}>Publish</Button>  

    //   ------------ Draft post ---------------
        //   Updating a draft post
    const saveButton = <Button onClick={(event) => updateDraft(event)}>Save</Button>
        //   Publishing a draft
    const publishDraftButton = <Button onClick={updatePost}>Publish</Button>  
    
    //   ------------ Published post  ---------------
    const saveAndPublishButton = <Button onClick={updatePost}>Save and Publish</Button>
    
    //   ------------ Delete draft or post  ---------------
    const deleteButton = <Button onClick={removePost}>Delete</Button>

    //  CRUD ACTIONS END
    
    let buttons

    if ( props.match.url === "/profile/drafts/new" ) {
        initialEditorState = EditorState.createEmpty();
        buttons = [saveAsDraftButton, publishNewButton]
    } else {
        // debugger
        const draftOrPost = props.user.posts.find(post => post.id == props.match.params.postID)
        // console.log(draftOrPost)
        const info = convertFromHTML(draftOrPost.body)
        initialEditorState = EditorState.createWithContent(info)
        if (props.match.path === "/profile/drafts/:postID") {
            buttons = [saveButton, publishDraftButton, deleteButton]
        } else if (props.match.path === "/posts/edit/:postID") {
            buttons = [saveAndPublishButton, deleteButton]
        }
    }

  const [editorState, setEditorState] = useState( 
    () => initialEditorState
  );
    
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
      {buttons.map( (button, index) => 
        <React.Fragment key={index}>
            {button}
        </React.Fragment> 
       )}
      {/* <Button onClick ={saveDraft}>
          Save as Draft
      </Button>
      <Button onClick ={savePost}>
          Publish
      </Button> */}
      {/* <Button onClick ={deletePost} >
          Delete
      </Button> */}
    </div>
  )
}
export default PostEditor2;