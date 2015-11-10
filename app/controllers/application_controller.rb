class ApplicationController < ActionController::Base
  include DeviseTokenAuth::Concerns::SetUserByToken
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  # before_filter :authenticate
  protect_from_forgery with: :exception


  def index
  end

  private

  def authenticate
    redirect_to login_url unless user_signed_in?
  end
end
