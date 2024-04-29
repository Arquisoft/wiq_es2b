Feature: Visible user logged history

Scenario: The user is not logged in the site
  Given A not logged user
  When Press history
  Then Redirected to login

Scenario: The user register in the site so he can see history
  Given A unregistered user, fill the register
  When I press history
  Then I see my history