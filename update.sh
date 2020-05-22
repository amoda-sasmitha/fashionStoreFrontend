rm -r /var/www/AF/build

npm run build

cp ./build/ /var/www/AF/build -r

chmod -R 777 /var/www/AF/build

service nginx restart

service nginx status
