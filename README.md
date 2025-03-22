# Unified Observability Stack

A comprehensive monitoring and logging system that integrates Prometheus, Alertmanager, Grafana, Loki, and Promtail to provide real-time insights into your server’s performance, resource utilization, and overall health.

> This project is created as part of the [Prometheus and Grafana](https://roadmap.sh/projects/monitoring) project.

## Overview

This project sets up a full observability stack:

- **Exporters**:  
  Collects and exports system metrics along with metrics from additional services like Nginx, MongoDB, and application-specific metrics.
- **Prometheus**:  
  Scrapes metrics from various endpoints, evaluates alert rules, and retains data for analysis.
- **Alertmanager**:  
  Routes alerts (e.g., default or critical email notifications) based on static policies.
- **Grafana**:  
  Visualizes metrics and logs using pre-provisioned dashboards and data sources.
- **Loki**:  
  Aggregates logs from Promtail and allows querying with LogQL.
- **Promtail**:  
  Dynamically collects logs from Docker containers and forwards them to Loki.

## Architecture

- **Prometheus**  
  - **Data Collection:** Scrapes metrics from a range of exporters, including system-level metrics and service-specific ones (e.g., Nginx, MongoDB, and a custom Node API exporter).  
  - **Alerting & Recording:** Applies alerting rules and recording rules to optimize query performance and ensure that critical thresholds trigger timely notifications.  
  - **Data Retention:** Maintains historical metric data for up to 30 days, enabling both real-time monitoring and trend analysis.

- **Alertmanager**  
  - **Alert Routing:** Receives alerts from Prometheus and routes them to designated receivers via email based on predefined static policies.

- **Promtail**  
  - **Log Collection:** Uses dynamic service discovery (i.e docker_sd_configs) to automatically collect logs from containers.
  - **Log Forwarding:** Streams logs directly to Loki for centralized processing and indexing.

- **Loki**  
  - **Log Storage & Indexing:** Serves as the centralized log aggregation system by storing and indexing logs forwarded by Promtail.  

- **Grafana**  
  - **Data Integration:** Integrates with Prometheus and Loki data sources.
  - **Visualization:** Offers Interactive and pre-configured dashboards for real-time monitoring and historical data analysis.


## Project Setup

This project is built upon my previous [multi-container-application](https://github.com/vikashraj1/multi-container-application.git) project and now includes enhanced observability features. The overall setup remains largely the same.

---

### Prerequisites

- **Memory:** At least 4GB free RAM
- **Tools:** [Vagrant](https://www.vagrantup.com/) (with a supported provider such as VirtualBox) and Git installed

---

### Prepare the Infrastructure Directory

1. **Create and navigate to your project directory:**

   ```bash
   mkdir todoapi-project
   cd todoapi-project
   ```

2. **Download the Vagrantfile:**

   ```bash
   curl -kO https://raw.githubusercontent.com/vikashraj1/prometheus-and-grafana/refs/heads/main/Infra/vagrant/Vagrantfile
   ```

3. **Avoid line-ending issues on Windows:**

   ```bash
   git config core.autocrlf false
   ```

4. **Create a shared folder and clone the project repository:**

   ```bash
   mkdir shared
   git clone https://github.com/vikashraj1/prometheus-and-grafana.git shared
   ```

---

### Start the Vagrant Environment

Bring up and SSH into the Ansible VM:

```bash
vagrant up && vagrant ssh ansible
```

---

### Deploy the Application with Ansible

1. **Switch to the root user and navigate to the Ansible code directory:**

   ```bash
   sudo su -
   cd /root/shared/ansible_code
   ```

2. **Export your SMTP credentials (example for MS Outlook):**

   ```bash
   export SMTP_HOST='smtp-mail.outlook.com:587'
   export SMTP_USER='your_email_address'
   export SMTP_PASSWORD='your_password'
   ```

3. **Run the Ansible playbook:**

   ```bash
   ansible-playbook -i inventory playbook.yml
   ```

---

### Verify the Setup

After deployment, verify that the services are running by accessing them via your browser:

- **Prometheus:** [http://192.168.50.20:9090](http://192.168.50.20:9090)
- **Grafana:** [http://192.168.50.20:3001](http://192.168.50.20:3001)