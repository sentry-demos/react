# Example usage invocations
# ./demo.sh flask
# ./demo.sh rails
# ./demo.sh .net

if [[ $1 == 'flask' ]]
    then API_PORT=5001 npm run deploy;
fi

if [[ $1 == 'aspnet' ]]
    then API_PORT=62920/Home npm run deploy;
fi

if [[ $1 == 'spring' ]]
    then API_PORT=8080 npm run deploy;
fi

if [[ $1 == 'express' ]]
    then API_PORT=3001 npm run deploy;
fi

if [[ $1 == 'laravel' ]]
    then API_PORT=8000 npm run deploy;
fi

if [[ $1 == 'rails' ]]
    then API_PORT=3001 npm run deploy;
fi

# TODO - it also (tmux?) runs the back-end, via right command, from right directory.
# TODO - else 'unknown', double-check your spelling in demo.sh
echo 'done';