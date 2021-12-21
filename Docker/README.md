* Docker files for bitcore-node and bitcore-wallet-service *

Docker-Compose files
Use this to start mongodb, bitcore-node and bitcore wallet service and connect them together.
From the Docker/ folder (this one), run `docker-compose build` to build the services, followed by `docker-compose up` to start them.
Use docker-compose in conjunction with docker context to deploy to azure container instances as described in https://docs.microsoft.com/en-us/azure/container-instances/tutorial-docker-compose.

Production - Azure file share in ACI containers
We mount an Azure file share volume for mongodb persistence in the ACI containers
Ref https://docs.docker.com/cloud/aci-integration/#using-azure-file-share-as-volumes-in-aci-containers

Build docker container for cirrus/strax: `docker build -t bitcorestrax.azurecr.io/cirrus-chain . -f cirrus.Dockerfile`

Build bws: `docker build -t bitcorestrax.azurecr.io/bws . -f Docker/bws.Dockerfile`
Push bws: `docker push bitcorestrax.azurecr.io/bws`
Everything: `docker context use default && docker build -t bitcorestrax.azurecr.io/bws . -f Docker/bws.Dockerfile && docker push bitcorestrax.azurecr.io/bws`

Build bitcore: `docker build -t bitcorestrax.azurecr.io/bitcore-node . -f Docker/bitcore.Dockerfile`
Push bitcore: `docker push bitcorestrax.azurecr.io/bitcore-node`
Everything: `docker context use default && docker build -t bitcorestrax.azurecr.io/bitcore-node . -f Docker/bitcore.Dockerfile && docker push bitcorestrax.azurecr.io/bitcore-node`


Deployment of docker compose on a docker host using SSH:
- Configure an SSH key on the host, password access will not work
- Add a context to docker with `docker context create [NAME] --docker "host=ssh://root@[IP]"`
- Use the context with `docker context use [NAME]`
- Deploy the compose with `docker-compose -f testnet.docker-compose.yml up -d`
- Follow the logs: `docker-compose -f testnet.docker-compose.yml logs --follow`

To update containers:
Just re-run `docker context use bitcoretestnet && docker pull bitcorestrax.azurecr.io/bws && docker pull bitcorestrax.azurecr.io/bitcore-node && docker-compose -f testnet.docker-compose.yml up -d`

Deployment of docker compose on Azure container instances
- Add a context to docker with `docker context create aci [NAME] --location=[AZUREREGION]`
- Use the context with `docker context use [NAME]`
- Deploy the compose file with `docker compose -f [COMPOSEFILENAME] --project-name=[NAME] up`

Or use the Azure yml (recommended because it saves credentials):
- `az container create --resource-group Stratis_Public_BitCore_PROD --name cirrus-node --location westus --file cirrus.yml`