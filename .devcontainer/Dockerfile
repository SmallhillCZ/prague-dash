FROM fastlanetools/ci:0.4.0

USER root

WORKDIR /workspace/install

COPY Gemfile Gemfile.lock ./

RUN bundle install

WORKDIR /workspace