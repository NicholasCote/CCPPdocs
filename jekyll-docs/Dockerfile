# Jekyll is a Ruby gem and needs to run on Ruby so we will use a ruby image for the base
FROM ruby:3.1-slim-bullseye as jekyll

# Install any required packages via apt. The only requirement is git
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    git \
    && rm -rf /var/lib/apt/lists/*

# Clone the repository that has all the documentation code
RUN git clone https://github.com/NicholasCote/CCPPdocs.git

# Change in to the base directory that contains the Gemfile and _config.yml
WORKDIR /CCPPdocs/jekyll-docs

# Update all Gems, install jekyll, and cleanup
RUN gem update --system && \
    gem install jekyll && \
    gem cleanup && \
    bundle update listen

# Jekyll runs on port 4000 so that is exposed so it can be accessed
EXPOSE 4000
FROM jekyll as jekyll-serve

# Change in to the base directory that contains the Gemfile and _config.yml
WORKDIR /CCPPdocs/jekyll-docs

# Install all required Gems
RUN bundle install --full-index 

# Run the application on 0.0.0.0 so it can be accessed outside the container. 
CMD ["bundle", "exec", "jekyll", "serve", "--host", "0.0.0.0"]