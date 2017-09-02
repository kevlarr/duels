require "spec_helper"

feature "api/v1/books" do
  scenario 'should return books json' do
    book1 = Book.create(title: "title1", author: "author1", description: "description")
    book2 = Book.create(title: "title2", author: "author2", description: "description")
    Review.create(book: book1, score: 10, description: "a good book")
    Review.create(book: book1, score: 8, description: "a good book")
    get '/api/v1/books'

    expect(last_response.body).to include *[
      book1.id.to_s, "title1", "author1", "description", "Average Rating: 9",
      book2.id.to_s, "title2", "author2"
    ]
  end
end
