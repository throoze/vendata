class Api::V1::SearchController < ApplicationController
  def search
    render status: 200, json: Document.search(params[:q])
  end
end
