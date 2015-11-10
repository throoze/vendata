class SessionController < ApplicationController
    skip_before_filter :authenticate, :only => :new
    def new
        render component: 'Login'
    end
end
