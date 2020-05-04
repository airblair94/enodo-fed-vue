# enodo-fed

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Assumptions
- All VARCHAR/String data and dates are categorical
- Estimated market value scale is redone after every filter and that is ok for user.
- User would want to submit all filters instead of grid trying to update on every keypress
- It is ok to leave null as an option in categorical filters (normally I would talk with product/design as to how these are best represented)

## Questions
- What mapping libraries are commonly used for vue?
- What is the the common way to create your own marker?
- Is there normally a store along with vue or did I pass data upwards and downwards in the app properly?

## Future States
- Add toast functionality whenever filters are updated or submitted
- Click window to show properties of each property
- Remove hardcoded links in CI pipeline
- Keep track of when new filters need to be applied (prob change button colors from gray to green when filters have been updated)
- Get a better understanding of what is categorical vs what is numerical data so filters can be more useful
- Get nice display names for filters so I don't show the property names.