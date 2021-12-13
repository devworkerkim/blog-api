# Blog API

This is the repo for the Blog API project in the NodeJS course of The Odin Project.  The purpose of the project was to build a RESTful API backend for a personal blog site.

## What I Learned

### RESTful Explained

I've had previous projects and lessons that talked about RESTful APIs.  Every time I kept reading representational state transfer my head would just explode.  I followed the examples given to me and didn't think much of it.  I did some more deep dives but couldn't really put the pieces together as to how something is RESTful.  I felt like every article I found was just as abstract as the term itself.

I was really impressed with the articles found for the lessons in this course.  (Best practices for REST API design)[https://stackoverflow.blog/2020/03/02/best-practices-for-rest-api-design/] and (How to create a REST API with Express.js in Node.js)[https://www.robinwieruch.de/node-express-server-rest-api/] did a really great job explaining how something was RESTful.  It's about how the API paths are structured and utilizing the HTML methods to make the appropriate changes to the data.

### Method Override

HTML forms will only take `GET` and `POST` methods for their submissions.  On a previous project I worked around this by making all my methods involving changes to be `POST` and creating specific routes for those changes.  While this workaround makes things work with the two methods, it can be verbose and later on confusing because we aren't taking advantage of the HTML verbs available to us.  I didn't know this even existed, but there's a piece of middleware from Express called (method-override)[http://expressjs.com/en/resources/middleware/method-override.html] that addresses this issue.  By placing the piece of middleware in our server code and changing the action route to include a query string for our desired method, method-override opens up all the HTML verbs available.  Thanks to the article (Method override for PUT and DELETE in HTML)[https://dev.to/moz5691/method-override-for-put-and-delete-in-html-3fp2] for the middleware recommend.

