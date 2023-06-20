# Contributing to SPMS ERP/MRP Develioment

We welcome Pull Requests (PR's) as well as having people working on fixing it's current issues. If you are coming to this project new.
If you notice an issue with this app, please feel free to open an issue.

A lot of developers prefer asking if they could contribute or be assigned a task as a reply to a reported issue in the Issues tab.  This is great.  We have a strict no gate-keeping policy in any of these projects.  You are welcome to work on any task/issue, just let us know that you are going to work on the an issue.
If you are unsure of the style and design, there is an issue here: <https://github.com/gbowne1/reactsocialnetwork/discussions/36>. Typically, if you think it will take you longer than 72 hours after having been assigned, to submit a PR, let us know that way issues do not go stale.

Some tasks may not be beginner friendly even if tagged `good first issue`.. so try and judge the task accordingly. If you are a beginner, there are smaller tasks a beginner can work on such as style issues.

You should already be familiar with React 17 and or 18, JavaScript ES5/ES6/ES7.

## Style

I have not created an official style guide yet. If anyone would like to create a style guide for us. Create a Discussion.

The layout is a 3 column layout, starting with desktop view with a 200-250px left panel, 1400-1500px center panel and a 200-250px right panel, similar to Facebook's desktop view when looking at the root '/'.

## Development

If you are not sure what to work on, review the issues list.  There are also TODO's listed in the included TODO.md file.

### PR's

  When you do a PR on GitHub, Please make sure you complete the section on the right, Assignees, Reviewers, Labels, Projects, Milestone(s) and Development before you submit the PR.  Please also share a screenshot or show the working fix in the Pull Request message and a brief description of what you fixed.  Blank issues and descriptions may not get merged.

- Link an issue to Development that the PR will close
- Make sure that you tag a reviewer i.e. @gbowne1
- Pick appropriate labels from Labels
- Make sure that you are the assignee to the PR.
- Milestone, choose Frontend or Backend (more may come later on)

### Issues

  We will assign users to issues on a first come, first serve basis. In the future I would like a minimum of 2 people doing Frontend and 2 people doing Backend, then we can assign specific groups of people taking care of things like CSS, Components, etc.

## Editor & IDE

The repository contains folders with project appropriate settings and configurations for Visual Studio and Visual Studio code but beyond that, We are tool and editor/IDE agnostic so you can use whatever editor or IDE or you like.

## Settings & Configuration

The included workspaces, settings, configurations and plugins are for:

Babel
Webpack
ESLint
Prettier
VSCode (.vscode)
GitHub (.github)

These may not be 100% correct, so if you can contribute to them to make them more accurate for React development it is welcomed.

## Tech Stack

 This project was bootstrapped with Create React App.
 This application is built with:

- React 18.0 - 18.2
- JavaScript (ES5/ES6/ES7/ES2015/etc.)
- NodeJS
- Express
- Material UI v5.11
- PostgreSQL v15

## Packages

### Client

    "@babel/core": "^7.17.9",
    "@babel/preset-react": "^7.16.7",
    "@emotion/react": "^11.10.0",
    "@emotion/styled": "^11.10.0",
    "@fortawesome/fontawesome-svg-core": "^6.1.1",
    "@fortawesome/free-solid-svg-icons": "^6.1.1",
    "@fortawesome/react-fontawesome": "^0.2.0",
    "@mui/icons-material": "^5.8.4",
    "@mui/lab": "^5.0.0-alpha.95",
    "@mui/material": "^5.10.1",
    "@testing-library/jest-dom": "^5.16.4",
    "@testing-library/react": "^13.1.1",
    "@testing-library/user-event": "^14.1.1",
    "axios": "^0.27.2",
    "formik": "^2.2.9",
    "mui-datatables": "^4.2.2",
    "prop-types": "^15.8.1",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.3.0",
    "react-scripts": "^5.0.1",
    "sweetalert": "^2.1.2",
    "yup": "^0.32.11"

### Server

    "argon2": "^0.28.7",
    "cors": "^2.8.5",
    "dotenv": "^16.0.1",
    "express": "^4.18.1",
    "express-validator": "^6.14.2",
    "helmet": "^5.1.1",
    "jsonwebtoken": "^8.5.1",
    "multer": "^1.4.5-lts.1",
    "pg": "^8.7.3",
    "pg-format": "^1.0.4",
    "sharp": "^0.30.7"

## Branches

Our branches follow GitFlow / GitHub Flow as a general rule.

- [ main ] main working branch
- [ master ] Permanent // Archive branch
- [ test ] untested code
- Feature Branch # of feature - {feature}
- [bugfix - { fixed bug }]
- [hotfix - { fix }]

Use a test branch to commit/push code that you believe should work but is not completely tested.
If you are not sure, Please ask.
