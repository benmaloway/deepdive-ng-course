
##  Angular Core Deep Dive (Video Course)

This repository contains the code of the [Angular Core Deep Dive](https://angular-university.io/course/angular-course).

This course repository is updated to Angular 22:

![Angular Core Deep Dive](https://d3vigmphadbn9b.cloudfront.net/course-images/large-images/angular-core-deep-dive-new-2.jpg)

# Installation pre-requisites

IMPORTANT: This branch targets Angular 22, which requires Node 22.22.3+ (or newer supported Node 24/26 release). If your machine has a newer system Node version that is too old for Angular 22, switch to a compatible runtime before running the app.

If you are on Windows and need a quick workaround without changing your global install:

    npx -p node@22 npm start

If you use nvm-windows, the project also includes a .nvmrc file so you can do:

    nvm install 22.23.2
    nvm use 22.23.2
    npm install
    npm start

# Installing the Angular CLI

With the following command the angular-cli will be installed globally in your machine:

    npm install -g @angular/cli

Note: different branches/sections of this repo pin different Angular versions (this checkout uses Angular 22). Since `@angular/cli` is also listed as a local devDependency, you can skip the global install and instead run the CLI with `npx` so it always matches whichever branch you have checked out:

    npx ng serve
    npx ng generate component foo
    npx ng version

`npx` resolves the binary from this project's `node_modules/.bin` first, so it uses the exact CLI version installed for the current branch rather than whatever (if anything) is installed globally.

# i18n extraction in Angular 22

This branch is on Angular 22, and the old instructor syntax using `--i18n-locale` is no longer supported by the current CLI.

The working command is:

    npx -p node@22 ng extract-i18n --format xlf --out-file messages.fr.xlf

This generates a file for the French locale without using the removed `--i18n-locale` flag. The plain command without the extra arguments still works:

    npx -p node@22 ng extract-i18n

If you later want to build localized output, use the locale-aware build configuration or a configured `--localize` build rather than trying to pass `--i18n-locale` to `extract-i18n`.

# Node version auto-switching (.nvmrc)

This checkout includes a `.nvmrc` file pinning Node to the version required by this branch's Angular version. If you use [nvm](https://github.com/nvm-sh/nvm), running the following inside the project directory switches you to the right Node version automatically:

    nvm use

If you'd like this to happen automatically whenever you `cd` into the project, enable nvm's shell auto-use hook (see the nvm README's "Deeper Shell Integration" section) so it reads `.nvmrc` on directory change without needing to run `nvm use` manually.

# How To install this repository

We can install the master branch using the following commands:

    git clone https://github.com/angular-university/angular-course.git

This repository is made of several separate npm modules, that are installable separately. For example, to run the au-input module, we can do the following:

    cd angular-course
    npm install

Its also possible to install the modules as usual using npm:

    npm install

NPM 5 or above has the big advantage that if you use it you will be installing the exact same dependencies than I installed in my machine, so you wont run into issues caused by semantic versioning updates.

This should take a couple of minutes. If there are issues, please post the complete error message in the Questions section of the course.

# To Run the Development Backend Server

In order to be able to provide realistic examples, we will need in our playground a small REST API backend server. We can start the sample application backend with the following command:

    npm run server

This is a small Node REST API server.

# To run the Development UI Server

To run the frontend part of our code, we will use the Angular CLI:

    npm start

The application is visible at port 4200: [http://localhost:4200](http://localhost:4200)



# Important

This repository has multiple branches, have a look at the beginning of each section to see the name of the branch.

At certain points along the course, you will be asked to checkout other remote branches other than master. You can view all branches that you have available remotely using the following command:

    git branch -a

  The remote branches have their starting in origin, such as for example 1-navigation-and-containers.

We can checkout the remote branch and start tracking it with a local branch that has the same name, by using the following command:

      git checkout -b section-1 origin/1-navigation-and-containers

It's also possible to download a ZIP file for a given branch,  using the branch dropdown on this page on the top left, and then selecting the Clone or Download / Download as ZIP button.

# Other Courses
# Modern Angular With Signals

If you are looking for the [Modern Angular With Signals Course](https://angular-university.io/course/angular-signals-course), the repo with the full code can be found here:

![Modern Angular With Signals Course](https://d3vigmphadbn9b.cloudfront.net/course-images/large-images/angular-signals-course.jpg)


# RxJs In Practice Course

If you are looking for the [RxJs In Practice Course](https://angular-university.io/course/rxjs-course), the repo with the full code can be found here:

![RxJs In Practice Course](https://s3-us-west-1.amazonaws.com/angular-university/course-images/rxjs-in-practice-course.png)


# NgRx In Depth Course

If you are looking for the [NgRx In Depth Course](https://angular-university.io/course/angular-ngrx-course), the repo with the full code can be found here:

![NgRx In Depth Course](https://s3-us-west-1.amazonaws.com/angular-university/course-images/angular-ngrx-course.png)



# Angular PWA Course

If you are looking for the [Angular PWA Course](https://angular-university.io/course/angular-pwa-course), the repo with the full code can be found here:

![Angular PWA Course - Build the future of the Web Today](https://s3-us-west-1.amazonaws.com/angular-university/course-images/angular-pwa-course.png)

# Angular Security Masterclass

If you are looking for the [Angular Security Masterclass](https://angular-university.io/course/angular-security-course), the repo with the full code can be found here:

[Angular Security Masterclass](https://github.com/angular-university/angular-security-course).

![Angular Security Masterclass](https://s3-us-west-1.amazonaws.com/angular-university/course-images/security-cover-small-v2.png)

# Angular Advanced Library Laboratory Course

If you are looking for the Angular Advanced Course, the repo with the full code can be found here:

[Angular Advanced Library Laboratory Course: Build Your Own Library](https://angular-university.io/course/angular-advanced-course).

![Angular Advanced Library Laboratory Course: Build Your Own Library](https://angular-academy.s3.amazonaws.com/thumbnails/advanced_angular-small-v3.png)


## RxJs and Reactive Patterns Angular Architecture Course

If you are looking for the RxJs and Reactive Patterns Angular Architecture Course code, the repo with the full code can be found here:

[RxJs and Reactive Patterns Angular Architecture Course](https://angular-university.io/course/reactive-angular-architecture-course)

![RxJs and Reactive Patterns Angular Architecture Course](https://s3-us-west-1.amazonaws.com/angular-academy/blog/images/rxjs-reactive-patterns-small.png)



## Angular Ngrx Reactive Extensions Architecture Course

If you are looking for the Angular Ngrx Reactive Extensions Architecture Course code, the repo with the full code can be found here:

[Angular Ngrx Reactive Extensions Architecture Course](https://angular-university.io/course/angular2-ngrx)

[Github repo for this course](https://github.com/angular-university/ngrx-course)

![Angular Ngrx Course](https://angular-academy.s3.amazonaws.com/thumbnails/ngrx-angular.png)



## Angular 2 and Firebase - Build a Web Application Course

If you are looking for the Angular 2 and Firebase - Build a Web Application Course code, the repo with the full code can be found here:

[Angular 2 and Firebase - Build a Web Application](https://angular-university.io/course/build-an-application-with-angular2)

[Github repo for this course](https://github.com/angular-university/angular-firebase-app)

![Angular firebase course](https://angular-academy.s3.amazonaws.com/thumbnails/angular_app-firebase-small.jpg)


## Complete Typescript 2 Course - Build A REST API

If you are looking for the Complete Typescript 2 Course - Build a REST API, the repo with the full code can be found here:

[https://angular-university.io/course/typescript-2-tutorial](https://github.com/angular-university/complete-typescript-course)

[Github repo for this course](https://github.com/angular-university/complete-typescript-course)

![Complete Typescript Course](https://angular-academy.s3.amazonaws.com/thumbnails/typescript-2-small.png)

