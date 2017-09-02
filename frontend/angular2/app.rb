require "sinatra"
require "sinatra/activerecord"
require "pry"

Dir["./app/models/*.rb"].each { |file| require file }
Dir["./app/seeders/*.rb"].each { |file| require file }

set :views, Proc.new { File.join(root, "app/views") }

#HTTP Views
get "/" do
  erb :index
end

post "/book/:id/reviews/new" do
  book = Book.find(params[:id].to_i)
  Review.create(
    book: book,
    score: params[:review_score].to_i,
    description: params[:review_description]
  )
  redirect to("/book/#{book.id}")
end

#API endpoints
get "/api/v1/book/:id" do
  content_type :json
  @book = Book.find(params[:id].to_i)
  {
    book: @book,
    reviews: @book.reviews
  }.to_json
end

get "/api/v1/books" do
  content_type :json
  @books = Book.order(:title)
  books = []
  @books.each do |book|
    books << {
      book: book,
      review_score: book.average_review_score,
      reviews: book.reviews
    }
  end
  books.to_json
end

post "/api/v1/books/new" do
  json = JSON.parse(request.body.read)

  book = Book.create(
    title: json["title"],
    author: json["author"],
    description: json["description"]
  )
  if book.valid?
    status 200
  else
    status 422
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
