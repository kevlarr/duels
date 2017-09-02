require "spec_helper"

feature "user reviews a book", js: true do
  scenario "adds a reviews to a book" do
    book1 = Book.create(
      title: "ben's bountiful bosons",
      author: "ben kenobi",
      description: "a jedi discusses quantum mechanics as a methodology for understanding the psychosociopolitical ramifications of polarized galactic governmental divides and rebellions armed with sticks"
    )
    visit "/"
    click_link "ben's bountiful bosons"

    expect(page).to have_content "Add Review"

    select "10", from: :score
    fill_in :description, with: "Because I love this book"
    click_on "Submit"

    expect(page).to have_content "Add Review"
    expect(page).to have_content "Because I love this book"
  end
end
