class Source < ActiveRecord::Base
    STATUS = [:pending, :scrapped, :validated]
end
