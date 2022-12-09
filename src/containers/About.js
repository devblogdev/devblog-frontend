import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { scheduleImagesForDestruction } from '../actions/imageActions';
import { GreenButton } from '../components/decorators/Buttons';
import ImageResize from '../components/decorators/ImageResize';
import flowChart from "../DevBlog_PUBLISH_button.png"

const About = () => {

    const location = useLocation();
    const previousPath = location.state?.from.pathname
    const initial = useSelector((state) => state.images.currentDraftOrPostBodyImages.newImages)

    const [showFlowchart, setShowFlowchart] = useState(false);
    
    useEffect( () => {
        if( (previousPath?.includes("/profile/drafts/") || previousPath?.includes("/posts/edit/")) && initial.size ) scheduleImagesForDestruction(initial, new Set()) 
        // FATAL ERROR: do not dispatch an action here that updates the 'initial' redux variables included in the dependency array of this useFeect
        // doing so will cause the component to rerender and make the code in useEffect to run again, causing an infinite loop 
    },[previousPath, initial] )

    return (
        <div className='aboutPage standardSize'>
            <Helmet>
                {/* <!-- ADDED USING https://megatags.co/#generate-tags --> */}
                {/* <!-- COMMON TAGS --> */}
                <title>About | DevBlog</title>
                {/* <!-- Search Engine --> */}
                <meta name="description" content="DevBlog is a React JS and Redux frontend app served with a Ruby on Rails backend API. Browse all of the website's resources for free; login to create blog posts and customize your author page." />
                <meta name="image" content="https://user-images.githubusercontent.com/75151961/138567246-01b18138-9eb4-4d64-973b-7965083a26a8.png" />
                {/* <!-- Schema.org for Google --> */}
                <meta itemprop="name" content="DevBlog About section" />
                <meta itemprop="description" content="DevBlog is a React JS and Redux frontend app served with a Ruby on Rails backend API. Browse all of the website's resources for free; login to create blog posts and customize your author page." />
                <meta itemprop="image" content="https://user-images.githubusercontent.com/75151961/138567246-01b18138-9eb4-4d64-973b-7965083a26a8.png" />
                {/* <!-- Open Graph general (Facebook, Pinterest & Google+) --> */}
                <meta name="og:title" content="About | DevBlog" />
                <meta name="og:description" content="DevBlog is a React JS and Redux frontend app served with a Ruby on Rails backend API. Browse all of the website's resources for free; login to create blog posts and customize your author page." />
                <meta name="og:image" content="https://user-images.githubusercontent.com/75151961/138567246-01b18138-9eb4-4d64-973b-7965083a26a8.png" />
                <meta name="og:url" content="https://devblog.dev/about" />
                <meta name="og:site_name" content="DevBlog About section" />
                {/* <!-- Open Graph for LinkedIn & Microsoft --> */}
                {/* LINKEDIN */}
                <meta prefix="og: http://ogp.me/ns#" property='og:title' content="About | DevBlog"/>
                <meta prefix="og: http://ogp.me/ns#" property='og:image' content= "https://user-images.githubusercontent.com/75151961/138567246-01b18138-9eb4-4d64-973b-7965083a26a8.png" />
                <meta prefix="og: http://ogp.me/ns#" property='og:description' content="DevBlog is a React JS and Redux frontend app served with a Ruby on Rails backend API ..." />
                <meta prefix="og: http://ogp.me/ns#" property='og:url' content="https://devblog.dev/about" />
                {/* LINKEDIN */}
                {/* <!-- ADDED USING https://megatags.co/#generate-tags --> */}
            </Helmet>

            <h1>About</h1>
            <video controls className='video'>
                <source src="https://user-images.githubusercontent.com/75151961/202080569-100e6858-7ec7-4fbd-b876-a2019f9d27a4.mp4" type='video/mp4'/>
            </video>

            <p>DevBlog is a <b>React JS</b> and <b>Redux</b> frontend app served with a <b>Ruby on Rails</b> backend API. 
                When planning for DevBlog, I decided that I wanted a website that is non-invasive, 
                that is, a website in which users can browse all of the website's resources without 
                the need of logging in or signing up, and no unexpected pop-up windows after 
                five minutes of browsing. DevBlog accomplishes just that: you can browse 
                all of the website's resources without logging in. Creating an account is only 
                required when you want to create a blog post to publish it to the website.
            </p>

            <p>If you are a developer, and you like to document your learning, consider writing in DevBlog.
                When you post in DevBlog, your name rises to the top of the authors list, your post
                gets featured as the main post in the home page, and your post rises to the top of 
                the posts list. In addition, you'll have your profile page where you can include info 
                about yourself for your readers to get to know you more.
            </p>

            <h2>Technologies</h2>

            <p>DevBlog consumes a series of APIs, cloud services, and microservices to power some 
                of its functionalities. Find below a list of the major technologies used in DevBlog:
            </p>

            <ImageResize 
                source="https://user-images.githubusercontent.com/75151961/206332421-9101e90e-f7e5-45a7-af43-6e192a15366f.jpeg"
                altText="DevBlog's tech stack"
            />
            
            <h2>Architecture</h2>
            <p>Some buttons may seem simple at first sight, but there can be a lot going on behind the scenes. Consider such a button in DevBlog's
                post editor, the <em>Publish</em> button, which is responsible for publishing a draft post (click on the button to see what happens 
                behind the scenes):
            </p>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <GreenButton 
                color="primary" 
                variant="contained" 
                component="span"
                onClick={() => setShowFlowchart(true)}
                >
                    Publish
                </GreenButton>
            </div>
            <p>And that is one process; there are other processes going on at DevBlog!!!</p>
            {showFlowchart ?
                <div 
                    className="resize-initial resize-container"
                    onClick={() => setShowFlowchart(false)}
                >
                    <img src={flowChart}
                        className="image resize" 
                        alt="DevBlog PUBLISH button flowchart"
                        onClick={() => setShowFlowchart(false)}
                    />
                </div>
            : null }

            <h2>Code</h2>
            <p>You can find the source code for <a href='https://github.com/mmartinezluis/devblog-frontend' target="_blank" rel='noreferrer'>DevBlog frontend</a> and <a href='https://github.com/mmartinezluis/devblog-backend-postgres' target="_blank" rel='noreferrer'>DevBlog backend</a> on this line.
            </p>

            <br/>
            <p style={{textAlign: 'center'}}><strong>.&nbsp;&nbsp;&nbsp;&nbsp; .&nbsp;&nbsp;&nbsp;&nbsp; .</strong></p>
            <br/>
            <p>DevBlog is still in progress. Please feel free to explore the website's 
                current functionalities!!!
            </p>

            <p>
              <em>Luis Martinez</em><br/>
              <em>Creator of DevBlog</em>
            </p>
        </div>
    )
}

export default About;