# `react.sh` allows you to connect the React App to any back-end `/checkout` endpoint
#  Example usage:
# ./react.sh express

if [[ $1 == 'aspnet' ]]
    then REACT_APP_PORT=5001 npm run deploy;
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
