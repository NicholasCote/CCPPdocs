# Potential CCPP Features

## JupyterHub

### On-Prem
* [Authentication](https://z2jh.jupyter.org/en/stable/administrator/authentication.html)
    * [ACCESS](https://allocations.access-ci.org/)
* Auto mounts
* Spawner
* GLADE RO
* Kernels
* Customizations

### 2i2c
* Authentication
* Auto mounts
* GLADE RO (?)
* Kernels
* Customizations

[nbgitpuller](https://github.com/jupyterhub/nbgitpuller) (?)

## BinderHub
### Container Registry
* Only for repo2docker & images we need?
### Helm
* secrets.yml
* config.yml
* Helm Install Documentation
### Connect to JupyterHub
* config.yml
* Helm Upgrade Documentation
* Customizations

## Visualization
### Templates
* Containers
    * Ingress config
* VM’s
    * Terraform
    * Ansible
* Examples
    * https://visgallery.ucar.edu/
    * https://ncar.github.io/psif2020ar/
    * https://carbonplan.org/
    * webext.cgd.ucar.edu

## Data Access
### GLADE
* Read Only Access for ease of access to datasets
### Stratus
* Object Storage
* On-prem S3 target (?)
### API
* Research Data Archive
* Geoscience Data Exchange

## Logging/Metrics
### JupyterHub
* Number of interactions
    * username
    * action
### BinderHub
* Prometheus
* Launch Events
    * Whenever new repo is launched
### Data Access
* Specific sets
* Number of times queried
### Visualizations
* User
* Number of requests
* System requirements
* OS

## Documentation
* Implementation instructions
* Configurations (GitHub)
* SLAs
* Backups/DR policies
* User How-To

## Backups/DR
* Define policies
* Implement for each use case

## RFE’s
* Link/email for user enhancement request
* Jira ticket opened for team triage
* Priority assigned
* Due dates negotiated

## SLA’s 
* Based on Jira ticket priority?
* JupyterHub
    * Uptime
    * Backup policy
    * DR policy
    * Service Outage
        * P1
    * User issues
        * Priority 1-5
    * User RFE
        * Project is P5
        * Due date for P5
* BinderHub
    * Uptime
    * Backup policy
    * DR policy
    * Service Outage
        * P1
    * User issues
        * Priority 1-5
    * User RFE
        * Project is P5
        * Due date for P5
* Visualizations
    * Uptime
    * Backup policy
    * DR policy
    * Service Outage
        * P1 or not?
    * User issues
        * Priority 1-5
    * User RFE
        * Project is P5
        * Due date for P5
* Data Access
    * Inherit storage SLA
    * API
        * Uptime
        * RFE
        * User issues