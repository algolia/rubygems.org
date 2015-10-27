FROM ruby:2.2.3

RUN apt-get update -qq && apt-get install -y build-essential libpq-dev

RUN apt-get install -y nodejs

ENV APP_HOME /rubygems.org
RUN mkdir $APP_HOME
WORKDIR $APP_HOME

ADD Gemfile* $APP_HOME/
RUN bundle install

ADD . $APP_HOME