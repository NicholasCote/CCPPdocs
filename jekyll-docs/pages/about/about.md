---
title: "NCAR | CISL Cloud Pilot"
banner-button-url: https://nicholascote.github.io/CCPPdocs/
banner-description: Learn more about the how and why driving this effort
banner-title: About the CISL Cloud Pilot
layout: frontpage
banner-button-text: Link to Technical Documentation
---

# <center> About this Project </center>
CISL is currently deploying a ***pilot*** on-premise prototype cloud environment for compute and storage.

2i2c has deployed a JupyterHub instance in AWS for NCARs use. 
We are utilizing this experience to leverage 2i2c knowledge for our own education. 

## <center> On-premise cloud </center>

An on-premise (on-prem) cloud consists of storage, compute, and networking resources hosted on fully redundant hardware installed in personal/organizational facilities available to users 
### <center> Kubernetes (k8s) </center>
We will utilize a k8s cluster to host JupyterHub. Dask will be installed to enable parallel computing. A JupyterHub Spawner will create single user environments with access to a shared and personal storage space. The Spawned user environments will come in different sizes with a GPU option. 

k8s can also be used to host containers or containerized virtual machines for individual use cases.

### <center> Storage </center>
#### <center> GLADE </center>
NFS will be utilized to provide at least RO only access to GLADE on the Spawned JupyterHub user environments.

#### <center> STRATUS </center>
S3 will be provided via CISLs object storage platform [STRATUS](https://arc.ucar.edu/knowledge_base/70549594). 

#### <center> Storage </center>
Data Storage for the 2i2c JupyterHub instance is provided by AWS Elastic File System ([EFS](https://aws.amazon.com/efs/))

## <center> Data Access </center>
[AWS S3 Open Data Registry](https://registry.opendata.aws/) utilizes AWS S3 API calls the same way as STRATUS. By utilizing S3 API calls we can make Data accessible in a familiar way on the Web and on-premise. 

## <center> Agile Program Management </center>
<p style="text-align:center; font-weight:bold;"><a href="https://jira.ucar.edu/secure/RapidBoard.jspa?rapidView=220&projectKey=CCPP">Kanban Board</a></p>

This project is implementing a hybrid Agile Project Management workflow. Waterfall techniques will be used for high level project management. Kanban will be used for day to day tasks and creating a continuous flow of value to users. 

## <center> 2i2c </center>
#### <center> JupyterHub </center>
<p style="text-align:center; font-weight:bold;"><a href="https://ncar-cisl.2i2c.cloud/hub/home">JupyterHub URL</a></p>
2i2c has deployed a JupyterHub instance in AWS. Access to this JupyterHub instance is provided by [GitHub Teams](https://github.com/orgs/NCAR/teams/2i2c-cloud-users). 
