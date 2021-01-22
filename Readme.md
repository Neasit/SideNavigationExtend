# Extend SideNavigation to allow Multi Levels

This example is based on [blog](https://blogs.sap.com/2017/09/28/extend-sidenavigation-to-allow-multi-levels-in-sapui5-a-step-by-step-tutorial-part-1/) with adaptation for SAPUI5 version 1.71

# How to setup

1. Install Node.js (https://nodejs.org/en/download/package-manager)
2. Install grunt `npm install -g grunt-cli`
3. Install ui5-cli `npm install -g @ui5/cli`
4. Install packages (based on package.json) - `npm install`

# How to test

There is predefinded grunt task - 'server'.
>command line: grunt server

**Note**: SAPUI5 resources have to be downloaded to local machine (default path is `C:/SAPUI5/1.71.5/resources`, see `ui5.yaml`)

**Note**: local server is based on UI5-Tooling and can be started using command - 'ui5 serve'

Server will be started at:
>localhost:3070/3071 (3070 - by default, can be changed in 'ui5.yaml')

# How to build

There is predefined grunt task - 'default' in root directory of application
Build is based on UI5-Tooling and also can be started using command - 'ui5 build'

**Note**: babel task is turned on by default - can be deactivated in ui5.yaml (`delete 'ui5-task-transpile'`)


# How to deploy

There is predefined task deploy - will deploy the library without changing the version of lib;

**Note**: the user-defined (like user name, password, system, WB and etc) parameters will be filled
from ".env" file

# How to manage version

The version in manifest.json is updated during build task from package.json

**Note**: version in package.json have to be managed manually using 'npm version'

# How to format soruce code

There is predefined ESLint rules to validate and format soruce code.

>Predefined set of rules (see .eslintrc): airbnb-base

Also is available tools to format js and xml files automatically

>prettier - to js files (see config prettier.config.js)

>jsbeautify - to xml files (see config .jsbeautifyrc)

There are predefined scripts (see package.json) for format all files:

>npm run prettier-js

>npm run pretty-xml

**Note**: also single file can be added to scripts (just put it as parameter)