require "sinatra"
require "sinatra/activerecord"
require "pry"

Dir["./app/models/*.rb"].each { |file| require file }
Dir["./app/seeders/*.rb"].each { |file| require file }

Seeders::Books.seed

# Landing page

get("/") { send_file 'public/index.html' }

# API endpoints

get "/api/v1/books" do
  content_type :json
  Book.order(:title).collect { |b| b.attributes_with_score } .to_json
end

get "/api/v1/books/:book_id" do
  content_type :json
  Book.find(params[:book_id]).attributes_with_score.to_json
end

post "/api/v1/books" do
  content_type :json
  book = Book.new(
    title: params[:title],
    author: params[:author],
    description: params[:description]
  )
  if book.save
    status 200
    book.attributes_with_score.to_json
  else
    status 422
    book.errors.full_messages.to_json
  end
end

get "/api/v1/books/:book_id/reviews" do
  content_type :json
  Review.where(book_id: params[:book_id]).to_json
end

post "/api/v1/books/:book_id/reviews" do
  content_type :json
  review = Review.new(
    book: Book.find(params[:book_id]),
    score: params[:score],
    description: params[:description]
  )
  if review.save
    status 200
    review.to_json
  else
    status 422
    review.errors.full_messages.to_json
  end
end
