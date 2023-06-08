# Available Services and Status

## JupyterHub
#### On-premise
***STATUS:*** *In Development*

**URL :** [https://jupyter.k8s.ucar.edu/](https://jupyter.k8s.ucar.edu/)


An on-premise JupyterHub is up and running, but is still in development. Authentication against github is being worked on currently but there is no authentication presently. The user space that is spun up has access to a shared NFS volume that is read-only as well as GLADE collections and campaign directories also mounted as read-only. The user notebook that is deployed is based on a custom Docker image that the CCPP team maintains. Documentation on how this was setup and deployed can be found on the [how-to](../how-to/k8sJH/customize-docker.md) page in this documentation.   

#### AWS instance supported by 2i2c
***STATUS:*** *In Testing*

**URL :** [https://ncar-cisl.2i2c.cloud/](https://ncar-cisl.2i2c.cloud/)

The JupyterHub instance setup and managed by 2i2c that runs on AWS is up and ready to use. Access to this JupyterHub is controlled via a GitHub team, specifically the NCAR organizations [2i2c-cloud-users](https://github.com/orgs/NCAR/teams/2i2c-cloud-users) team. 

## Virtualization
#### Kubernetes (k8s)
We have a kubernetes cluster that we can utilize to host containers. We can provide users a private namespace to deploy to. We can also provision full kubernetes clusters for users via Rancher. Users would be administrators of their own k8s clusters but would have more freedom to customize to their needs and requirements.  

#### Virtual Machines (VMs)
We can provide VMs to users as needed for tasks that aren't well suited for running in a container. 

## Storage
#### NFS
We can provide general shared storage in the form of an NFS volume. Access to these systems is restricted by IP address and mounting is limited to on-premise machines. NFS mounting across wide area networks is not recommended.  

#### Object Storage
Object Storage is available and our admins can create new buckets and assign user permissions for S3 interactions. 

## Network Services
Our systems will have routable IP addresses assigned and configured via DHCP. DNS records can also be added to provide full name resolution for systems provided. 