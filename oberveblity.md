robust observability stack

```
export \
SMTP_HOST='smtp_server_name:port' \
SMTP_USER='smtp_user' \
SMTP_PASSWORD='smtp_password'
```


alertmanager
    notify policy
    > static defined recivers
        default-receiver
        critical-email
grafana
    provisioning
        dashboards
        > visualise metrics
        datasources
        > provisioned to make it static
            prom
            am
            loki
loki
    base setup
        > now logs collected from promtail can be aggregated and analysed
prometheus
    dc
        30d retention
            > so it saves storage
    scrape_configs
    > collects metrics from all exporters. store and analyse
        prometheus
        nodeapi
            > custum exporter and intstrumentation
        mongo-prom-exporter
        nginx-prometheus-exporter
        prometheus-node-exporter
        alertmanager
        grafana
        loki
        promtail
    alert rules
    > seding alerts through alertmanager
        common_alerts
            using common_recordings
    recording rules
    > pre calculating to make it fast and efficient
        common_recordings
promtail
    send to loki
        > it has to
    docker_sd_configs
        > detects all containers and scrapes the runtime logs - maybe docker logs containername


