# Example usage invocations
# ./demo.sh flask
# ./demo.sh express

# REACT_APP_PORT means back-end Port, not the port that React is runnong on

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

# TODO - it also (tmux?) runs the back-end, via right command, from right directory.
# TODO - else 'unknown', double-check your spelling in demo.sh