# eslint-plugin-img-src

img src no http but https

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-img-src`:

```
$ npm install eslint-plugin-img-src --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-img-src` globally.

## Usage

Add `img-src` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "img-src"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "img-src/rule-name": 2
    }
}
```

## Supported Rules

* Fill in provided rules here





