require "factory_girl"

FactoryGirl.define do
  factory :book do
    sequence(:title) { |n| "Titley Title and #{n} Things" }
    sequence(:author) { |n| "Author Authorson #{n}" }
    sequence(:description) { |n| "Description #{n}" }
  end
end
