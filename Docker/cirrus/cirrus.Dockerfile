FROM stratisplatform/stratisfullnode:Stratis.CirrusD-latest
RUN apt update && apt install unzip
RUN wget 'https://dev.azure.com/StratisProject/6030fd93-f66e-4e37-9e67-e99d76809ba7/_apis/build/builds/29776/artifacts?artifactName=Data%20Directory%20Archive&api-version=6.0&%24format=zip' -O /root/CirrusDataDir.zip && unzip /root/CirrusDataDir.zip -d /root/tmp && rm /root/CirrusDataDir.zip && mkdir -p /root/.stratisnode/cirrus/CirrusMain && unzip '/root/tmp/Data Directory Archive/DataDir.zip' -d /root/.stratisnode/cirrus/CirrusMain && rm '/root/tmp/Data Directory Archive/DataDir.zip'
WORKDIR /StratisFullNode/src/Stratis.CirrusD
ENTRYPOINT ["dotnet", "run", "-apiuri=http://0.0.0.0"]