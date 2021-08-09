import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { convertToRaw } from 'draft-js';
// import { convertFromRaw } from 'draft-js';
import { convertToHTML, convertFromHTML } from 'draft-convert';
// import DOMPurify from 'dompurify';

import Button from '@material-ui/core/Button';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { green, blueGrey } from '@material-ui/core/colors';
import { addPost, editPost, deletePost } from '../../actions/postsAndCommentsActions';
import  S3ImageService  from '../images/S3ImageService'
import { manageImageForNewDraftOrPost } from '../../actions/imageActions'
import { manageImageForDraftOrPost } from '../../actions/imageActions'

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
const PostEditor2 = (props) => {

    const dispatch = useDispatch()

    const classes = useStyles();
    
    
    // --------------------- CRUD ACTIONS START ------------------------

    // --------------- Image upload -------------------

    const [imageState, setImageState] = useState()

    const retrieveImageState = (file) => {
        setImageState(file)
    }

    // Functions for post editor buttons
    const saveDraft = (event) => {
        const data = convertToHTML(editorState.getCurrentContent());
        const endpoint = "/draft" 
        const rawPostData = {body: data, status: "draft"}
        console.log(imageState)
        // "manageImageForNewDraftOrPost" below return a Promise; to get the data out of the promise we need to
        // wrap the function in an async/await block to wait until the promise is resolved
        const resolveImageThenResolvePost = async () => {
            const imageData = await manageImageForNewDraftOrPost(imageState);
            let postData =Object.assign({}, rawPostData, {images_attributes: imageData})
            console.log(postData)
            dispatch(addPost(endpoint, postData))    
            props.history.push("/profile")
        }
        resolveImageThenResolvePost()
    }

    const savePost = () => {
        const data = convertToHTML(editorState.getCurrentContent());
        const endpoint = "/publish" 
        const rawPostData = {body: data, status: "published"}
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
        const postData = {body: data, status: "draft"}
        console.log(imageState)
        dispatch(manageImageForDraftOrPost(postData, imageState))
        dispatch(editPost(endpoint, postData))
    }

    const updatePost = () => {
        const data = convertToHTML(editorState.getCurrentContent());
        const endpoint = `/posts/${props.match.params.postID}`
        const postData = {body: data, status: "published"}
        dispatch(editPost(endpoint, postData, props))
    }

    const removePost = () => {
        const postID = props.match.params.postID
        const endpoint = `/posts/${postID}`
        dispatch(deletePost(endpoint, postID))
        props.history.push("/profile")
    }

    // Post editor buttons
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
    
    let buttons

    // const [draftOrPost, setDraftOrPost] = useState({})
    
    // const loadDraftOrPost = () => props.user.posts.find(post => post.id == props.match.params.postID)


    // useEffect(() => {
    //     if (Object.keys(props.user).length > 0) {
    //         setDraftOrPost(loadDraftOrPost())
    //     }
    //   },[props.user])

    //   const [info, setInfo] = useState({})

    //   useEffect(() => {
    //       setInfo(convertFromHTML(draftOrPost.body))
    //   },[draftOrPost])

    // --------------------- POST EDITOR START ------------------------

    let initialEditorState = null;

    const storeRaw = localStorage.getItem('draftRaw')

    const saveRaw = () => {
        let contentRaw = convertToRaw(editorState.getCurrentContent());
        localStorage.setItem('draftRaw', JSON.stringify(contentRaw))
    }

    function handleEditorChange(state){
        setEditorState(state)
        const contentState = editorState.getCurrentContent();
        saveRaw(contentState);
    }

    if ( props.match.url === "/profile/drafts/new" ) {
        initialEditorState = EditorState.createEmpty();
        buttons = [saveAsDraftButton, publishNewButton]
    } else {
        const draftOrPost = props.user.posts.find(post => post.id == props.match.params.postID)
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

    // --------------------- POST EDITOR END ------------------------
    
        // useEffect(() => {
        //     if ( props.match.url === "/profile/drafts/new" ) {
        //         initialEditorState = EditorState.createEmpty();
        //     } else {
        //         initialEditorState = EditorState.createWithContent(info)
        //     }
        // },[info])

    
  return (
    <div className="App">
      <header className="App-header">
        Post Editor
      </header>
      <Editor 
        editorState={editorState}
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
        {/* Renders a button, but it is a full compponent */}
        <S3ImageService retrieveImageState= {retrieveImageState} />
    </div>
  )
}
export default PostEditor2;