# How to build this documentation

## Locally with mkdocs serve

#### 1.  Make sure you have MkDocs installed
    pip install mkdocs
#### 2.  Clone the git repository
    git clone https://github.com/NCAR/cisl-cloud.git
#### 3.  Change in to docs/directory
    cd docs/
#### 4.  Serve content with MkDocs
    mkdocs serve
<br>

## Locally with docker

#### 1. Pull image from Docker Hub
    docker pull ncote/mkdocs_test:latest

#### 2. Run image
    docker run -p 8000:8000 ncote/mkdocs_test

#### 3. Browse to Website
    [http://127.0.0.1:8000/secure/RapidBoard.jspa/](http://127.0.0.1:8000/secure/RapidBoard.jspa/)

<hr>
## Documentation file structure

    mkdocs.yml    # The configuration file.
    docs/
        css/
           extra.css # Contains extra styling for the site. 
        how-to/
            k8sJH/
                customize-docker.md # Instructions on creating a customized Jupyter Docker image
                install.md # Placeholder for actual JupyterHub K8s installation
                setup-gh-actions.md # Walkthrough of setting up a GitHub action and workflow to build & push the Docker image
            agile.md # A description of the teams current Agile practices and policies
            build-docs.md # A how-to on building the documentation website
        images/
            * # All custom images used in the site
        img/
            favicon.ico # Overrides the default images used by readthedocs theme
        js/
            clipboard.js # Javascript to copy code to the clipboard
            extra.js # Defining how to implement the clipboard copy in our HTML
            popper.min.js # Used to have the Copied pop up on click
            tippy-bundle.umd.js # Used to have the Copied pop up on click
        overview/   
            about.md # The project about trading
            availability.md # List of current project availability 
            contact.md # How to interact with the team
            features.md # A list of potential features for the project
            hw-resources.md # Initial specs of all the hardware components in the project
            services.md # List of potential services we will offer
            use-cases.md # A collection of different potential use cases
        slas/
            glade.md # SLAs for the GLADE storage system as defined by Advanced Research Computing (ARC)
        index.md  # The documentation homepage.
        