require "sinatra/activerecord"
require "rack/test"
require "rspec"
require "capybara/rspec"
require "capybara/poltergeist"
require "shoulda-matchers"
require "pry"
require_relative "../app"

ENV["RACK_ENV"] = "test"

Dir["./app/models/*.rb"].each { |file| require file }
Dir["./app/seeders/*.rb"].each { |file| require file }
Dir["./spec/support/*.rb"].each { |file| require file }
Dir["./spec/support/factories/*.rb"].each { |file| require file }

ActiveRecord::Base.logger.level = 1

RSpec.configure do |config|
  config.expect_with :rspec do |expectations|
    expectations.include_chain_clauses_in_custom_matcher_descriptions = true
  end

  config.mock_with :rspec do |mocks|
    mocks.verify_partial_doubles = true
  end

  config.include FactoryGirl::Syntax::Methods
  config.filter_run :focus
  config.run_all_when_everything_filtered = true
  config.order = :random
end

Capybara.app = Sinatra::Application
Capybara.javascript_driver = :poltergeist

include Rack::Test::Methods

def app
  Sinatra::Application
end
