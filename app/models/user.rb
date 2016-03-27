class User < ActiveRecord::Base
    # Include default devise modules.
    devise :database_authenticatable, :registerable,
            :recoverable, :rememberable, :trackable, :validatable,
            :confirmable, :omniauthable
    include DeviseTokenAuth::Concerns::User

    has_many :scrapings
    has_many :scraped, through: :scrapings, source: :source
    has_many :validations
    has_many :validated, through: :validations, source: :source
    has_many :flags
    has_many :flagged, through: :flags, source: :source

    ROLES = [:banned, :scraper, :validator, :admin]

    def role?(base_role)
        ROLES.index(base_role.to_s) <= ROLES.index(role)
    end
end
