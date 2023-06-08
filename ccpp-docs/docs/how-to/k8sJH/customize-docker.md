# How to Customize a Jupyter Docker Image for Single Users

The Jupyter environment spun up for the users can be customized by building on top of the base Jupyter Docker image. For this use case the docker-stacks-foundation image from Jupyter is used. That image is built from ubuntu:22.04. 

This example Dockerfile has comments inline to explain what the lines are doing

## Dockerfile

The following Dockerfile is built automatically anytime there is a push to the directory where it is stored via GitHub actions. Setting up a GitHub action to build and push a Docker image to Docker Hub can be viewed at the [Setup GitHub Action](setup-gh-act.md) section.

```
# Borrowed heavily from the base-notebook Dockerfile by Jupyter
# https://github.com/jupyter/docker-stacks/blob/main/base-notebook/Dockerfile
# The shell scripts and python modules were developed by the Jupyter Development Team
# This image provides a custom environment.yml and requirements.txt as well as
# having some customizations injected into this Dockerfile 
# The base image used is the docker-stacks-foundation by Jupyter
# https://github.com/jupyter/docker-stacks/blob/main/docker-stacks-foundation/Dockerfile

FROM jupyter/docker-stacks-foundation:latest

LABEL maintainer="CISL Cloud Pilot Team <cisl-cloud-pilot@ucar.edu>"

# Fix: https://github.com/hadolint/hadolint/wiki/DL4006
# Fix: https://github.com/koalaman/shellcheck/wiki/SC3014
SHELL ["/bin/bash", "-o", "pipefail", "-c"]

USER root

# Install all OS dependencies for notebook server that starts but lacks all
# features (e.g., download as all possible file formats)
RUN apt-get update --yes && \
    apt-get install --yes --no-install-recommends \
    fonts-liberation \
    curl \
    emacs \
    nodejs \
    npm \
    git \
    vim \
    # - pandoc is used to convert notebooks to html files
    #   it's not present in aarch64 ubuntu image, so we install it here
    pandoc \
    # - run-one - a wrapper script that runs no more
    #   than one unique  instance  of  some  command with a unique set of arguments,
    #   we use `run-one-constantly` to support `RESTARTABLE` option
    run-one && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

USER ${NB_UID}

# Install Jupyter Notebook, Lab, and Hub
# Generate a notebook server config
# Cleanup temporary files
# Correct permissions
# Do all this in a single RUN command to avoid duplicating all of the
# files across image layers when the permissions change
COPY configs/jupyter/base-notebook/environment.yml configs/jupyter/base-notebook/requirements.txt /tmp/

WORKDIR /tmp
RUN mamba install --quiet --yes \
    # NodeJS >= 18.0 is required for `jupyter lab build` command
    # https://github.com/jupyter/docker-stacks/issues/1901
    'nodejs>=18.0' \
    'notebook' \
    'jupyterhub' \
    'jupyterlab==3.6.3' \
    'conda-forge::nb_conda_kernels' && \
    # Pin NodeJS
    echo 'nodejs >=18.0' >> "${CONDA_DIR}/conda-meta/pinned" && \
    # nb_conda_kernels is required to save user environments as custom user notebook kernels that persist
# Create a kernel named cisl-cloud-base from the environment.yml file
    mamba env update --name cisl-cloud-base -f environment.yml && \
# Install nbgitpuller via pip 
    pip install -r requirements.txt && \
    jupyter notebook --generate-config && \
    mamba clean --all -f -y && \
    npm cache clean --force && \
    jupyter lab clean && \
    mkdir -p .config/ && \
    mkdir -p .config/dask/ && \
    rm -rf "/home/${NB_USER}/.cache/yarn" && \
    fix-permissions "${CONDA_DIR}" && \
    fix-permissions "/home/${NB_USER}"

ENV JUPYTER_PORT=8888
EXPOSE $JUPYTER_PORT

# Configure container startup
CMD ["start-notebook.sh"]

# Copy local files as late as possible to avoid cache busting
COPY configs/jupyter/base-notebook/scripts/start-notebook.sh configs/jupyter/base-notebook/scripts/start-singleuser.sh /usr/local/bin/
# Currently need to have both jupyter_notebook_config and jupyter_server_config to support classic and lab
COPY configs/jupyter/base-notebook/scripts/jupyter_server_config.py configs/jupyter/base-notebook/scripts/docker_healthcheck.py /etc/jupyter/

# Fix permissions on /etc/jupyter as root
USER root

RUN rm -rf /tmp/environment.yml && \
    rm -rf /tmp/requirements.txt
# Legacy for Jupyter Notebook Server, see: [#1205](https://github.com/jupyter/docker-stacks/issues/1205)
RUN sed -re "s/c.ServerApp/c.NotebookApp/g" \
    /etc/jupyter/jupyter_server_config.py > /etc/jupyter/jupyter_notebook_config.py && \
    fix-permissions /etc/jupyter/

# Used to allow folder deletions
RUN sed -i 's/c.FileContentsManager.delete_to_trash = False/c.FileContentsManager.always_delete_dir = True/g' /etc/jupyter/jupyter_server_config.py

# HEALTHCHECK documentation: https://docs.docker.com/engine/reference/builder/#healthcheck
# This healtcheck works well for `lab`, `notebook`, `nbclassic`, `server` and `retro` jupyter commands
# https://github.com/jupyter/docker-stacks/issues/915#issuecomment-1068528799
HEALTHCHECK --interval=5s --timeout=3s --start-period=5s --retries=3 \
    CMD /etc/jupyter/docker_healthcheck.py || exit 1

# Copy the .condarc file to allow for saving of user custom conda environments
COPY configs/jupyter/base-notebook/config/.condarc /
COPY configs/jupyter/base-notebook/config/.condarc /opt/conda/
COPY configs/jupyter/base-notebook/config/.profile /.bash_profile
COPY configs/jupyter/base-notebook/config/.bashrc /
COPY configs/jupyter/base-notebook/config/.bashrc /etc/bash.bashrc
COPY configs/jupyter/base-notebook/config/distributed.yml /

# Switch back to jovyan to avoid accidental container runs as root
USER ${NB_UID}

WORKDIR "${HOME}"
```

## environment.yml

The environment.yml file is where most of the python packages will be installed from via mamba. The following are the packages installed currently in the cisl-cloud-base conda kernel. 

```
name: cisl-cloud-base
channels:
  - conda-forge
dependencies:
# Filesystem interface for Azure
# https://pypi.org/project/adlfs/
  - adlfs
# Vega-Altair: A declarative statistical visualization library for Python.
# https://pypi.org/project/altair/
  - altair
# Argo Data access
# https://pypi.org/project/argopy/
  - argopy
# AWS Command Line Interface
# https://pypi.org/project/awscli/
  - awscli
# Screen-scraping library
# https://pypi.org/project/beautifulsoup4/
  - beautifulsoup4
# Interactive plots and applications in the browser from Python
# https://pypi.org/project/bokeh/
  - bokeh
# AWS Software Development Kit (SDK)
# https://pypi.org/project/boto3/
  - boto3
# Collection of fast NumPy array functions written in C
# https://pypi.org/project/Bottleneck/
  - bottleneck
# Cartographic python library with Matplotlib support for visualization
# https://pypi.org/project/Cartopy/0.21.1/
  - cartopy
# Interface to map GRIB files to NetCDF
# https://pypi.org/project/cfgrib/
  - cfgrib
# Extended pickling support for Python objects
# https://pypi.org/project/cloudpickle/
  - cloudpickle
# The Cython compiler for writing C extensions for the Python language.
# https://pypi.org/project/Cython/
  - cython
# Parallel PyData with Task Scheduling
# https://pypi.org/project/dask/
  - dask
# Library for interacting with a dask-gateway server
# https://pypi.org/project/dask-gateway/
  - dask-gateway
# Library to deploy dask on HPC job queuing systems like PBS, Slurm, etc.
# https://pypi.org/project/dask-jobqueue/
  - dask-jobqueue
# Use geometric objects as matplotlib paths and patches
# https://pypi.org/project/descartes/
  - descartes
# serialize all of python
# https://pypi.org/project/dill/
  - dill
# Client library for NASA Earthdata APIs
# https://pypi.org/project/earthaccess/
  - earthaccess
# Empirical orthogonal function (EOF) analysis in Python
# https://pypi.org/project/eofs/
  - eofs
# Python interface for ERDDAP
# https://pypi.org/project/erddapy/
  - erddapy
# GroupBy operations for dask.array
# https://pypi.org/project/flox/
  - flox
# File-system specification
# https://pypi.org/project/fsspec/
  - fsspec
# Diffusion-based Spatial Filtering of Gridded Data
# https://pypi.org/project/gcm-filters/
  - gcm_filters
# Filesystem interface for Google Cloud Storage
# https://pypi.org/project/gcsfs/
  - gcsfs
# Tool to convert geopandas vector data into rasterized xarray data.
# https://pypi.org/project/geocube/
  - geocube
# Geographic pandas extensions
# https://pypi.org/project/geopandas/
  - geopandas
# Python Geocoding Toolbox
# https://pypi.org/project/geopy/
  - geopy
# GeoViews is a Python library that makes it easy to explore and visualize geographical, meteorological, and oceanographic datasets
# https://pypi.org/project/geoviews/
  - geoviews-core
# Temporary, well scoped credentials for pushing to GitHub
# https://pypi.org/project/gh-scoped-creds/
  - gh-scoped-creds
# Gibbs Seawater Oceanographic Package of TEOS-10
# https://pypi.org/project/gsw/
  - gsw
# netCDF4 via h5py
# https://pypi.org/project/h5netcdf/
  - h5netcdf
# Read and write HDF5 files from Python
# https://pypi.org/project/h5py/
  - h5py
# Stop plotting your data - annotate your data and let it visualize itself.
# https://pypi.org/project/holoviews/
  - holoviews
# A high-level plotting API for the PyData ecosystem built on HoloViews.
# https://pypi.org/project/hvplot/
  - hvplot
# Data load and catalog system
# https://pypi.org/project/intake/
  - intake
# An intake plugin for parsing an Earth System Model (ESM) catalog and loading netCDF files and/or Zarr stores into Xarray datasets.
# https://pypi.org/project/intake-esm/
  - intake-esm
# xarray plugins for Intake
# https://pypi.org/project/intake-xarray/
  - intake-xarray
# IPython Kernel for Jupyter
# https://pypi.org/project/ipykernel/
  - ipykernel>=6.21.2
# Matplotlib Jupyter Extension
# https://pypi.org/project/ipympl/
  - ipympl
# Jupyter interactive widgets
# https://pypi.org/project/ipywidgets/
  - ipywidgets
# Allows embedding of Jupyter widgets in Bokeh layouts.
# https://pypi.org/project/ipywidgets-bokeh/
  - ipywidgets-bokeh
# A Jupyter extension for rendering Bokeh content.
# https://pypi.org/project/jupyter-bokeh/
  - jupyter_bokeh
# Jupyter Server Proxy for Panel applications
# https://pypi.org/project/jupyter-panel-proxy/
  - jupyter-panel-proxy
# Jupyter Extension to show resource usage
# https://pypi.org/project/jupyter-resource-usage/
  - jupyter-resource-usage
# Functions to make reference descriptions for ReferenceFileSystem
# https://pypi.org/project/kerchunk/
  - kerchunk
# Powerful and Pythonic XML processing library combining libxml2/libxslt with the ElementTree API.
# https://pypi.org/project/lxml/
  - lxml
# Python plotting package
# https://pypi.org/project/matplotlib/
  - matplotlib
# Collection of tools for reading, visualizing and performing calculations with weather data.
# https://pypi.org/project/MetPy/
  - metpy
# Strips outputs from Jupyter and IPython notebooks
# https://pypi.org/project/nbstripout/
  - nbstripout
# Provides support for a cftime axis in matplotlib
# https://pypi.org/project/nc-time-axis/
  - nc-time-axis
# Provides an object-oriented python interface to the netCDF version 4 library
# https://pypi.org/project/netCDF4/
  - netcdf4
# compiling Python code using LLVM
# https://pypi.org/project/numba/
  - numba
# Fast numerical expression evaluator for NumPy
# https://pypi.org/project/numexpr/
  - numexpr
# Fundamental package for array computing in Python
# https://pypi.org/project/numpy/
  - numpy
# Tooling for converting STAC metadata to ODC data model
# https://pypi.org/project/odc-stac/
  - odc-stac
# A Python library to read/write Excel 2010 xlsx/xlsm files
# https://pypi.org/project/openpyxl/
  - openpyxl
# Powerful data structures for data analysis, time series, and statistics
# https://pypi.org/project/pandas/
  - pandas
# The powerful data exploration & web app framework for Python.
# https://pypi.org/project/panel/
  - panel
# A Python package for describing statistical models and for building design matrices.
# https://pypi.org/project/patsy/
  - patsy
# Framework for Lagrangian tracking of virtual ocean particles in the petascale age.
# https://pypi.org/project/parcels/
  - parcels
# Make your Python code clearer and more reliable by declaring Parameters.
# https://pypi.org/project/param/
  - param
# Tools to support analysis of POP2-CESM model solutions with xarray
# https://pypi.org/project/pop-tools/
  - pop-tools
# Protocol Buffers are a language-neutral, platform-neutral extensible mechanism for serializing structured data.
# https://protobuf.dev/
  - protobuf
# An implementation of the Data Access Protocol.
# https://pypi.org/project/pydap/
  - pydap
# Python library for working with Spatiotemporal Asset Catalog (STAC).
# https://pypi.org/project/pystac/
  - pystac
# https://pypi.org/project/pystac-client/
  - pystac-client
# PyTables is a package for managing hierarchical datasets and designed to efficiently and easily cope with extremely large amounts of data
# https://www.pytables.org/
  - pytables
# A framework for requesting AWIPS meteorological datasets from an EDEX server
# https://pypi.org/project/python-awips/
  - python-awips
# Simple Python interface for Graphviz
# https://pypi.org/project/graphviz/
  - python-graphviz
# Fast and direct raster I/O for use with Numpy and SciPy
# https://pypi.org/project/rasterio/
  - rasterio
# A library for rechunking arrays.
# https://pypi.org/project/rechunker/
  - rechunker
# Cloud Optimized GeoTIFF (COGEO) creation plugin for rasterio
# https://pypi.org/project/rio-cogeo/
  - rio-cogeo
# geospatial xarray extension powered by rasterio
# https://pypi.org/project/rioxarray/
  - rioxarray
# Convenient Filesystem interface over S3
# https://pypi.org/project/s3fs/
  - s3fs
# Python package for earth-observing satellite data processing
# https://pypi.org/project/satpy/
  - satpy
# Image processing in Python
# https://pypi.org/project/scikit-image/
  - scikit-image
# A set of python modules for machine learning and data mining
# https://pypi.org/project/scikit-learn/
  - scikit-learn
# Fundamental algorithms for scientific computing in Python
# https://pypi.org/project/scipy/
  - scipy
# Statistical data visualization
# https://pypi.org/project/seaborn/
  - seaborn
# A collection of Python utilities for interacting with the Unidata technology stack.
# https://pypi.org/project/siphon/
  - siphon
# A web-based viewer for Python profiler output
# https://pypi.org/project/snakeviz/
  - snakeviz
# Sparse n-dimensional arrays
# https://pypi.org/project/sparse/
  - sparse
# Database Abstraction Library
# https://pypi.org/project/SQLAlchemy/
  - sqlalchemy
# Load a STAC collection into xarray with dask
# https://pypi.org/project/stackstac/
  - stackstac
# Statistical computations and models for Python
# https://pypi.org/project/statsmodels/
  - statsmodels
# Computer algebra system (CAS) in Python
# https://pypi.org/project/sympy/
  - sympy
# Pythonic interface to the TileDB array storage manager
# https://pypi.org/project/tiledb/
  - tiledb-py
# fast python package for finding the timezone of any point on earth (coordinates) offline
# https://pypi.org/project/timezonefinder/
  - timezonefinder
# Jupyter interactive widgets for Jupyter Notebook
# https://pypi.org/project/widgetsnbextension/
  - widgetsnbextension
# N-D labeled arrays and datasets in Python
# https://pypi.org/project/xarray/
  - xarray
# A collection of various tools for data analysis built on top of xarray and xgcm
# https://pypi.org/project/xarrayutils/
  - xarrayutils
# Hierarchical tree-like data structures for xarray
# https://pypi.org/project/xarray-datatree/
  - xarray-datatree
# An xarray extension for map plotting
# https://pypi.org/project/xarray_leaflet/
  - xarray_leaflet
# xarray-based spatial analysis tools
# https://pypi.org/project/xarray-spatial/
  - xarray-spatial
# Batch generation from Xarray objects
# https://pypi.org/project/xbatcher/
  - xbatcher
# Climate indices computation package based on Xarray.
# https://pypi.org/project/xclim/
  - xclim
# Universal Regridder for Geospatial Data
# https://pypi.org/project/xesmf/
  - xesmf
# General Circulation Model Postprocessing with xarray
# https://pypi.org/project/xgcm/
  - xgcm
# Fast, flexible, label-aware histograms for numpy and xarray
# https://pypi.org/project/xhistogram/
  - xhistogram
# Analysis ready CMIP6 data the easy way
# https://pypi.org/project/xmip/
  - xmip
# Read MITgcm mds binary files into xarray
# https://pypi.org/project/xmitgcm/
  - xmitgcm
# Publish Xarray Datasets via a REST API.
# https://pypi.org/project/xpublish/
  - xpublish
# Discrete Fourier Transform with xarray
# https://pypi.org/project/xrft/
  - xrft
# An implementation of chunked, compressed, N-dimensional arrays for Python
# https://pypi.org/project/zarr/
  - zarr
# Library for developers to extract data from Microsoft Excel (tm) spreadsheet files
# https://pypi.org/project/xlrd3/
  - xlrd
```

## requirements.txt
pip is used to install the following Jupyter extensions so they are available in the base image irregardless of the conda enviornment that is active. 

```
nbgitpuller
jupyterlab-git
jupyter-server-proxy
dask-labextension
```