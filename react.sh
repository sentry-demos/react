# REACT_APP_PORT means port that the POST request is sent to

if [[ $1 == 'aspnet' ]]
    then REACT_APP_PORT=62920/Home npm run deploy;
fi

if [[ $1 == 'express' ]]
    then REACT_APP_PORT=3001 npm run deploy;
fi

if [[ $1 == 'flask' ]]
    then REACT_APP_PORT=5001 npm run deploy;
fi

if [[ $1 == 'laravel' ]]
    then REACT_APP_PORT=8000 npm run deploy;
fi

if [[ $1 == 'rails' ]]
    then REACT_APP_PORT=3001 npm run deploy;
fi

if [[ $1 == 'spring' ]]
    then REACT_APP_PORT=8080 npm run deploy;
fi
