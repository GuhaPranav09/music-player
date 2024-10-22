import requests

def get_saavn_song_url(song_name):
    try:
        # URL encode the song name to handle spaces and special characters
        search_url = f"https://saavn.me/search/songs?query={requests.utils.quote(song_name)}"
        
        # Send a GET request to search for the song
        search_response = requests.get(search_url)
        
        # Check if the request was successful
        if search_response.status_code != 200:
            print(f"Error: Received status code {search_response.status_code}")
            return None
        
        # Attempt to parse the response as JSON
        try:
            search_data = search_response.json()
        except requests.exceptions.JSONDecodeError as e:
            print("Error decoding JSON:", e)
            print("Response content:", search_response.text)
            return None

        # Check if the search results are valid
        if search_data and 'data' in search_data and len(search_data['data']) > 0:
            # Get the first song's ID from the search results
            song_id = search_data['data'][0]['id']
            
            # Get the details for the song using the song ID
            details_url = f"https://saavn.me/songs?id={song_id}"
            details_response = requests.get(details_url)
            
            # Check if the request was successful
            if details_response.status_code != 200:
                print(f"Error: Received status code {details_response.status_code}")
                return None

            # Attempt to parse the response as JSON
            try:
                song_details = details_response.json()
            except requests.exceptions.JSONDecodeError as e:
                print("Error decoding JSON:", e)
                print("Response content:", details_response.text)
                return None
            
            # Extract the 320kbps URL from the song details
            if song_details and 'data' in song_details and len(song_details['data']) > 0:
                audio_url = song_details['data'][0]['audio_url'].get('320kbps', None)
                return audio_url
        
        print("No valid song data found.")
        return None

    except requests.RequestException as e:
        print("Request failed:", e)
        return None

# Example usage
song_name = "Shape of You"
song_url = get_saavn_song_url(song_name)

if song_url:
    print(f"Song URL: {song_url}")
else:
    print("Song not found or unable to fetch the URL.")
