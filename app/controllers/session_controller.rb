class SessionController < ApplicationController
    skip_before_filter :authenticate, :only => :new

    def index
    end

    def all_users
        @users = User.all() 
    end
end
