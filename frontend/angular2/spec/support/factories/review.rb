require "factory_girl"

FactoryGirl.define do
  factory :review do
    book
    score { (1..10).to_a.sample }
    sequence(:description) { |n| "Review description #{n}" }
  end
end
