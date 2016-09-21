class TagsController < ApplicationController

  def index
    @tags = Tag.where(photo_id: params[:pid].to_i)
    # @tags = Tag.all
    respond_to do |format|
      format.html {}
      format.json { render json: @tags }
    end
  end

  def create
    @tag = Tag.new(tag_params)
    if @tag.save
      respond_to do |format|
        format.json {}
      end
    else
      respond_to do |format|
        format.json {}
      end
    end

  end



  def destroy
    @tag = Tag.find(params[:id])
    if @tag.destroy
      respond_to do |format|
        format.json {}
      end
    else
      respond_to do |format|
        format.json {}
      end
    end

  end

  def tag_params
    params.require(:tag).permit(:x, :y, :character, :photo_id)
  end
end