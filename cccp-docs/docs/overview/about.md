# About this Project
CISL is currently deploying a ***pilot*** on-premise prototype cloud environment for compute and storage.

2i2c is ***potentially*** going to deploy a JupyterHub instance in AWS for us as well. 
We would utilize this experience to leverage 2i2c knowledge for our own education. 

## On-premise cloud

An on-premise (on-prem) cloud consists of storage, compute, and networking resources hosted on fully redundant hardware installed in personal/organizational facilities available to users 
### Kubernetes (k8s)
We will utilize a k8s cluster to host JupyterHub. Dask will be installed to enable parallel computing. A JupyterHub Spawner will create single user environments with access to a shared and personal storage space. The Spawned user environments will come in different sizes with a GPU option. 

k8s can also be used to host containers or containerized virtual machines for individual use cases.

### Storage
#### GLADE
NFS will be utilized to provide at least RO only access to GLADE on the Spawned JupyterHub user environments.

#### STRATUS
S3 will be provided via CISLs object storage platform [STRATUS](https://arc.ucar.edu/knowledge_base/70549594). 

## 2i2c
#### JupyterHub
2i2c will ***potentially*** deploy a JupyterHub instance in AWS. Access to this JupyterHub instance will be provided by GitHub Teams. 

#### Storage
Data Storage for the 2i2c JupyterHub instance is provided by AWS Elastic File System ([EFS](https://aws.amazon.com/efs/))

## Data Access
[AWS S3 Open Data Registry](https://registry.opendata.aws/) utilizes AWS S3 API calls the same way as STRATUS. By utilizing S3 API calls we can make Data accessible in a familiar way on the Web and on-premise. 

## Agile Program Management
**[Kanban Board](https://jira.ucar.edu/secure/RapidBoard.jspa?rapidView=220&projectKey=CCPP)**

This project is implementing a hybrid Agile Project Management workflow. Waterfall techniques will be used for high level project management. Kanban will be used for day to day tasks and creating a continuous flow of value to users. 