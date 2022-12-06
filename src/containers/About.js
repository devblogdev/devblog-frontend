import React from 'react';
import { Helmet } from 'react-helmet';


const About = () => {
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
                class="image" 
                alt="Devlog's post editor in About page"
            />
            <p>DevBlog is a React JS and Redux frontend app served with a Ruby on Rails backend API. 
                When planning for DevBlog, I decided that I wanted a website that is non-invasive, 
                that is, a website in which users can browse all of the website's resources without 
                the need of logging in or signing up. DevBlog accomplishes just that: you can browse 
                all of the website's resources without logging in. Creating an account is only 
                required when you want to create a blog post to publish it to the website.
            </p>

            <p>DevBlog utilizes React router protected routes along with JSON Web Tokens (JWT) 
                to ensure that only registered and verified users can access the website's 
                blog posting functionalities.
            </p>

            <p>In DevBlog users can log in or create an account to access their profile page 
                where they can create a new blog post and either, save it as a draft and continue 
                to work on it later or publish the post, which will be immediately available 
                in the home page and the Posts List. Posts saved as drafts are only visible to 
                the post's author. Users can upload a cover image for their post at the time of 
                publishing or saving the post or at any other time. Moreover, users can delete 
                their posts' cover image or replace it with any other image. Posts' cover images 
                are uploaded to an Amazon Web Services S3 bucket, and an extended copy of the 
                image object is also created in the app's backend API, all happening at the 
                time of clicking the 'Save' or 'Publish' buttons. The post editor also 
                supports uploading images in the body of blog posts as well as integrating iframes. 
                Posts' body images are uploaded to an Imgur API bucket. When users publish a post, 
                their names are added to the top of the Authors List, and their blog post is featured 
                in the main section of the home page. The post is also added to the top of 
                the Posts List. 
            </p>

            <p>In addition to creating blog posts, in their profile page, users can 
                complete their profile form, which includes a bio section, a contact info, 
                and the option to upload a profile image. The info included in the profile 
                form will be publicly visible to DevBlog's visitors in the user's author page. 
            </p>

            <p>DevBlog is still in progress. Please feel free to explore the website's current 
                functionalities.
            </p>

            <p>You can find the GitHub repositories for DevBlog frontend 
                and DevBlog backend on this line.
            </p>

        </div>
    )
}

export default About;