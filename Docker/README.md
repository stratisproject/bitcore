Docker file for bitcore-node

Modify DB_HOST to be the mongodb instance.
Port 3000 is exposed but this must be mapped to a port on the host when running the container.

For example:
Build container from the top level bitcore-strax folder with `docker build -t bitcore . -f Docker/Dockerfile`
Run container on port 4000 from the `Docker` folder with `docker run -it -e DB_HOST=... -e DB_PORT=... -v PATH_TO_LOCAL_CONFIG_FOLDER:/config -p 4000:3000 bitcore`

Docker-Compose file
Use this to start mongodb, bitcore-node and bitcore wallet service and connect them together.
From the Docker/ folder (this one), run `docker-compose build` to build the services, followed by `docker-compose up` to start them.
Use docker-compose in conjunction with docker context to deploy to azure container instances as described in https://docs.microsoft.com/en-us/azure/container-instances/tutorial-docker-compose.

Production - Azure file share in ACI containers
We mount an Azure file share volume for mongodb persistence in the ACI containers
Ref https://docs.docker.com/cloud/aci-integration/#using-azure-file-share-as-volumes-in-aci-containers

Build docker container for cirrus/strax: `docker build -t bitcorestrax.azurecr.io/cirrus-chain . -f cirrus.Dockerfile`

Deployment of docker compose on Azure container instances
- Add a context to docker with `docker context create aci [NAME] --region=[AZUREREGION]`
- Use the context with `docker context use [NAME]`
- Deploy the compose file with `docker compose -f [COMPOSEFILENAME] --project-name=[NAME] up`

Or use the Azure yml (recommended because it saves credentials):
- `az container create --resource-group Stratis_Public_BitCore_PROD --name cirrus-node --location westus --file cirrus.yml`