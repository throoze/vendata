require File.expand_path('../boot', __FILE__)

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)


module Vendata
  class Application < Rails::Application
    # Load the app's custom environment variables here, so that they are loaded before environments/*.rb
    app_environment_variables = File.join(Rails.root, 'config', 'app_environment_variables.rb')
    load(app_environment_variables) if File.exists?(app_environment_variables)

    DOCUMENTCLOUD_EMAIL = ENV['DOCUMENTCLOUD_EMAIL']
    DOCUMENTCLOUD_PASSWORD = ENV['DOCUMENTCLOUD_PASSWORD']

    # puts "==================================="
    # puts "DOCUMENTCLOUD_EMAIL = #{DOCUMENTCLOUD_EMAIL}"
    # puts "DOCUMENTCLOUD_PASSWORD = #{DOCUMENTCLOUD_PASSWORD}"
    # puts "==================================="

    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.

    # Set Time.zone default to the specified zone and make Active Record auto-convert to this zone.
    # Run "rake -D time" for a list of tasks for finding time zone names. Default is UTC.
    # config.time_zone = 'Central Time (US & Canada)'

    # The default locale is :en and all translations from config/locales/*.rb,yml are auto loaded.
    # config.i18n.load_path += Dir[Rails.root.join('my', 'locales', '*.{rb,yml}').to_s]
    # config.i18n.default_locale = :de

    # Do not swallow errors in after_commit/after_rollback callbacks.
    config.active_record.raise_in_transactional_callbacks = true

    # Use reactify transformer (-t reactify) and treat files with the .js.jsx extensions
    # as modules (--extension=\".js.jsx\")
    config.browserify_rails.commandline_options = "-t reactify --extension=\".js.jsx\""
    #config.browserify_rails.source_map_environments << "development"

    DocumentCloud.configure do |config|
        config.email    = DOCUMENTCLOUD_EMAIL
        config.password = DOCUMENTCLOUD_PASSWORD
    end

    # Avoid loading rails environment when precompiling assets
    config.assets.initialize_on_precompile = false
  end
end
