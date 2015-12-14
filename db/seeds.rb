# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
User.create!(name: "Brandon Brown", email: "brandon.bbrandon@gmail.com", password: "foobar", password_confirmation: "foobar", admin: true, ftgoal: 0, jsgoal: 0, activated: true, activated_at: Time.zone.now)

99.times do |n|
    name = Faker::Name.name
    email = "example-#{n+1}@railstutorial.org"
    password = "password"
    User.create!(name: name, email: email, password: password, password_confirmation: password, ftgoal: 0, jsgoal: 0, activated: true, activated_at: Time.zone.now)
end
    

#Practice.create!(makeft: 0, totalft: 0, percentageft: 0, makejs: 0, totaljs: 0, percentagejs: 0, user_id: 1)