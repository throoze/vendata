class Scrapping < ActiveRecord::Base
  belongs_to :user, inverse_of: :scrappings
  belongs_to :source, inverse_of: :scrappings
end
