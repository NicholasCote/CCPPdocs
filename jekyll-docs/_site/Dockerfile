FROM jekyll/jekyll
RUN pip install mkdocs
RUN git clone https://github.com/NicholasCote/CCPPdocs.git
EXPOSE 4000
WORKDIR /CCPPdocs/jekyll-docs
ENTRYPOINT ["bundle"]
CMD ["exec", "jekyll", "serve"]