---
title: "NCAR | CISL Cloud Pilot"
banner-button-url: https://jira.ucar.edu/secure/RapidBoard.jspa?rapidView=220&projectKey=CCPP
banner-description: Check progress on our up to date Kanban
banner-title: CISL Cloud Pilot
layout: frontpage
banner-button-text: Link to Kanban Page
---

# How to build this documentation

## How to deploy on GitHub Pages

This will create a branch inside the GitHub repository named ***gh-pages*** that GitHub will automatically setup to serve as the base for GitHub Pages
```
git clone https://github.com/NCAR/cisl-cloud.git
cd docs/
mkdocs gh-deploy --config-file mkdocs.yml --clean
```
The documentation should now be viewable at : [https://cisl-cloud.github.io/cisl-cloud/](https://nicholascote.github.io/CCPPdocs/)

## How to build locally

#### 1.  Make sure you have MkDocs installed
    `pip install mkdocs`
#### 2.  Clone the git repository
    `git clone https://github.com/NCAR/cisl-cloud.git`
#### 3.  Change in to docs/directory
    `cd docs/`
#### 4.  Serve content with MkDocs
    `mkdocs serve`
<br>
The documentation should now be available locally [here](http://127.0.0.1:8000/)
<hr>
## Documentation file structure

    mkdocs.yml    # The configuration file.
    docs/
        css/
           extra.css # Contains extra sytling for the site. 
        how-to/
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
        about.md # The project about trading
        contact.md # How to interact with the team
        features.md # A list of potential features for the project
        index.md  # The documentation homepage.
        layout.md # Outline of site directories and files
        services.md # List of potential services we will offer