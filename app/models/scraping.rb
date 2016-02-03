class Scraping < ActiveRecord::Base
  belongs_to :user, inverse_of: :scrapings
  belongs_to :source, inverse_of: :scrapings
  has_many   :validations
  store      :sub_documents, accessors: [ :main, :others ], coder: JSON
end
