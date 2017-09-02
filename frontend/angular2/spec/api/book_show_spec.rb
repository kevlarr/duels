require "spec_helper"

feature "api/v1/book/:id" do
  scenario 'should return book json' do
    book1 = create :book, title: "title1", author: "author1", description: "description"
    book2 = create :book, title: "title2", author: "author2", description: "description"
    create :review, book: book1, score: 10, description: "a good book"
    create :review, book: book1, score: 1, description: "a good book"
    get "/api/v1/book/#{book1.id}"
    expect(last_response.body).to eq({book: book1, reviews: book1.reviews}.to_json)
  end
end
