# How to build this documentation

#### 1.  Make sure you have MkDocs installed
    pip install mkdocs
#### 2.  Clone the git repository
    git clone https://github.com/NCAR/cisl-cloud.git
#### 3.  Change in to docs/directory
    cd docs/
#### 4.  Serve content with MkDocs
    mkdocs serve
<br>
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