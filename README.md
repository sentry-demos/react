# sentry-demos/react

## Summary:
Show how Sentry works
- Import/Integrate
- Configuration
- Releases/SourceMaps/Commits
- Session + Transcation Tracing (correlate errors across FE, BE, etc.)

## First-time Setup
1. Use the nvmrc file to set a compatible node version.
```
nvm use
```

2. Install dependencies
```
npm install
```

3. Configure Sentry with your `PUBLIC_DSN_KEY` in index.html
4. Remember to include your `SENTRY_AUTH_TOKEN`; you'll need to generate one
first from your Sentry server. After doing so, a cheap and easy way to use the
token would be this: `export SENTRY_AUTH_TOKEN=1010101011010101`
5. Make sure that your Github repo is integrated into your Sentry organization.
6. Enter your Sentry organization slug in the `SENTRY_ORG` line of your Makefile,
then add the name of `SENTRY_PROJECT`

## Run
```
$ npm run deploy
```
1. Go to http://localhost:5000 in your browser and begin throwing errors/events to Sentry!

![Alt Text](configure-launch-react-demo.gif)

## Changelog
05/24/19 - removed `scope.setTag("transaction_id", txId)` because `bundle.min.js`, `tracing.min.js` enable the `new Tracing()` feature  
npm module `new Tracing()`  
cdn `new Sentry.Integrations.Tracing({ tracingOrigins: ['localhost', /^\//] } )`

## Tracing
05/24/19 the following GIF is now outdated as tracing.min.js replaces all the setup shown in the GIF.
![Alt Text](configure-tracing-errors.gif)