# generator-ng-zhaimi
> [Yeoman](http://yeoman.io) generator  

- Forked from [angular-fullstack](https://github.com/DaftMonk/generator-angular-fullstack)'s frontend part: [ng-component](https://github.com/DaftMonk/generator-ng-component)
- Follows the [ngbp Repo](https://github.com/ngbp/ngbp) and [Angular Style Guide](https://github.com/johnpapa/angular-styleguide)
- [ComposeWith](http://yeoman.io/authoring/composability.html) [gulp-angular](https://github.com/Swiip/generator-gulp-angular)'s app part
- Contains [pre-commit](http://pre-commit.com/), [scss-lint](https://github.com/brigade/scss-lint), [jscs](https://github.com/jscs-dev/node-jscs), [eslint](https://github.com/eslint/eslint) and two scripts to [do release](app/templates/do-release) and [deploy](app/templates/deploy.sh)
- Supports [migrating](#migrate) from [generator-angular](https://github.com/yeoman/generator-angular)
- Supports extensions: [scss, js, html], for now, so ignore options about style, javascript and html in promptings.
- Welcome everyone to contribute.

## Getting Started
### Install
#### Install required tools `yo`, `gulp` and `bower`:

```
npm install -g yo gulp bower
```

#### Install `generator-ng-zhaimi`:
##### From npm:

```
npm install -g generator-ng-zhaimi
```

##### Or from repos, which will be the latest version

```
git clone git@github.com:stupidisum/generator-ng-zhaimi.git
// or zhaimi private repo
cd generator-ng-zhaimi
npm install
sudo npm link
```

### Initialize:app
#### Create a new directory, and go into:

```
mkdir my-new-project && cd $_
```

#### Run `yo gulp-angular`, and select desired technologies:

```
yo ng-zhaimi
```

### Sub-generators
- ng-zhaimi:route(use 'routeA.routeB' to represent subRoute)
- ng-zhaimi:controller
- ng-zhaimi:factory
- ng-zhaimi:directive
- ng-zhaimi:filter
- ng-zhaimi:service
- ng-zhaimi:provider
- ng-zhaimi:decorator

### Documentation
#### Main-generator
[Generator-gulp-angular](https://github.com/Swiip/generator-gulp-angular)
- [docs/README](https://github.com/Swiip/generator-gulp-angular/blob/master/docs/README.md)
- More informations about how to use your new project is available in the [docs/user-guide](https://github.com/Swiip/generator-gulp-angular/blob/master/docs/user-guide.md)
- If you want to know: [docs/how-it-works](https://github.com/Swiip/generator-gulp-angular/blob/master/docs/how-it-works.md).

#### Sub-generators
[Generator-angular-fullstack](https://github.com/Swiip/generator-gulp-angular)

#### Migrate
Migrate your project generated by generator-angular
- Copy your code in **old-project** into **new-project**

```
cd old-project
cp -r app new-project/src
cp -r test new-project
cp package.json bower.json new-project
cd new-project
mv src/app/robots.txt src/app/favicon.ico src
```

- Merge your **`index.*`** into new **`index.*`**. Remember to remain inject comments.

  Typical files:
  - `src/app/index.hmtl` -> `src/index.html`  

    Remember to delete script-includes injected by generator-angular, because gulp will inject them into this block when building:

    ```html
    <!-- build:js({.tmp/serve,.tmp/partials,src}) scripts/app.js -->
    <!-- inject:js -->
    <!-- js files will be automatically insert here -->
    <!-- endinject -->
    ```

  - `src/app/styles/main.scss` -> `src/app/index.scss`

    recommend remianing main.scss. Let gulp to inject, so that you can control **inject order** in **gulp/inject.js** like this:

    ```js
    var injectFiles = gulp.src([
      path.join(conf.paths.src, '/app/**/*.scss'),
      path.join('!' + conf.paths.src, '/app/index.scss'),
      path.join(conf.paths.src, '/app/styles/animate.scss'),
      path.join(conf.paths.src, '/app/styles/style.scss'),
    ], {read: false});
    ```

  - `src/app/scripts/app.js` -> `src/app/index.*.js`  

    split app.js into module.js, run.js, route.js, config.js, ...

- Add prefix `app/` for all assets' urls in files, including
  - route
  - directive
  - controller(openModal)
  - html(img, ng-include)
  - scss

- Config server in **gulp/server**, **uncomment** server.middleware first.

  ```js
    server.middleware = proxyMiddleware(
      '/franky/api/',
      {
        target: 'http://franky.test.zhai.me',
        proxyHost: 'franky.test.zhai.me',
      }
    );

    browserSync.instance = browserSync.init({
         startPath: '/',
      server: server,
      browser: browser,
      port: 9100,
      ui: {
        port: 9180,
        weinre: {
          port: 9190,
        },
      },
    });
  ```

- Test the result with `gulp serve`, `gulp serve:dist` and `gulp build`  

    You can test gulp build results with nginx proxy.

    `cp -r dist /usr/local/Cellar/nginx/1.x.x/`

- [Pre-commit](#pre-commit) with `pre-commit` and `pre-commit run [hookId]`  

    **Your code certainly can't pass our pre-commit.**
  - Best choice: Fix them.
  - Good choices:
    - add comments to set envs or disable some rules  

      ```js
      /*eslint-env node */

      // scss-lint:disable Comment
      ...
      // scss-lint:enable Comment
      ```

    - change errors to warnings in .eslintrc  

      ```json
      "rules": {
        "comma-dangle": [1, "always-multiline"],
        "angular/controller-name": [1, "/[A-Z].*Ctrl$/"],
        "no-unused-vars": 1
      }
      ```

  - Bad choices:
    - add ignores or excludes
    - skip hooks `SKIP=eslint pre-commit`, `SKIP=eslint git commit ...`

#### Pre-commit
- [pre-commit](http://pre-commit.com/)
- [scss-lint](https://github.com/brigade/scss-lint)
- [jscs](https://github.com/jscs-dev/node-jscs)
- [eslint](https://github.com/eslint/eslint)

### Typical Workflow (kind of out-dated, but maybe have some reference significance)
#### Style1: Readable and Short Filename
##### Step1: Config

```
vi .yo-rc.json
...
"routeDirectory": "src/app/",
"directiveDirectory": "src/app/common/directives/",
"filterDirectory": "src/app/common/filters/",
"serviceDirectory": "src/app/common/services/",
...
"fileNamePrompt": true,
"defaultFileName": ""
...
```

##### Step2: Users

```
// enter all the way
yo ng-zhaimi:route users
yo ng-zhaimi:route users.login
yo ng-zhaimi:route users.register
yo ng-zhaimi:factory users
```

And you will get this structure:

```
src
└─┬ app/
  ├─┬ users/
  │ ├─┬ login/
  │ │ ├── _login.scss
  │ │ ├── login.html
  │ │ ├── login.js
  │ │ ├── login.spec.js
  │ │ └── route.js
  │ ├─┬ register/
  │ │ ├── _register.scss
  │ │ ├── register.html
  │ │ ├── register.js
  │ │ ├── register.spec.js
  │ │ └── route.js
  │ ├── _users.scss
  │ ├── users.html
  │ ├── users.js
  │ ├── users.spec.js
  │ └── route.js
  └─┬ common/
    └─┬ services/
      └─┬ users/
        ├── factory.js
        └── factory.spec.js
```

##### Step3: Orders

assume     | common | private
---------- | ------ | ----------
serives    | users  | orders
directives | order  | order-item

```
// enter all the way
yo ng-zhaimi:route orders
yo ng-zhaimi:directive order
yo ng-zhaimi:service orders
? Where would you like to create this service? (common/services/orders) app/orders
yo ng-zhaimi:directive order-item
? Where would you like to create this directive? (common/directives/order_item) app/orders/item
? What file name would you like to use? (order_item) item
```

And you will get this structure:

```
src
└─┬ app/
  ├─┬ orders/
  │ ├─┬ item/
  │ │ ├── _directive .scss
  │ │ ├── directive .html
  │ │ ├── directive .js
  │ │ └── directive .spec.js
  │ ├── _orders.scss
  │ ├── orders.html
  │ ├── orders.js
  │ ├── orders.spec.js
  │ ├── route.js
  │ ├── service.spec.js
  │ └── service.js
  └─┬ common/
    └─┬ directives/
      └─┬ order/
        ├── _directive .scss
        ├── directive .html
        ├── directive .js
        └── directive .spec.js
```

#### Style2: index-style names
##### Step1: Config
Same as Style1, but

```
...
"defaultFileName": "index"
...
```

##### Step2: Users
Same as Style1, but you will get

```
...
    ├─┬ login/
    │ ├── _index.scss
    │ ├── index.html
    │ ├── index.js
    │ ├── index.spec.js
    │ └── route.js
    ├─┬ register/
    │ ├── _index.scss
    │ ├── index.html
    │ ├── index.js
    │ ├── index.spec.js
    │ └── route.js
    ├── _index.scss
    ├── index.html
    ├── index.js
    ├── index.spec.js
    └── route.js
...
    └─┬ services/
      └─┬ users/
        ├── factory.js
        └── factory.spec.js
...
```

##### Step3: Orders
Same as Style1, and you should know the answer.

## Template Properties
1. `lodash`: reference to lodash
2. `appname`: the app name specified by `bower.json` or the project's directory name
3. `scriptAppName`: the angular app name, `appname + 'App'`
4. `cameledName`: the cameled name argument that is passed to the (sub)generator
5. `classedName`: the classed name argument that is passed to the (sub)generator
6. `dashedName`: the dashed name argument that is passed to the (sub)generator
7. `underscoredName`: the underscored name argument that is passed to the (sub)generator  

## License
 MIT
