class Validation < ActiveRecord::Base
  belongs_to :user, inverse_of: :validations
  belongs_to :source, inverse_of: :validations
end
