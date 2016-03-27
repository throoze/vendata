class Flag < ActiveRecord::Base
  belongs_to :user, inverse_of: :flags
  belongs_to :source, inverse_of: :flags
end
