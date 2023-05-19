# Setup GitHub actions to Build Docker image automatically

As part of having a continuous integration workflow GitHub actions is utilized to rebuild Docker images whenever new code is pushed to a specific directory.

In order to utilize GitHub actions a directory named ***.github*** needs to be created in the base directory of the repository.
The ***.github*** directory should also contain a directory named ***workflows*** in order to store and run the different [workflows](https://docs.github.com/en/actions/using-workflows/about-workflows) created.
The workflow itself is a [***yaml***](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions) file that defines the actions that [trigger](https://docs.github.com/en/actions/using-workflows/triggering-a-workflow) and execute what is required for the continuous integration application. 

## Example ***.github/workflows/build-push-basenb.yaml***

This example workflow utilizes a few different github actions to build a docker image and push it to a container registry. Each step is explained in detail via inline comments. 

```
# This workflow builds docker images and pushes them to a Docker Hub Repository
# This workflow is specific to the base-notebook directory and image
# Set the workflow name
name: Deploy base-notebook

# Define the trigger that starts the action
# For this workflow the trigger is on a push that changes anything in the configs/jupyter/base-notebook/ path
on:
  push:
    paths:
      - configs/jupyter/base-notebook/**

# Define the actions that are going to take place as part of this workflow    
jobs:
  # Name the job(s)
  deploy-docker-base-notebook:
    # Define where the job should run in this case it will be run on the latest ubuntu image
    runs-on: ubuntu-latest
    # Set the steps to take in order
    steps:
      # Step 1 is to checkout the github repo used to build the Dockerfile
      - name: Check out the repo
        uses: actions/checkout@v3
      # Step 2 is to login to docker hub so the image can be pushed
      - name: Login to Docker Hub
        uses: docker/login-action@v2
        # GitHub secrets are used to provide login information to docker hub
        with:
          username: ${{ secrets.DOCKERHUB_USERNAME }}
          password: ${{ secrets.DOCKERHUB_TOKEN  }}
      # Pull relevant metadata out of the docker image used
      # This can be expanded upon
      - name: Extract metadata for Docker
        id: meta
        uses: docker/metadata-action@v4
        with:
          images: ncote/cisl-cloud-base
      # Build and push the docker image
      - name: Build and push Docker image
        uses: docker/build-push-action@v4
        with:
          # Provide the current directory as build context 
          context: .
          # Specify where the Dockerfile is located in relation to the repo base path
          file: configs/jupyter/base-notebook/Dockerfile
          # Enable the push to docker hub
          push: true
          # Provide the tags to apply to the image, this example uses the latest image tag 
          tags: ncote/cisl-cloud-base:latest
          # Apply labels as defined in the Docker image metadata
          labels: ${{ steps.meta.outputs.labels }}
```