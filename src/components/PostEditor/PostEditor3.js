import React, { useState, useCallback, useEffect, useContext, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { EditorState, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { convertToRaw } from 'draft-js';  
// import { convertFromRaw } from 'draft-js'; //do not delete this line; can be used for future improvement
import { convertFromHTML } from 'draft-convert';
// import { convertToHTML } from 'draft-convert';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
// import { Map } from 'immutable'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { GreenButton, DangerButton } from '../decorators/Buttons'
import { addPost, editPost, deletePost } from '../../actions/postsAndCommentsActions';
import  S3ImageService2  from '../images/S3ImageService2'
import { manageImageForNewDraftOrPost } from '../../actions/imageActions'
import { manageImageForDraftOrPost } from '../../actions/imageActions'
import { extractTitle } from './postEditorHelper'
import { noBody, noTitle } from './validPost';
import axios from 'axios'
import { ModalContext } from '../modal/ModalContext'
import { AllowedEmbedWebsites } from './allowedWebsites';
import { mediaBlockRenderer } from './mediaBlockRenderer';
import { editorLabels } from './editorLabels';


const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1),
    },
  }));

//   FUNCTIONAL COMPONENT; MAIN COMPONENT
const PostEditor3 = (props) => {

    const dispatch = useDispatch()

    const classes = useStyles();
    
    // --------------------- CRUD ACTIONS START ------------------------------------

        // --------------- Image Data Retrieval START-------------------
    // This variable is set when the user selects a picture to upload
    const [imageState, setImageState] = useState()
    // This function is passed to the child S3ImageService2 component in return block; it is activated when the user selects an image for upload
    const retrieveImageState = useCallback ((file) => {
        setImageState(file)
    },[])
        // --------------- Image Data Retrieval END-------------------

    
    //<------------- FUNCTIONS FOR POST EDITOR BUTTONS START ------------->
      // Special note: the below post editor functions may seem repetitive; however, I highly recommend to keep individual definitions
      // for each function as there are four/five different cases for saving/updating a post; when a problem arises regarding a case, you can
      // go directly to the function that handles that specific case; if the functions are merged, it will be hard to debug the code 
      // as your changes may affect more than one case, potentially leading to more problems rather than solutions

    // saves a NEW draft and keeps it as a draft
    const saveDraft = (event) => {
        const data = draftToHtml(convertToRaw(editorState.getCurrentContent()));
        const endpoint = "/draft" 
        const postExtraction = extractTitle(data)
        const rawPostData = {body: data, title: postExtraction[0]?.slice(1), abstract: postExtraction[1]?.slice(1), status: "draft"}
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
        if (noTitle(data, postExtraction)) {
          props.retrieveModalState(["Posts need to include an H1 title"])
          window.scrollTo({ top: 0, left: 0, behavior: 'smooth'} )
        } else if (noBody(postExtraction)) {
          props.retrieveModalState(["Posts need to include a body"])
          window.scrollTo({ top: 0, left: 0, behavior: 'smooth'} )
        } else {
          resolveImageThenResolvePost()
        }
    }

    // saves a NEW draft and automatically publishes it; no longer a draft, now a published post
    const savePost = () => {
        const data = draftToHtml(convertToRaw(editorState.getCurrentContent()));
        const endpoint = "/publish" 
        const postExtraction = extractTitle(data)
        const rawPostData = {body: data, title: postExtraction[0]?.slice(1), abstract: postExtraction[1]?.slice(1), status: "published"}
        const resolveImageThenResolvePost = async () => {
            dispatch({type: 'LOADING_POSTS', payload: "Managing image..."})
            const imageData = await manageImageForNewDraftOrPost(imageState);
            let postData = Object.assign({}, rawPostData, {images_attributes: imageData})
            console.log(postData)
            dispatch({type: 'LOADING_POSTS', payload: "Managing post..."})
            dispatch(addPost(endpoint, postData, props))    
        }
        if (noTitle(data, postExtraction)) {
          props.retrieveModalState(["Posts need to include an H1 title"])
          window.scrollTo({ top: 0, left: 0, behavior: 'smooth'} )
        } else if (noBody(postExtraction)) {
          props.retrieveModalState(["Posts need to include a body"])
          window.scrollTo({ top: 0, left: 0, behavior: 'smooth'} )
        } else {
          resolveImageThenResolvePost()
          window.scrollTo({ top: 0, left: 0, behavior: 'smooth'} )
        }
    }

    // updates an already created draft
    const updateDraft = () => {
        const data = draftToHtml(convertToRaw(editorState.getCurrentContent()));
        const endpoint = `/posts/${props.match.params.postID}`
        const currentPost = props.user.posts.find(post => `${post.id}` === props.match.params.postID)
        const postExtraction = extractTitle(data)
        const rawPostData = {body: data, title: postExtraction[0]?.slice(1), abstract: postExtraction[1]?.slice(1), status: "draft"}
        console.log(extractTitle(data))
        console.log(imageState)
        const resolveImageThenResolvePost = async () => {
            dispatch({type: 'LOADING_POSTS', payload: "Managing image..."})
            const imageData = await manageImageForDraftOrPost(currentPost, imageState);
            let postData = Object.assign({}, rawPostData, {images_attributes: imageData})
            console.log(postData)
            dispatch({type: 'LOADING_POSTS', payload: "Managing post..."})
            dispatch(editPost(endpoint, postData, props ))
        }
        if (noTitle(data, postExtraction)) {
          props.retrieveModalState(["Posts need to include an H1 title"])
          window.scrollTo({ top: 0, left: 0, behavior: 'smooth'} )
        } else if (noBody(postExtraction)) {
          props.retrieveModalState(["Posts need to include a body"])
          window.scrollTo({ top: 0, left: 0, behavior: 'smooth'} )
        } else {
          resolveImageThenResolvePost()
          window.scrollTo({ top: 0, left: 0, behavior: 'smooth'} )
        }
    }

    // Two things: –updates an existing draft and changes it into a post (basically, pubslihes the draft); 
    //             –updates and republishes an existing post
    const updatePost = () => {
        // const data = convertToHTML(editorState.getCurrentContent());
        const data = draftToHtml(convertToRaw(editorState.getCurrentContent()));
        const endpoint = `/posts/${props.match.params.postID}`
        const currentPost = props.user.posts.find(post => `${post.id}` === props.match.params.postID)
        const postExtraction = extractTitle(data)
        const rawPostData = {body: data, title: postExtraction[0]?.slice(1), abstract: postExtraction[1]?.slice(1), status: "published"}
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
        if (noTitle(data, postExtraction)) {
          props.retrieveModalState(["Posts need to include an H1 title"])
          window.scrollTo({ top: 0, left: 0, behavior: 'smooth'} )
        } else if (noBody(postExtraction)) {
          props.retrieveModalState(["Posts need to include a body"])
          window.scrollTo({ top: 0, left: 0, behavior: 'smooth'} )
        } else {
          resolveImageThenResolvePost()
          window.scrollTo({ top: 0, left: 0, behavior: 'smooth'} )
        }
    }

    // deletes an existing draft or post
    const removePost = () => {
        const postID = props.match.params.postID
        const endpoint = `/posts/${postID}`
        const currentPost = props.user.posts.find(post => `${post.id}` === props.match.params.postID)
        console.log(currentPost)
        const resolveImageThenResolvePost = async () => {
            await manageImageForDraftOrPost(currentPost);
            dispatch(deletePost(endpoint, currentPost, props))
        }
        resolveImageThenResolvePost()
    }

    // <------------- FUNCTIONS FOR POST EDITOR BUTTONS END ------------->

    // POST EDITOR BUTTONS

        //   ------------ NEW POST  ---------------
        // Saves a new  draft and keepts it as a draft
    const saveAsDraftButton = <Button 
                                onClick={saveDraft}
                                color="primary" variant="contained" component="span"
                                disableElevation
                              >Save as Draft
                              </Button>

        // Saves a new draft and immediately publishes it; no longer a draft, now a published post
    const publishNewButton = <GreenButton 
                                onClick={savePost}
                                color="primary" variant="contained" component="span"
                                disableElevation
                                className={classes.margin}
                              >Publish
                              </GreenButton>  

    //   ------------ DRAFT POST ---------------
        //   Updating a draft post and keeping it as a draft
    const saveButton = <Button 
                          onClick={(event) => updateDraft(event)}
                          color="primary" variant="contained" component="span"
                          disableElevation
                        >Save
                        </Button>

        //   Publishing a draft
    const publishDraftButton = <GreenButton 
                                  onClick={updatePost}
                                  color="primary" variant="contained" component="span"
                                  disableElevation
                                  className={classes.margin}
                               >Publish
                               </GreenButton>  
    
    //   ------------ PUBLISHED POST  ---------------
        // Updates an already published post
    const saveAndPublishButton = <GreenButton 
                                    onClick={updatePost}
                                    color="primary" variant="contained" component="span"
                                    disableElevation
                                    className={classes.margin}
                                  >Save and Publish
                                  </GreenButton>
    
    //   ------------ DELETE DRAFT OR POST  ---------------
    const deleteButton = <DangerButton 
                           onClick={removePost}
                           disableElevation
                          >Delete
                          </DangerButton>

    // --------------------- CRUD ACTIONS END ------------------------
    
    
    
    // --------------------- POST EDITOR START ------------------------
    
                // GET READY FOR THIS!!!!! 
      
    // If editing a draft or post, the below line provides dummy content for the editor to start with while the draft or post data is loaded
    const [draftOrPost, setDraftOrPost] = useState({body: "<p>Loading content...</p>"})
    
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
  
  // Loads the editor with the "dummy content" provided in 'draftOrPost' state variable
  // This is needed to ensure that the editor does not break when refreshing the page on a draft or post
  // A total painstaking process to arrive to this; took me many, many hours to come up with this solutio to stabilize the editor
  const loadedInitialEditorState = useCallback( () => (EditorState.createWithContent(convertFromHTML(draftOrPost.body))),[draftOrPost])

  // Takes the incoming draft or post and defines a new Editor state using the draft or post
  // This will be used to replace the dummy state created by 'loadedInitialEditorState' above
  // This ensures that the editor does not break when refreshing the page on a draft or post
  const reinitializeState = useCallback ((argument) => {
    const blocksFromHTML = htmlToDraft(argument?.body);
    const { contentBlocks, entityMap} = blocksFromHTML;
    const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
    const stateWithRealPost = EditorState.createWithContent(contentState);
    return stateWithRealPost;
  },[])

  const editor = useRef(null)

  useEffect( () => {
    if (props.match.url !== "/profile/drafts/new") {
      if (props.user.posts) {
        // 'content' is the incoming draft or post
        const content = loadedDraftOrPost()
        setDraftOrPost(content)
        // replaces the inital dummy content with the content from the draft or post
        setEditorState(reinitializeState(content))
        // editor.current.focus()
      }
    }
  },[props.user, props.match, loadedDraftOrPost, reinitializeState, draftOrPost], () => setTimeout(() => editor.current.focus(),0)
  )

  // If a new draft, create a blank editor with "Title" as the first line
  // If editing a draft or post, load the editor with some dummy state 'loadedInitialEditorState()';
  // the dummy state will be later replaced in 'useEffect' hook above
  // This is needed for the editor not to break when refreshing the page while editing a draft or post
  const [editorState, setEditorState] = useState( 
    () => {
      if(props.match.url === "/profile/drafts/new") {    
        return reinitializeState({body: "<h1>Title</h1>"})
      } else {
        return loadedInitialEditorState()
      }
    }
  );

  const handlePastedText = (text, styles, editorState) => {
    // INCREDIBLE: leaving this function empty normalizes the pasted text's font size and background color, while keeping 
    // special features, such as bullet points, links, monospace, ...
    // setEditorState(removeEditorStyles(text, editorState))
  }

  const { retrieveModalState } = useContext(ModalContext)

  const embeddedUrl = (url) => {
    let boolean = false
    AllowedEmbedWebsites.forEach( domain => {
      if(url.indexOf(domain) > -1 ) { boolean = true}
    })
    if (boolean) return url 
    // if (boolean) return 'https://gist-it.appspot.com/https://gist.github.com/mmartinezluis/b0ee57fc92ee0771d8230af0f3ca98ab' 
    return retrieveModalState([
      "Only the following domains are allowed for embedded websites:", 
      ...AllowedEmbedWebsites,
      "If you believe another domain should be supported, email the website's administrator"
    ], 15000)
  }

  function uploadImageCallback(file) {
    return new Promise((resolve, reject) => {
      const config = {
        headers: {
          Authorization: "Bearer " + process.env.REACT_APP_IMGUR_ACCESS_TOKEN
        },
      };
      if (file.size > 1500000) return reject(retrieveModalState(['Max file size is 1.5 MB']))
      axios.post("https://api.imgur.com/3/image", file, config).then((res) => {
        console.log(res);
        resolve({ data: { link: res.data.data.link + `deleteHash${res.data.data.deletehash}` } } )
      }).catch(error => {
        console.log(error)
        reject()
      });
    });
  }
  
  // --------------------- POST EDITOR END ------------------------
        
  return (
    <div className="App postEditor">
      <div>{props.loading}</div>
      <header className="posteditor-header">
        Post Editor
      </header>
      {/* "Edtitor" Renders the post editor */}
      <Editor 
        // ref={editor}
        editorState={editorState}
        onEditorStateChange={handleEditorChange}
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
        spellCheck = {true}
        handlePastedText = {handlePastedText}
        blockStyleFn={myBlockStyleFn}
        localization={{ locale: 'en', translations: editorLabels }}
        toolbar={{
            options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'colorPicker', 'link', 'embedded', 'emoji', 'image', 'remove', 'history'],
            // options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'embedded', 'emoji', 'image', 'remove', 'history'],
            blockType: {
                inDropdown: false,
                options: ['Normal', 'H1', 'H2', 'Blockquote', 'Code']
            },
            list: {
              options: ['unordered', 'ordered']
            },
            fontSize: {
                options: [16, 18, 24]
            },
            embedded: {
              defaultSize: {
                height: 'auto',
                width: '100%',
              },
              embedCallback: embeddedUrl,
            },
            image: {
              className: 'image',
              urlEnabled: true,
              uploadCallback: uploadImageCallback,
              alignmentEnabled: false,
              defaultSize: {
                height: 'auto',
                width: '100%',
              }
            }
        }}
        blockRendererFn = {mediaBlockRenderer}
      />
      {/* Renders the Save As Draft, Publish, Save, Save and Publish, and Delete buttons below post editor */}
      {buttons.map( (button, index) => 
        <React.Fragment key={index}>
            {button}
        </React.Fragment> 
       )}
        {/* Renders the "Upload A Cover Image" button; this button is a full compponent by itself */}
        <S3ImageService2 retrieveImageState={retrieveImageState} user = {props.user} {...props} />
    </div>
  )
}

export default PostEditor3;


// This function applies the CSS class 'superFancyBlockquote' to text of type blockquote
function myBlockStyleFn(contentBlock) {
    const type = contentBlock.getType();
    if (type === 'blockquote') {
      return 'superFancyBlockquote';
    }
  }