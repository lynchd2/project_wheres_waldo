class PhotosController < ApplicationController

  def index
    @photo = Photo.first
  end

  def show
  end

end
