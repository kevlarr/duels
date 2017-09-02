require "spec_helper"

feature "api/v1/books/:book_id" do
  scenario 'should return book json' do
    book = Book.create(title: "title1", author: "author1", description: "description")
    Review.create(book: book, score: 10, description: "a good book")
    Review.create(book: book, score: 8, description: "a good book")

    get "/api/v1/books/#{book.id}"

    expect(last_response.body).to include *[
      book.id.to_s, "title1", "author1", "description", "Average Rating: 9"
    ]
  end
end
