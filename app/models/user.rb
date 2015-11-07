class User < ActiveRecord::Base
    # Include default devise modules.
    devise :database_authenticatable, :registerable,
            :recoverable, :rememberable, :trackable, :validatable,
            :confirmable, :omniauthable
    include DeviseTokenAuth::Concerns::User

    ROLES = [:banned, :scrapper, :validator, :admin]

    def role?(base_role)
        ROLES.index(base_role.to_s) <= ROLES.index(role)
    end
end
