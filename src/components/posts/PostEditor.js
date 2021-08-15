import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
// import { convertToRaw } from 'draft-js';  do not delete this line; can be used for future improvement
// import { convertFromRaw } from 'draft-js'; do not delete this line; can be used for future improvement
import { convertToHTML, convertFromHTML } from 'draft-convert';
// import DOMPurify from 'dompurify';
import Button from '@material-ui/core/Button';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { green, blueGrey } from '@material-ui/core/colors';
import { addPost, editPost, deletePost } from '../../actions/postsAndCommentsActions';
import  S3ImageService  from '../images/S3ImageService'
import { manageImageForNewDraftOrPost } from '../../actions/imageActions'
import { manageImageForDraftOrPost } from '../../actions/imageActions'
import { extractTitle } from '../../actions/postEditorHelper'

const ColorButton = withStyles((theme) => ({
    root: {
      backgroundColor: green[600],
      '&:hover': {
        backgroundColor: green[800],
      },
    },
  }))(Button);

const DangerButton = withStyles((theme) => ({
    root: {
      backgroundColor: blueGrey[200],
      '&:hover': {
        backgroundColor: blueGrey[400],
      },
    },
  }))(Button);

const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1),
    },
  }));
  
//   FUNCTIONAL COMPONENT
const PostEditor = (props) => {

    const dispatch = useDispatch()

    const classes = useStyles();
    
    
    // --------------------- CRUD ACTIONS START ------------------------------------

        // --------------- Image Data Retrieval -------------------

    const [imageState, setImageState] = useState()
    
    const retrieveImageState = useCallback ((file) => {
        setImageState(file)
    },[])

        // --------------- Image Data Retrieval -------------------

    // FUNCTIONS FOR POST EDITOR BUTTONS

    const saveDraft = (event) => {
        const data = convertToHTML(editorState.getCurrentContent());
        const endpoint = "/draft" 
        const postExtraction = extractTitle(data)
        const rawPostData = {body: data, title: postExtraction[0]?.slice(1), abstract: postExtraction[2]?.slice(1), status: "draft"}
        console.log(imageState)
        // "manageImageForNewDraftOrPost" below return a Promise; to get the data out of the promise we need to
        // wrap the function in an async/await block to wait until the promise is resolved
        const resolveImageThenResolvePost = async () => {
            const imageData = await manageImageForNewDraftOrPost(imageState);
            let postData = Object.assign({}, rawPostData, {images_attributes: imageData})
            console.log(postData)
            dispatch(addPost(endpoint, postData, props))    
        }
        resolveImageThenResolvePost()
    }

    const savePost = () => {
        const data = convertToHTML(editorState.getCurrentContent());
        const endpoint = "/publish" 
        const postExtraction = extractTitle(data)
        const rawPostData = {body: data, title: postExtraction[0]?.slice(1), abstract: postExtraction[2]?.slice(1), status: "published"}
        const resolveImageThenResolvePost = async () => {
            const imageData = await manageImageForNewDraftOrPost(imageState);
            let postData = Object.assign({}, rawPostData, {images_attributes: imageData})
            console.log(postData)
            dispatch(addPost(endpoint, postData, props))    
        }
        resolveImageThenResolvePost()
    }

    const updateDraft = () => {
        const data = convertToHTML(editorState.getCurrentContent());
        const endpoint = `/posts/${props.match.params.postID}`
        const currentPost = props.user.posts.find(post => `${post.id}` === props.match.params.postID)
        const postExtraction = extractTitle(data)
        const rawPostData = {body: data, title: postExtraction[0]?.slice(1), abstract: postExtraction[2]?.slice(1), status: "draft"}
        console.log(extractTitle(data))
        console.log(imageState)
        const resolveImageThenResolvePost = async () => {
            dispatch({type: 'LOADING_POST', payload: "Managing image ..."})
            const imageData = await manageImageForDraftOrPost(currentPost, imageState);
            let postData = Object.assign({}, rawPostData, {images_attributes: imageData})
            console.log(postData)
            dispatch({type: 'LOADING_POST', payload: "Managing post ..."})
            dispatch(editPost(endpoint, postData, props, props.retrieveModalState))
            props.history.push("/profile")
        }
        resolveImageThenResolvePost()
    }

    const updatePost = () => {
        const data = convertToHTML(editorState.getCurrentContent());
        const endpoint = `/posts/${props.match.params.postID}`
        const currentPost = props.user.posts.find(post => `${post.id}` === props.match.params.postID)
        const postExtraction = extractTitle(data)
        const rawPostData = {body: data, title: postExtraction[0]?.slice(1), abstract: postExtraction[2]?.slice(1), status: "published"}
        console.log(extractTitle(data))
        console.log(imageState)
        const resolveImageThenResolvePost = async () => {
            const imageData = await manageImageForDraftOrPost(currentPost, imageState);
            let postData = Object.assign({}, rawPostData, {images_attributes: imageData})
            console.log(postData)
            dispatch(editPost(endpoint, postData, props))
        }
        resolveImageThenResolvePost()
    }

    const removePost = () => {
        const postID = props.match.params.postID
        const endpoint = `/posts/${postID}`
        const currentPost = props.user.posts.find(post => `${post.id}` === props.match.params.postID)
        console.log(currentPost)
        const resolveImageThenResolvePost = async () => {
            await manageImageForDraftOrPost(currentPost);
            // dispatch(deletePost(endpoint, postID))
            dispatch(deletePost(endpoint, currentPost))
            props.history.push("/profile")
        }
        resolveImageThenResolvePost()
    }

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
                                className={classes.margin}
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
                                  className={classes.margin}
                               >Publish
                               </ColorButton>  
    
    //   ------------ PUBLISHED POST  ---------------
    const saveAndPublishButton = <ColorButton 
                                    onClick={updatePost}
                                    color="primary" variant="contained" component="span"
                                    disableElevation
                                    className={classes.margin}
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
    let buttons
    let initialEditorState = null;
    let initialImageState = null
    // const storeRaw = localStorage.getItem('draftRaw')


    // const saveRaw = (currentContent) => {
    //     let contentRaw = convertToRaw(currentContent);
    //     localStorage.setItem('draftRaw', JSON.stringify(contentRaw))
    // }

    function handleEditorChange(state){
        setEditorState(state)
        // const contentState = editorState.getCurrentContent();
        // saveRaw(contentState);
    }

    if ( props.match.url === "/profile/drafts/new" ) {
        initialEditorState = EditorState.createEmpty();
        buttons = [saveAsDraftButton, publishNewButton]
    } else {
        const draftOrPost = Object.keys(props.user).length > 0 && props.user.posts.find(post => `${post.id}` === props.match.params.postID)
        const info = convertFromHTML(draftOrPost.body)
        initialEditorState = EditorState.createWithContent(info)
        initialImageState =  draftOrPost.images[0]
        console.log(props.user)
        if (props.match.path === "/profile/drafts/:postID") {
            buttons = [saveButton, publishDraftButton, deleteButton]
        } else if (props.match.path === "/posts/edit/:postID") {
            buttons = [saveAndPublishButton, deleteButton]
        }
    }

    const [editorState, setEditorState] = useState( 
        () => initialEditorState
    );

    // --------------------- POST EDITOR END ------------------------
        
  return (
    <div className="App postEditor">
      <h4> {props.loading}</h4>
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
      {/* Renders the "Save, Publish, ... Delete buttons below post editor" */}
      {buttons.map( (button, index) => 
        <React.Fragment key={index}>
            {button}
        </React.Fragment> 
       )}
        {/* Renders the "Upload a cover image" button; it is a full compponent */}
        <S3ImageService retrieveImageState= {retrieveImageState} initialImageState = {initialImageState} />
    </div>
  )
}
export default PostEditor;