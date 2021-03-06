source 'https://rubygems.org'


# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '4.2.3'
# Use sqlite3 as the database for Active Record
gem 'sqlite3'
# Use SCSS for stylesheets
gem 'sass-rails', '~> 5.0'
# Use Uglifier as compressor for JavaScript assets
gem 'uglifier', '>= 1.3.0'
# Use CoffeeScript for .coffee assets and views
gem 'coffee-rails', '~> 4.1.0'
# See https://github.com/rails/execjs#readme for more supported runtimes
gem 'therubyracer', platforms: :ruby

# Assets pipeline
gem 'sprockets-rails', :require => 'sprockets/railtie'

# Use jquery as the JavaScript library
gem 'jquery-rails'
# Turbolinks makes following links in your web application faster. Read more: https://github.com/rails/turbolinks
gem 'turbolinks'
# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder', '~> 2.0'
# bundle exec rake doc:rails generates the API under doc/api.
gem 'sdoc', '~> 0.4.0', group: :doc

# Use ActiveModel has_secure_password
gem 'bcrypt', '~> 3.1.7'

# Use Capistrano for deployment
# gem 'capistrano-rails', group: :development
group :development do
  gem 'capistrano', '~> 3.1'
  gem 'capistrano-rails', '~> 1.1'
  gem 'capistrano-passenger'
end

group :production do
  # PostgreSQL access
  gem 'pg'
  # Use Unicorn as the app server
  gem 'unicorn'
end

group :assets do
  # Speed up asset precompiling
  gem 'turbo-sprockets-rails3'
end

group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug'

  # Access an IRB console on exception pages or by using <%= console %> in views
  gem 'web-console', '~> 2.0'

  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring'
end

# Authentication
gem 'hashie', '>= 3.4.3'
gem 'omniauth', '>= 1.2.2'
gem 'devise', '>= 3.5.2'
gem 'devise_token_auth', '>= 0.1.36'

# Authorization
gem 'cancan', '>= 1.6.10'

# React server-side rendering
gem 'react-rails', '~> 1.4.2'
gem 'react-router-rails', '~>0.13.3.1'
gem 'browserify-rails', '~> 0.9.1'
# gem 'react-rails-img'

# DocumentCloud
gem 'documentcloud', '>= 0.3.1'

# Bulk insertion
gem 'activerecord-import'

# Twitter Bootstrap
gem 'bootstrap-sass', '~> 3.2.0'
gem 'autoprefixer-rails'

# MongoDB ODM:
gem 'mongoid', '~> 5.0.0'

