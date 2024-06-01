from selenium import webdriver # type: ignore
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
import time

# Path to your WebDriver executable
DRIVER_PATH = '/Users/macbook/Downloads/chromedriver-mac-x64'

# Initialize the WebDriver (e.g., for Chrome)
driver = webdriver.Chrome(executable_path=DRIVER_PATH)

try:
    # Navigate to your local live server URL
    driver.get('http://localhost:8000')

    # Check the page title
    assert "Admin Dashboard" in driver.title

    # Example interaction: clicking on the "Users" link in the sidebar
    users_link = driver.find_element(By.XPATH, "//a[contains(@href, './users.html')]")
    users_link.click()
    
    # Wait for the page to load
    time.sleep(2)
    
    # Verify the URL change
    assert "./users.html" in driver.current_url
    
    # Go back to the dashboard
    driver.back()

    # Click on the "Rooms" link in the sidebar
    rooms_link = driver.find_element(By.XPATH, "//a[contains(@href, './rooms.html')]")
    rooms_link.click()
    
    # Wait for the page to load
    time.sleep(2)
    
    # Verify the URL change
    assert "./rooms.html" in driver.current_url

    # Go back to the dashboard
    driver.back()

    # Interact with the Logout button
    logout_button = driver.find_element(By.ID, "logoutButton")
    logout_button.click()
    
    # Wait for some time to observe the result
    time.sleep(2)

    # Verify any expected outcome, such as URL change or alert presence
    # Note: You should add the expected behavior after clicking logout button

    # Interact with the Notes widget
    notes_area = driver.find_element(By.ID, "notesArea")
    notes_area.send_keys("This is a test note.")
    
    # Click the save notes button
    save_notes_button = driver.find_element(By.XPATH, "//button[contains(text(), 'Save Notes')]")
    save_notes_button.click()
    
    # Wait for some time to observe the result
    time.sleep(2)

    # Verify the note is saved
    # Note: You should add the expected behavior after saving notes
    
    # Add more interactions and assertions based on your page structure

finally:
    # Close the WebDriver
    driver.quit()
