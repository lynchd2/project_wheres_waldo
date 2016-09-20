class TagsController < ApplicationController

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

  end

  def tag_params
    params.require(:tag).permit(:x, :y, :character, :photo_id)
  end
end
