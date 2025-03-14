// THIS EDITOR WORKS WELL; HOWEVER, IT DOES NOT SUPPUORT CODE SNIPPETS (THE APP BREAKS WHEN SAVING A POST WITH CODE SNIPPETS)
// THE PROBLEM LIES IN THE 'convertFromHTML' and 'convertToHTML' dependencies;
// TO MAKE MAKE CODE SNIPPETS WORK, REPLACE THOSE DEPENDENCIES WITH import draftToHtml from 'draftjs-to-html';
// and import htmlToDraft from 'html-to-draftjs';

import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { EditorState } from 'draft-js';
// import { DefaultDraftBlockRenderMap } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
// import { convertToRaw } from 'draft-js';  //do not delete this line; can be used for future improvement
// import { convertFromRaw } from 'draft-js'; //do not delete this line; can be used for future improvement
import { convertFromHTML, convertToHTML } from 'draft-convert';
// import { Map } from 'immutable'
// import DOMPurify from 'dompurify';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { green, blueGrey } from '@mui/material/colors';
import { addPost, editPost, deletePost } from '../../actions/postsAndCommentsActions';
import  S3ImageService2  from '../images/S3ImageService2'
import { manageImageForNewDraftOrPost } from '../../actions/imageActions'
import { manageImageForDraftOrPost } from '../../actions/imageActions'
import { extractTitle } from '../../actions/postEditorHelper'

const ColorButton = styled(Button)(({ theme }) => ({
  backgroundColor: green[600],
  '&:hover': {
    backgroundColor: green[800],
  },
  margin: theme.spacing(1),
}));

const DangerButton = styled(Button)(({ theme}) => ({
  backgroundColor: blueGrey[200],
  '&:hover': {
    backgroundColor: blueGrey[400],
  },
}))

//   FUNCTIONAL COMPONENT
const PostEditor2 = (props) => {

    const dispatch = useDispatch()
    
    
    // --------------------- CRUD ACTIONS START ------------------------------------

        // --------------- Image Data Retrieval START-------------------

    // This variable is set when the user selects a picture to upload
    const [imageState, setImageState] = useState()
    // This function is passed to S3ImageService2 component at bottom; it is activated when the user selects an image
    const retrieveImageState = useCallback ((file) => {
        setImageState(file)
    },[])

        // --------------- Image Data Retrieval END-------------------

    // FUNCTIONS FOR POST EDITOR BUTTONS START

    // saves a NEW draft and keeps it as a draft
    const saveDraft = (event) => {
        const data = convertToHTML(editorState.getCurrentContent());
        const endpoint = "/draft" 
        const postExtraction = extractTitle(data)
        const rawPostData = {body: data, title: postExtraction[0]?.slice(1), abstract: postExtraction[2]?.slice(1), status: "draft"}
        console.log(imageState)
        // "manageImageForNewDraftOrPost" below return a Promise; to get the data out of the promise we need to
        // wrap the function in an async/await block to wait until the promise is resolved
        const resolveImageThenResolvePost = async () => {
            dispatch({type: 'LOADING_POSTS', payload: "Managing image..."})
            const imageData = await manageImageForNewDraftOrPost(imageState);
            let postData = Object.assign({}, rawPostData, {images_attributes: imageData})
            console.log(postData)
            dispatch({type: 'LOADING_POSTS', payload: "Managing post..."})
            dispatch(addPost(endpoint, postData, props))    
        }
        resolveImageThenResolvePost()
    }

    // saves a NEW draft and automatically publishes it; no longer a draft, now a published post
    const savePost = () => {
        const data = convertToHTML(editorState.getCurrentContent());
        const endpoint = "/publish" 
        const postExtraction = extractTitle(data)
        const rawPostData = {body: data, title: postExtraction[0]?.slice(1), abstract: postExtraction[2]?.slice(1), status: "published"}
        const resolveImageThenResolvePost = async () => {
            dispatch({type: 'LOADING_POSTS', payload: "Managing image..."})
            const imageData = await manageImageForNewDraftOrPost(imageState);
            let postData = Object.assign({}, rawPostData, {images_attributes: imageData})
            console.log(postData)
            dispatch({type: 'LOADING_POSTS', payload: "Managing post..."})
            dispatch(addPost(endpoint, postData, props))    
        }
        resolveImageThenResolvePost()
    }

    // updates an already created draft
    const updateDraft = () => {
        const data = convertToHTML(editorState.getCurrentContent());
        const endpoint = `/posts/${props.match.params.postID}`
        const currentPost = props.user.posts.find(post => `${post.id}` === props.match.params.postID)
        const postExtraction = extractTitle(data)
        const rawPostData = {body: data, title: postExtraction[0]?.slice(1), abstract: postExtraction[2]?.slice(1), status: "draft"}
        console.log(extractTitle(data))
        console.log(imageState)
        const resolveImageThenResolvePost = async () => {
            dispatch({type: 'LOADING_POSTS', payload: "Managing image..."})
            const imageData = await manageImageForDraftOrPost(currentPost, imageState);
            let postData = Object.assign({}, rawPostData, {images_attributes: imageData})
            console.log(postData)
            dispatch({type: 'LOADING_POSTS', payload: "Managing post..."})
            dispatch(editPost(endpoint, postData, props ))
            // props.history.push("/profile")
        }
        resolveImageThenResolvePost()
    }

    // Two things: –updates an existing draft and changes it into a post (basically, pubslihes the draft); 
    //             –updates and republishes an existing post
    const updatePost = () => {
        const data = convertToHTML(editorState.getCurrentContent());
        const endpoint = `/posts/${props.match.params.postID}`
        const currentPost = props.user.posts.find(post => `${post.id}` === props.match.params.postID)
        const postExtraction = extractTitle(data)
        const rawPostData = {body: data, title: postExtraction[0]?.slice(1), abstract: postExtraction[2]?.slice(1), status: "published"}
        console.log(extractTitle(data))
        console.log(imageState)
        const resolveImageThenResolvePost = async () => {
            dispatch({type: 'LOADING_POSTS', payload: "Managing image..."})
            const imageData = await manageImageForDraftOrPost(currentPost, imageState);
            let postData = Object.assign({}, rawPostData, {images_attributes: imageData})
            console.log(postData)
            dispatch({type: 'LOADING_POSTS', payload: "Managing post..."})
            dispatch(editPost(endpoint, postData, props))
        }
        resolveImageThenResolvePost()
    }

    // deletes an existing draft or post
    const removePost = () => {
        const postID = props.match.params.postID
        const endpoint = `/posts/${postID}`
        const currentPost = props.user.posts.find(post => `${post.id}` === props.match.params.postID)
        console.log(currentPost)
        const resolveImageThenResolvePost = async () => {
            await manageImageForDraftOrPost(currentPost);
            // dispatch(deletePost(endpoint, postID))
            dispatch(deletePost(endpoint, currentPost, props))
            props.history.push("/profile")
        }
        resolveImageThenResolvePost()
    }

    // FUNCTION FOR POST EDITOR BUTTONS END

    // POST EDITOR BUTTONS
        //   ------------ NEW POST  ---------------
    const saveAsDraftButton = <Button 
                                onClick={saveDraft}
                                color="primary" variant="contained" component="span"
                                disableElevation
                              >Save as Draft
                              </Button>

    const publishNewButton = <ColorButton 
                                onClick={savePost}
                                color="primary" variant="contained" component="span"
                                disableElevation
                              >Publish
                              </ColorButton>  

    //   ------------ DRAFT POST ---------------
        //   Updating a draft post
    const saveButton = <Button 
                          onClick={(event) => updateDraft(event)}
                          color="primary" variant="contained" component="span"
                          disableElevation
                        >Save
                        </Button>

        //   Publishing a draft
    const publishDraftButton = <ColorButton 
                                  onClick={updatePost}
                                  color="primary" variant="contained" component="span"
                                  disableElevation
                               >Publish
                               </ColorButton>  
    
    //   ------------ PUBLISHED POST  ---------------
    const saveAndPublishButton = <ColorButton 
                                    onClick={updatePost}
                                    color="primary" variant="contained" component="span"
                                    disableElevation
                                  >Save and Publish
                                  </ColorButton>
    
    //   ------------ Delete draft or post  ---------------
    const deleteButton = <DangerButton 
                           onClick={removePost}
                           disableElevation
                          >Delete
                          </DangerButton>

    // --------------------- CRUD ACTIONS END ------------------------
    
    
    
    // --------------------- POST EDITOR START ------------------------
    
      // A NIGHTMARE!!! 
      
    // If editing a draft or post, the below line provides dummy content for the editor to start with while the draft or post data is loaded
    const [draftOrPost, setDraftOrPost] = useState({body: "<p>Loding content...</p>"})
    
    // DO NOT DELTE THE BELOW CONST; MIGHT BE NEEDED AT SOME POINT
    // const saveRaw = (currentContent) => {
    //     let contentRaw = convertToRaw(currentContent);
    //     localStorage.setItem('draftRaw', JSON.stringify(contentRaw))
    // }

    // Updates the editor state when typing 
    function handleEditorChange(state){
        setEditorState(state)
        // DO NOT ERASE THE BELOW LINES; MIGTH BE NIEEDED AT SOME POINT
        // const contentState = editorState.getCurrentContent();
        // saveRaw(contentState);
    }
    
    // If editing a draft or post, this callback is used in 'useEffect' hook below to obtain the draft or post data
    const loadedDraftOrPost = useCallback( () => { 
      return props.user.posts.find( post => `${post.id}` === props.match.params.postID)
    },[props.user, props.match])

    // Sets the buttons depending on whether we have a new draft, a draft, or a published post
    let buttons
    // the conditional does not depend on state
    if ( props.match.url === "/profile/drafts/new" ) {
      buttons = [saveAsDraftButton, publishNewButton]
    } else {
      if (props.match.path === "/profile/drafts/:postID") {
          buttons = [saveButton, publishDraftButton, deleteButton]
      } else if (props.match.path === "/posts/edit/:postID") {
          buttons = [saveAndPublishButton, deleteButton]
      }
    }
  
  // Loads the editor with the dummy content provided in 'draftOrPost' state variable
  // This is needed to ensure that the editor does not break when refreshing the page on a draft or post
  // A total painstaking process to achieve this
  const loadedInitialEditorState = useCallback( () => (EditorState.createWithContent(convertFromHTML(draftOrPost.body))),[draftOrPost])

  // Takes the incoming draft or post and defines a new Editor state using the draft or post
  // This will be used to replace the dummy state created by 'loadedInitialEditorState' above
  // This ensures that the editor does not break when refreshing the page on a draft or post
  const reinitializeState = useCallback ((argument) => {
    const blocksFromHTML = convertFromHTML(argument.body);
    const result = EditorState.createWithContent(blocksFromHTML)
    return result
  },[])


  useEffect( () => {
    if (props.match.url !== "/profile/drafts/new") {
      if (props.user.posts) {
        // 'content' is the incoming draft or post
        const content = loadedDraftOrPost()
        setDraftOrPost(content)
        // replaces the inital dummy content with the content from the draft or post
        setEditorState(reinitializeState(content))
      }
    }
  },[props.user, props.match, loadedDraftOrPost, reinitializeState, draftOrPost])


  // If a new draft, just create a blank editor ('EditorState.createEmpty()')
  // If editing a draft or post, load the editor with some dummy state;
  // the dummy state will be later replaced in 'useEffect' hook
  // This is needed for the editor not to break when refreshing the page while editing a draft or post
  // A total painstaking process to achieve this
  const [editorState, setEditorState] = useState( 
    () => {
      if(props.match.url === "/profile/drafts/new") {
        return EditorState.createEmpty()
      } else {
        return loadedInitialEditorState()
      }
    }
  );
    
  // --------------------- POST EDITOR END ------------------------
        
  return (
    <div className="App postEditor">
      <div>{props.loading}</div>
      <header className="App-header">
        Post Editor
      </header>
      {/* Renders the post editor */}
      <Editor 
        editorState={editorState}
        onEditorStateChange={handleEditorChange}
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
      />
      {/* Renders the "Save, Publish,Delete, etc." buttons below post editor */}
      {buttons.map( (button, index) => 
        <React.Fragment key={index}>
            {button}
        </React.Fragment> 
       )}
        {/* Renders the "Upload a cover image" button; it is a full compponent */}
        <S3ImageService2 retrieveImageState = {retrieveImageState} user = {props.user} {...props} />
    </div>
  )
}
export default PostEditor2;