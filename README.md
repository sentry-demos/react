# sentry-demos/react

## Versions Summary:

| dependency      | version           
| ------------- |:-------------:| 
| node      | 14.2.0  |
| sentry-cli   | 1.53.0    |
| macOS | Catalina 10.15.3      |
| docker   | 19.03.8     |

## Goal/Summary:
Show how Sentry works
- Import/Integrate
- Configuration
- Releases/SourceMaps/Commits
- Session + Transcation Tracing (correlate errors across FE, BE, etc.)

## Running App
1. Use the nvmrc file to set a compatible node version.
```
nvm use
```

2. Install dependencies
```
npm install
```

3. Copy `.env_example` to `.env` and set `REACT_APP_SENTRY_DSN`