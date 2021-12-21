# Docker files for bitcore-node and bitcore-wallet-service
These files contain dockerfiles for creating containers and docker-compose files for basic orchestration.

## Docker containers

### Nodes
Build docker container for cirrus/strax node: `docker build -t bitcorestrax.azurecr.io/cirrus-chain . -f cirrus.Dockerfile`

### BWS
Build bws: `docker build -t bitcorestrax.azurecr.io/bws . -f Docker/bws.Dockerfile`
Push bws: `docker push bitcorestrax.azurecr.io/bws`
Build and push bws: `docker context use default && docker build -t bitcorestrax.azurecr.io/bws . -f Docker/bws.Dockerfile && docker push bitcorestrax.azurecr.io/bws`

### Bitcore
Build bitcore: `docker build -t bitcorestrax.azurecr.io/bitcore-node . -f Docker/bitcore.Dockerfile`
Push bitcore: `docker push bitcorestrax.azurecr.io/bitcore-node`
Build and push bitcore: `docker context use default && docker build -t bitcorestrax.azurecr.io/bitcore-node . -f Docker/bitcore.Dockerfile && docker push bitcorestrax.azurecr.io/bitcore-node`

## Docker-Compose files
From the Docker/ folder (this one), run `docker-compose build` to build the services, followed by `docker-compose up` to start them.

Assumes config files with the database settings etc. are mounted in the container at `/config`.

* testnet.docker-compose.yml - A full mongodb, bitcore-node and bitcore-wallet-service deployment.
* prod.docker-compose.yml - Contains bitcore-node and bitcore-wallet-service containers, assumes DB is external.
* sync*.docker-compose.yml - Contains only bitcore-node, used just to sync the chains to a DB.

### Deployment using docker compose on a docker host using SSH
- Make sure the host has docker engine installed: https://docs.docker.com/engine/install/ubuntu/
- Configure an SSH key on the host, password access will not work
- Add a context to docker with `docker context create [NAME] --docker "host=ssh://[USER]@[IP]"`
- Use the context with `docker context use [NAME]`
- Deploy the compose with `docker-compose -f testnet.docker-compose.yml up -d`
- Follow the logs: `docker-compose -f testnet.docker-compose.yml logs --follow`

To update already deployed containers: `docker context use bitcoretestnet && docker pull bitcorestrax.azurecr.io/bws && docker pull bitcorestrax.azurecr.io/bitcore-node && docker-compose -f testnet.docker-compose.yml up -d`