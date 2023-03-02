# Blog App

## Prerequisites

Nodejs should be installed on the system

## Running locally in development mode

To get started, run `npm install && npm run dev`:

    npm install
    npm run dev

Note: If you are running on Windows run install --noptional flag (i.e. `npm install --no-optional`) which will skip installing fsevents.

## Building and deploying in production

If you wanted to run this site in production, you should install modules then build the site with `npm run build` and run it with `npm start`:

    npm install
    npm run build
    npm start

You should run `npm run build` again any time you make changes to the site.


This Project contains two pages , users and posts.



## Posts Page

Posts page contain pagination at the top and bottom to switch between pages.

The edit button opens a modal to edit the title and the body of the post.Assuming that these changes will effect only in local.

The delete button similarly deletes the post from the local state.

## Users Page

The users page displays the user information with a view posts button that leads to the posts of that particular user.


The search bar on the both pages support searching.


### Given more time
Given more time , we could enhance the UI , apply caching to do faster loading and optimize the code.

