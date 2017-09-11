require "bundler/setup"
require "sinatra"
require "sinatra/activerecord"

Dir["./app/models/*.rb"].each { |file| require file }

set :bind, '0.0.0.0'
set :views, Proc.new { File.join(root, "app/views") }

get "/" do
  erb :index
end

get "/api/v1/books" do
  content_type :json

  status 200
  {books: Book.order(:title)}.to_json
end

get "/api/v1/books/:book" do
  content_type :json
  book = Book.find(params[:book].to_i)

  status 200
  {book: book, reviews: book.reviews}.to_json
end

post "/api/v1/books/new" do
  content_type :json
  book = Book.create(
    title: params[:title],
    author: params[:author],
    description: params[:description]
  )

  if book.valid?
    status 200
    {book: book.to_json}
  else
    status 422
    {error: "Book could not be created"}
  end
end

post "/api/v1/books/:book/reviews/new" do
  content_type :json
  book = Book.find(params[:book].to_i)
  review = Review.create(
    book: book,
    score: params[:review_score].to_i,
    description: params[:review_description]
  )

  if review.valid?
    status 200
    {review: review.to_json}
  else
    status 422
    {error: "Review could not be created"}
  end
end
