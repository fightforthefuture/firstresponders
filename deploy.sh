#!/bin/bash
npm run generate
rsync -avh dist/ 37i:~/www/firstresponders.37i.net --delete
