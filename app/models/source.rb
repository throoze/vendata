class Source < ActiveRecord::Base
    STATUS = [:pending, :flagged, :scrapped, :validated]
    has_many :scrappings
    has_many :scrappers, through: :scrappings, class_name: 'User'
    has_many :validations
    has_many :validators, through: :validations, class_name: 'User'
    has_many :flags
    has_many :flaggers, through: :flags, class_name: 'User'
end
