# generator-ng-zhaimi
> [Yeoman](http://yeoman.io) generator  

This generator was forked from angular-fullstack's frontend part: [ng-component](https://github.com/DaftMonk/generator-ng-component)  
This generator follows the [ngbp Repo](https://github.com/ngbp/ngbp)
and [Angular Style Guide](https://github.com/johnpapa/angular-styleguide)  
This generator doesn't include a grunt or gulp server.

## Getting Started
### Yeoman Generators
Install `yo` and `generator-ng-zhaimi` from npm:

```
$ npm install -g yo generator-ng-zhaimi
```

Finally, initiate the generator:

```
$ yo ng-zhaimi
```

### Typical Workflow
#### Style1: Readable and Short Filename
##### Step1: Config

```
vi .yo-rc.json
...
"routeDirectory": "src/app/",
"directiveDirectory": "src/common/directives/",
"filterDirectory": "src/common/filters/",
"serviceDirectory": "src/common/services/",
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
├─┬ app/
│ └─┬ users/
│   ├─┬ login/
│   │ ├── _login.scss
│   │ ├── login.html
│   │ ├── login.js
│   │ ├── login.spec.js
│   │ └── route.js
│   ├─┬ register/
│   │ ├── _register.scss
│   │ ├── register.html
│   │ ├── register.js
│   │ ├── register.spec.js
│   │ └── route.js
│   ├── _users.scss
│   ├── users.html
│   ├── users.js
│   ├── users.spec.js
│   └── route.js
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
├─┬ app/
│ └─┬ orders/
│   ├─┬ item/
│   │ ├── _directive .scss
│   │ ├── directive .html
│   │ ├── directive .js
│   │ └── directive .spec.js
│   ├── _orders.scss
│   ├── orders.html
│   ├── orders.js
│   ├── orders.spec.js
│   ├── route.js
│   ├── service.spec.js
│   └── service.js
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
8. License
9. MIT
