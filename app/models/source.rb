class Source < ActiveRecord::Base
    STATUS = [:pending, :flagged, :scrapped, :validated]
    has_many :scrappings
    has_many :scrappers, through: :scrappings, :source => :user
    has_many :validations
    has_many :validators, through: :validations, :source => :user
    has_many :flags
    has_many :flaggers, through: :flags, :source => :user
end
