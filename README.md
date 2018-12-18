# sentry-demos/react

## Goal/Summary:
Show how Sentry works
- Import/Integrate
- Configuration
- Releases/SourceMaps

## First-time Setup
1. Install dependencies
```
npm install
```

2. Configure Sentry with your `PUBLIC_DSN_KEY` in index.html
3. Remember to include your `SENTRY_AUTH_TOKEN`; you'll need to generate one
first from your Sentry server. After doing so, a cheap and easy way to use the
token would be this: `export SENTRY_AUTH_TOKEN=1010101011010101`
4. Make sure that your Github repo is integrated into your Sentry organization.
5. Enter your Sentry organization slug in the `SENTRY_ORG` line of your Makefile,
then add the name of `SENTRY_PROJECT`

```
$ npm run deploy
```
6. Go to http://localhost:5000 in your browser and begin throwing errors/events to Sentry!

![Alt Text](configure-launch-react-demo.gif)
