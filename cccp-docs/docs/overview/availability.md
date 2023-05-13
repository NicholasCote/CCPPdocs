# Available Services and Status

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