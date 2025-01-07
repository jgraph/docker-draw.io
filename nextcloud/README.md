## Nextcloud with draw.io app and self-hosted draw.io

This docker-compose file will install Nextcloud, MariaDB, draw.io, and draw.io export server. All behind Nginx reverse proxy and secured with Let's Encrypt.
Then the `after-install.sh` script installs and configures draw.io app into Nextcloud.

The docker-compose file depends on https://blog.ssdnodes.com/blog/installing-nextcloud-docker/

## Requirements

* Two subdomain. One for Nextcloud and the other for draw.io. For example, `nextcloud.example.com` and `drawio.example.com`
* The latest version of Docker ([https://docs.docker.com/engine/installation/](https://docs.docker.com/engine/installation/))
* Docker compose ([https://docs.docker.com/compose/install/](https://docs.docker.com/compose/install/))

### Installation Steps

1. Create a directory to include Nextcloud. MariaDB, Nginx data.

    ```
    mxkdir nextcloud-drawio
    cd nextcloud-drawio
    ```
1. Download `docker-compose.yml` and `after-install.sh` files from this repository folder.

    ```
    wget https://raw.githubusercontent.com/jgraph/docker-drawio/master/nextcloud/docker-compose.yml
    wget https://raw.githubusercontent.com/jgraph/docker-drawio/master/nextcloud/after-install.sh
    chmod +x after-install.sh
    ```
1. Edit the docker-compose file to set the domains and LE email.
    * Replace `nextcloud.YOUR-DOMAIN` with your Nextcloud subdomain e.g, `nextcloud.example.com`
    * Replace `drawio.YOUR-DOMAIN` with your draw.io subdomain e.g, `drawio.example.com`
    * Replace `YOUR-EMAIL` with your email to be used by Let's Encrypt for notifications e.g, `user@example.com`
    * Optional: You can also change the Maria DB user information and root password.
1. Run the docker-compose file and wait for all containers to run (all show done status)

    ```
    docker-compose up -d
    ```
1. Now goto Nextcloud subdomain (e.g, `nextcloud.example.com`) and complete the setup
   * Select the admin username and password
   * Select `Storage & database` then select `MySQL/MariaDB`
   * For DB configurations, use the same info in the `docker-compose.yml` file. If you used the default values, then `Database user` is `nextcloud`, `Database password` is `mysql`, `Database name` is `nextcloud`, and most importantly change the host from `localhost` to `db` which is the name of the MariaDB service in the docker compose file.
1. Now, we should install draw.io Nextcloud app and set draw.io URL to point to the self-hosted draw.io we just started. This can be easily done by running the `after-install.sh` giving it the draw.io URL as first parameter. For example:

   ```
   ./after-install.sh https://drawio.example.com
   ```
1. You Nextcloud with draw.io is now ready. Test it by creating a new diagram and make sure draw.io is served from your domain instead of www.draw.io
