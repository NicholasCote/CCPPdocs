FROM ruby:3.1-slim-bullseye as jekyll

RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    git \
    && rm -rf /var/lib/apt/lists/*

RUN git clone https://github.com/NicholasCote/CCPPdocs.git
WORKDIR /CCPPdocs/jekyll-docs

RUN gem update --system && \
    gem install jekyll && \
    gem cleanup && \
    bundle update sass && \
    bundle update listen

EXPOSE 4000
FROM jekyll as jekyll-serve

WORKDIR /CCPPdocs/jekyll-docs

RUN bundle install --full-index 

CMD ["bundle", "exec", "jekyll", "serve", "--host", "0.0.0.0"]