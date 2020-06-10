# Installation instruction

## Settign up cloud machine
- apt install docker-compose docker.io

- usermod -G docker ubuntu

- apt install supervisor

## clone this repo in home of the cloud machine (default user)
- git clone https://github.com/luipir/GaliciaSustentable_deployment.git

## Install supervisor.d configuration
- sudo cp ~/GaliciaSustentable_deployment/supervisor.d/galicia_sustentable.conf /etc/supervisor/conf.d/

## Start first time and mail it alive forever :)
- service supervisord restart

