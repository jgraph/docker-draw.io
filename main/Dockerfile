FROM openjdk:11-jdk-slim AS build

RUN apt-get update -y && \
# this solves some weird issue with openjdk-11-jdk-headless
# https://github.com/nextcloud/docker/issues/380
    mkdir -p /usr/share/man/man1 && \
    apt-get install -y \
        ant \
        git

RUN cd /tmp && \
    git clone --depth 1 https://github.com/jgraph/drawio.git && \
    cd /tmp/drawio/etc/build/ && \
    ant war

FROM tomcat:9.0.68-jre11

LABEL maintainer="JGraph Ltd"

RUN apt-get update -y && \
    apt-get install -y --no-install-recommends \
        certbot \
        curl \
        xmlstarlet \
        unzip && \
    apt-get autoremove -y --purge && \
    apt-get clean && \
    rm -r /var/lib/apt/lists/*

COPY --from=build /tmp/drawio/build/draw.war /tmp

# Extract draw.io war & Update server.xml to set Draw.io webapp to root
RUN mkdir -p $CATALINA_HOME/webapps/draw && \
    unzip /tmp/draw.war -d $CATALINA_HOME/webapps/draw && \
    rm -rf /tmp/draw.war /tmp/drawio && \
    cd $CATALINA_HOME && \
    xmlstarlet ed \
        -P -S -L \
        -i '/Server/Service/Engine/Host/Valve' -t 'elem' -n 'Context' \
        -i '/Server/Service/Engine/Host/Context' -t 'attr' -n 'path' -v '/' \
        -i '/Server/Service/Engine/Host/Context[@path="/"]' -t 'attr' -n 'docBase' -v 'draw' \
        -s '/Server/Service/Engine/Host/Context[@path="/"]' -t 'elem' -n 'WatchedResource' -v 'WEB-INF/web.xml' \
        conf/server.xml

# Copy docker-entrypoint
COPY docker-entrypoint.sh /
RUN chmod +x /docker-entrypoint.sh

WORKDIR $CATALINA_HOME

EXPOSE 8080 8443

ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["catalina.sh", "run"]
