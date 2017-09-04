require "sinatra"
require "sinatra/activerecord"

["models"].each do |dir|
  Dir["./app/#{dir}/*.rb"].each { |file| require file }
end

set :views, Proc.new { File.join(root, "app/views") }

get "/" do
  erb :index
end

get "/api/v1/books" do
  content_type :json

  books = Book.order(:title).map do |book|
    {
      book: book,
      review_score: book.average_review_score
    }
  end

  books.to_json
end

get "/api/v1/books/:id" do
  content_type :json
  book = Book.find(params[:id].to_i)

  {
    book: book,
    reviews: book.reviews
  }.to_json
end

post "/api/v1/books/new" do
  book = Book.create(
    title: params[:title],
    author: params[:author],
    description: params[:description]
  )

  if book.valid?
    status 200
    { book: book.to_json }
  else
    status 422
    { error: "Book could not be created" }
  end
end

post "/api/v1/book/:id/reviews/new" do
  book = Book.find(params[:id].to_i)
  review = Review.create(
    book: book,
    score: params[:review_score].to_i,
    description: params[:review_description]
  )
  if review.valid?
    status 200
  else
    status 422
  end
end
