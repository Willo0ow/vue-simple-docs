# vue-simple-docs

This project is a Vue.js documentation generator.

## Usage

### Config

In .docsrc.json file you can specify the input and output directory.  
Example is in .docsrc.example.json - these settings are the default ones.  
If you don't provide the config file, they will be used to find sourceDir and outputDir.

```
{
  "sourceDir": "template/src/components",
  "outputDir": "docs"
}
```

### Generate docs app

`npm run generate`

Use it only when generating documentation for the first time.  
It will create vue app in the outputDir and generate data based on the doc tags in your project.

### Generate only documentation data

`npm run generate:data`

It generates files in the outputDir/src/generated with data based on sourceDir doc tags.  
Use it any time you added some doc tags and want to update your documentation with them.

## Development instructions

If you want to contribute to this project:

### Install project's dependencies

`npm install`

### Build node scripts

`npm run build`

### Build node scripts with watching for changes

`npm run dev`

### If you want to work on the docs template Vue.js app, set the docs configuration in .docsrc as follows:

```
{
  "sourceDir": "template/src/components",
  "outputDir": "template"
}
```

Note that if you set `"outputDir": "template"`, do not run `npm run generate` because it will try to copy the Vue.js app in the template folder into the template folder (`outputDir`). Instead, run only `npm run generate:data`. This will generate documentation data in the `template/src/generated` folder.

After generating the documentation data, navigate to the template folder (`cd template`), and run `npm install` followed by `npm run dev` to work on the template.
