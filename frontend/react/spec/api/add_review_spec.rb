require "spec_helper"

feature "api/v1/books/:book_id/reviews" do
  let!(:book) { Book.create(title: "title1", author: "author1", description: "description") }

  context 'valid review data' do
    it 'creates a review and returns 200' do
      post "/api/v1/books/#{book.id}/reviews", { score: "10", description: "Book description", id: book.id }

      expect(last_response.status).to eq 200
      expect(Review.all.count).to eq 1
    end
  end

  context 'invalid book data' do
    it 'does not create a book and returns 422' do
      post "/api/v1/books/#{book.id}/reviews", { id: book.id }

      expect(last_response.status).to eq 422
      expect(Review.all.count).to eq 0
    end
  end
end
