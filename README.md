# Installation instruction

- Settign up cloud machine
apt install docker-compose docker.io
usermod -G docker ubuntu
apt install supervisord

- clone this repo in home of the cloud machine (default user)

git clone https://github.com/luipir/GaliciaSustentable_deployment.git

- Install supervisor.d configuration
sudo cp ~/spuervisor.d/galicia_sustentable.conf /etc/supervisor/conf.d/

- start first time and mail it alive forever :)
service supervisord restart

