FROM stratisplatform/stratisfullnode:Stratis.StraxD-latest
ADD https://dev.azure.com/StratisProject/6030fd93-f66e-4e37-9e67-e99d76809ba7/_apis/build/builds/29767/artifacts?artifactName=Data%20Directory%20Archive&api-version=6.0&%24format=zip /root/StraxDataDir.zip

RUN apt update && apt install unzip
RUN unzip /root/StraxDataDir.zip -d /root/tmp
RUN mkdir -p /root/.stratisnode/strax/StraxMain
RUN unzip '/root/tmp/Data Directory Archive/DataDir.zip' -d /root/.stratisnode/strax/StraxMain   
WORKDIR /StratisFullNode/src/Stratis.StraxD
EXPOSE 17105 17104 17103
ENTRYPOINT ["dotnet", "run", "-apiuri=http://0.0.0.0"]