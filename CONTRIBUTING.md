# **Contributing**

Contributions are made to this repo via Issues and Pull Requests (PRs). A few general guidelines that cover both:

- Search for existing Issues and PRs before creating your own.
- We work hard to makes sure issues are handled in a timely manner but, depending on the impact, it could take a while to investigate the root cause. A friendly ping in the comment thread to the submitter or a contributor can help draw attention if your issue is blocking.

When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.

## **Issues**

Issues should be used to report problems with the website, request a new feature, or to discuss potential changes before a PR is created.

If you find an Issue that addresses the problem you're having, please add your own reproduction information to the existing issue rather than creating a new one. Adding a reaction can also help be indicating to our maintainers that a particular problem is affecting more than just the reporter.

## **Pull Request Process**

In general, we follow the ["fork-and-pull" Git workflow](https://github.com/susam/gitpr)

1. Fork the repository to your own Github account
1. Clone the project to your machine by running `git clone <repository_url>`
1. Get the required dependencies for your projects with `npm i` and run all tests to make sure everything is alright.
1. Make sure you use prettier and to run the development server use:
   ```bash
   npm run dev
   # or
   yarn dev
   ```
1. To keep the forked repo in sync with the main repo do `git remote add upstream https://github.com/robin00007/code-verse.git` once.
1. Now, every time before developing some new feature do:
   ```
   git checkout master
   git pull upstream master
   ```
1. The above command will sync the forked repo with the main repo.
1. Create a new branch locally with a succinct but descriptive name for new feature
1. Commit changes to the branch following any formatting and testing guidelines specific to this repo
1. Push changes to your fork
1. Open a PR in our repository and follow the PR template so that we can efficiently review the changes.

### **NOTE: Always make sure the forked repo is in sync with the main repo before adding any new changes so that merge conflicts can be reduced.**
