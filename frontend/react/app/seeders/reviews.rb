module Seeders
  module Reviews
    def self.seed
      [
        {
          book: Book.find_by(title: "Ben's Bountiful Bosons"),
          score: 4,
          description: "would be awesome +1 if dark side"
        },
        {
          book: Book.find_by(title: "Ben's Bountiful Bosons"),
          score: 9,
          description: "old ben might be a crazy wizard, but he's also a crazy good writer!"
        },
        {
          book: Book.find_by(title: "Catch-22"),
          score: 10,
          description: "can't give it 22 stars otherwise i would"
        }
      ].each do |review|
        Review.find_or_create_by(review)
      end
    end
  end
end
