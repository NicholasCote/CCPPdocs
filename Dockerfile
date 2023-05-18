FROM python:3
RUN pip install mkdocs
RUN git clone https://github.com/NicholasCote/CCPPdocs.git
EXPOSE 8000
WORKDIR /CCPPdocs/cccp-docs
ENTRYPOINT ["mkdocs"]
CMD ["serve", "--dev-addr=0.0.0.0:8000"]