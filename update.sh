rm -r /var/www/FA/build

npm run build

cp ./build/ /var/www/FA/build -r

chmod -R 777 /var/www/FA/build

service nginx restart

service nginx status
