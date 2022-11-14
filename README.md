# DevBlog
![DevBlog demo ](https://user-images.githubusercontent.com/75151961/201683056-f36c8175-dad9-4026-8003-c19abc3aa3aa.gif)

Welcome to [DevBlog](https://devblog.dev/). DevBlog is a rich, complex, and evolving app for coding-related blog posts. DevBlog's front end is powered by React JS, along with Redux for state management. Its [backend](https://github.com/mmartinezluis/devblog-backend-postgres) is a Ruby on Rails API. DevBlog's most powerful tool is its Draft JS Wysiwyg editor, which supports rich-text editing, such as inline code, code snippets, blockquotes, uploading images, and embedding iframes. 

DevBlog integrates an evolving ecosystem of APIs and cloud services that power its functionalities, which include Amazon Web Services S3, Amazon Web Services EC2, the Imgur API, and the New York Times API. 

DevBlog performs high degree filtering of HTML through the sanitize-html package to safely render HTML content on its pages. 

DevBlog is currently optimized for social media sharing, that is, you can copy a link from the website and paste it in a social media platform, and a preview image and title will be generated related to the contents of the pasted link (LinkedIn, FaceBook, and Slack tested and verified so far). 

## Functionalities
In DevBlog, users can browse the website's posts list, authors list, blog posts, and authors profile pages, all without the need of loggin in. Login is only required for creating blog posts and updating your profile page. 

When you publish in DevBlog, your post will be shown as the main post in the homepage, and it will be placed at the top of the posts list. In addition, your name will be moved to the top of the authors list. 

Through their profile page, users have access to their drafts, published posts, and their profile form. In their profile form, users can share their contact info, complete an about section, and/or upload a profile iamge, all of which will be visible to the visitors of the website when clicking on an author's name. 

Users can write a post and save it as a draft, or publish it immediately. Posts saved as drafts can be published at any given time; posts and drafts can be updated at any given time. In addition, users can upload a cover image for their blog posts, and include more images in the body of blog posts. 

## Progress
DevBlog is continously evolving. The next on the way major integrations for DevBlog include OmniAuth via Google, Facebook, and/or other platforms; integrating a comments editor, and displaying of comments for blog posts. 

## Installation
Installation instructions for running this app locally will be coming soon.