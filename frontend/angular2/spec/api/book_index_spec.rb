require "spec_helper"

feature "api/v1/books" do
  scenario 'should return books json' do
    book1 = create :book, title: "title1", author: "author1", description: "description"
    book2 = create :book, title: "title2", author: "author2", description: "description"
    create :review, book: book1, score: 10, description: "a good book"
    create :review, book: book1, score: 1, description: "a good book"
    get '/api/v1/books'
    expect(last_response.body).to eq(
      [
        {
          book: book1,
          review_score: book1.average_review_score,
          reviews: book1.reviews
        },
        {
          book: book2,
          review_score: book2.average_review_score,
          reviews: book2.reviews
        }
      ].to_json
    )
  end
end
