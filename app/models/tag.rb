class Tag < ApplicationRecord
  has_one :photo

  validates :character, uniqueness: { scope: :photo_id }

end
