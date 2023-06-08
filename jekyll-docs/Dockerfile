FROM ruby:3.1-slim-bullseye as jekyll

RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    git \
    && rm -rf /var/lib/apt/lists/*

# used in the jekyll-server image, which is FROM this image
COPY docker-entrypoint.sh /usr/local/bin/
RUN git clone https://github.com/NicholasCote/CCPPdocs.git
WORKDIR /ccpp-docs/jekyll-docs

RUN gem update --system && gem install jekyll && gem cleanup

EXPOSE 4000
ENTRYPOINT [ "jekyll" ]

CMD [ "--help" ]
FROM jekyll as jekyll-serve


ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["bundle", "exec", "jekyll", "serve"]