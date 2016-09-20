class PhotosController < ApplicationController

  def index
    @photo = Photo.first
  end

  def show
    @photo = Photo.find(params[:id])
  end

end
