class SessionController < ApplicationController
    skip_before_filter :authenticate, :only => :new

    def index
    end
end
