import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { scheduleImagesForDestruction } from '../actions/imageActions';


const About = () => {

    const location = useLocation();
    const previousPath = location.state?.from.pathname
    const initial = useSelector((state) => state.images.currentDraftOrPostBodyImages.newImages)
    
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
            <img src="https://devblogimages.s3-us-east-2.amazonaws.com/31kNA6X2YPNbV887n14RRT.png" 
                className="image" 
                alt="Devlog's post editor in About page"
            />
            <p>DevBlog is a <b>React JS</b> and <b>Redux</b> frontend app served with a <b>Ruby on Rails</b> backend API. 
                When planning for DevBlog, I decided that I wanted a website that is non-invasive, 
                that is, a website in which users can browse all of the website's resources without 
                the need of logging in or signing up, and no unexpected pop-up windows after 
                five minutes of browsing. DevBlog accomplishes just that: you can browse 
                all of the website's resources without logging in. Creating an account in DevBlog is only 
                required when you want to create a blog post to publish it to the website.
            </p>

            <p>DevBlog consumes a series of APIs, cloud services, and microservices to power some 
                of its functionalities, such as the <b>New York Times API</b> for complementary world news 
                posts while the site grows, the <b>Imgur API</b> for storing the body images of blog posts, <b>Amazon Web Services S3</b> for 
                storing the cover image of blog posts, and the <b>Disqus microservice</b> for storing and managing the comments for blog posts. 
            </p>

            <p>DevBlog runs an <b>email service</b> for verifying new users' emails, and <b>background workers</b> that 
                help in keeping the integrity of the data persisted to its backend. 
                DevBlog also counts with an interesting <b>frontend-backend interlocking system</b> that 
                automatically deletes the body images from unsaved blog posts. 
            </p>

            <p>You can find the source code for <a href='https://github.com/mmartinezluis/devblog-frontend' target="_blank" rel='noreferrer'>DevBlog frontend</a> and <a href='https://github.com/mmartinezluis/devblog-backend-postgres' target="_blank" rel='noreferrer'>DevBlog backend</a> on this line.
            </p>

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