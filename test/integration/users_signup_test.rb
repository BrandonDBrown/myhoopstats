require 'test_helper'

class UsersSignupTest < ActionDispatch::IntegrationTest
  # test "the truth" do
  #   assert true
  # end
    def setup
    end
    test "invalid signup information" do
        get signup_path
        assert_no_difference 'User.count' do
            post users_path, user: {name: "", email: "user@invalid", password: "foo", password_confirmation: "bar", ftgoal: 101, jsgoal: 101 }
        end
        assert_template 'users/new'
        assert_select 'div#error_explanation'
        assert_select 'div.field_with_errors'
    end
    
    test "valid signup information with account activation" do
        get signup_path
        assert_difference 'User.count', 1 do
            post users_path, user: {name: "Example User", email: "user@example.com", password: "password", password_confirmation: "password", ftgoal:0, jsgoal:0 }
        end
    user = assigns(:user)
    assert user.activated?
    follow_redirect!
    assert_template 'users/show'
    assert is_logged_in?
    end
end
