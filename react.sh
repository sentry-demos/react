# `react.sh` allows you to connect the React App to any back-end `/checkout` endpoint
#  Example usage:
# ./react.sh express

if [[ $1 == 'aspnet' ]] # SENTRY_RELEASE=`sentry-cli releases propose-version` pwsh deploy.ps1
    then REACT_APP_PORT=5001 npm run deploy;
fi

if [[ $1 == 'express' ]] # npm run deploy
    then REACT_APP_PORT=3001 npm run deploy;
fi

if [[ $1 == 'flask' ]] # make deploy
    then REACT_APP_PORT=5001 npm run deploy;
fi

if [[ $1 == 'laravel' ]] # make
    then REACT_APP_PORT=8000 npm run deploy;
fi

if [[ $1 == 'rails' ]] # make deploy
    then REACT_APP_PORT=3001 npm run deploy;
fi

if [[ $1 == 'spring' ]] # make
    then REACT_APP_PORT=8080 npm run deploy;
fi
