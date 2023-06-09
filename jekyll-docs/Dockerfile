FROM ruby:3.1-slim-bullseye as jekyll

RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    git \
    && rm -rf /var/lib/apt/lists/*

RUN git clone https://github.com/NicholasCote/CCPPdocs.git
WORKDIR /CCPPdocs/jekyll-docs

RUN gem update --system && \
    bundle update listen && \
    gem install jekyll && \
    bundle update sass && \
    gem cleanup

EXPOSE 4000
FROM jekyll as jekyll-serve

WORKDIR /CCPPdocs/jekyll-docs

RUN bundle install

CMD ["bundle", "exec", "jekyll", "serve"]