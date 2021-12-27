# Blog API

This is the repo for the Blog API project in the NodeJS course of The Odin Project.  The purpose of the project was to build a RESTful API backend for a personal blog site.

## What I Learned

### RESTful Explained

I've had previous projects and lessons that talked about RESTful APIs.  Every time I kept reading representational state transfer my head would just explode.  I followed the examples given to me and didn't think much of it.  I did some more deep dives but couldn't really put the pieces together as to how something is RESTful.  I felt like every article I found was just as abstract as the term itself.

I was really impressed with the articles found for the lessons in this course.  (Best practices for REST API design)[https://stackoverflow.blog/2020/03/02/best-practices-for-rest-api-design/] and (How to create a REST API with Express.js in Node.js)[https://www.robinwieruch.de/node-express-server-rest-api/] did a really great job explaining how something was RESTful.  It's about how the API paths are structured and utilizing the HTML methods to make the appropriate changes to the data.

### Method Override

HTML forms will only take `GET` and `POST` methods for their submissions.  On a previous project I worked around this by making all my methods involving changes to be `POST` and creating specific routes for those changes.  While this workaround makes things work with the two methods, it can be verbose and later on confusing because we aren't taking advantage of the HTML verbs available to us.  I didn't know this even existed, but there's a piece of middleware from Express called (method-override)[http://expressjs.com/en/resources/middleware/method-override.html] that addresses this issue.  By placing the piece of middleware in our server code and changing the action route to include a query string for our desired method, method-override opens up all the HTML verbs available.  Thanks to the article (Method override for PUT and DELETE in HTML)[https://dev.to/moz5691/method-override-for-put-and-delete-in-html-3fp2] for the middleware recommend.

### How to use cURL

I've been spending some significant time learning about Linux and trying to get comfortable with the command line.  As I was converting the project to a RESTful API, I needed a way to test the routes to make sure they were doing what they were supposed to be doing.  The project instructions suggested using cURL to test the routes, so I thought I would give it a go.  I found the article (The curl guide to HTTP requests)[https://flaviocopes.com/http-curl/] that gave a brief overview of some commong cURL commands with examples.  The more I tested the project, the commands became less intimidating to enter in.  Lengthy code inputs can be very daunting when they haven't been seen by a trained eye.

### Sending appropriate API responses

According to the article (Best practices for REST API design)[https://stackoverflow.blog/2020/03/02/best-practices-for-rest-api-design/] the API is supposed to accept and respond with JSON.  This puzzled me for a bit because of how Express can only handle one response being sent.  If I held on to the principle of just sending JSON everytime, the front-end would be nothing but data.  I thought it was clever to introduce some extra logic so that the API will stay in the UI and send JSON otherwise as per API best practice.  In order for this to happen, I created a hidden input element in all the forms that would trigger the appropriate logic if detected.

### Client-Side Rendering

I'm not sure if I'm really doing client-side rendering since I'm still pushing everything through the template engine in Express, but what I'm not doing is pushing any server-side data through the template engine.  I'm only familiar with processing anything involving a database with a server-side render.  It makes sense in my head to handle anything dynamic on the server as much as possible since I'm guessing the server has more computing power than the client's browser.

It's a change of pace to try to think of doing my rendering on the client side for cases like this.  I decided to make things easier by using the `fetch` API to retrieve the info from the database.  Because of this, I do have a lot of JavaScript code for creating the necessary elements.  It's rather tedious, but I could use the exercise just in case things need to be handled on the client.  Having the Express template engine really makes dynamic rendering easier.