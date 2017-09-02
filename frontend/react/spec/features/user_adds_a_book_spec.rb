require "spec_helper"

feature "user adds a book" do
  scenario "index links to add book", js: true do
    visit "/"
    click_link "Add Book"

    expect(page).to have_field :title
    expect(page).to have_field :author
    expect(page).to have_field :description
  end

  scenario "add book links back to index", js: true do
    visit "/"
    click_link "Add Book"
    click_link "Back to Index"

    expect(page).to have_content "Books"
  end

  scenario "user adds a book", js: true do
    visit "/"

    expect(page).not_to have_content "The best book ever written"

    click_on "Add Book"

    fill_in :title, with: "The best book ever written"
    fill_in :author, with: "Ironically enough, the worst author"
    fill_in :description, with: "This is the description for a book that is interesting"
    click_on "Submit"

    expect(page).to have_content "Books"
    expect(page).to have_content "The best book ever written"
  end
end
