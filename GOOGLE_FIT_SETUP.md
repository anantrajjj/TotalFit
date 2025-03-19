# Setting up Google Fit Integration

Follow these steps to integrate Google Fit with your application:

## 1. Set Up Google Cloud Project

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Fitness API:
   - Search for "Fitness API" in the API Library
   - Click "Enable"

## 2. Configure OAuth Consent Screen

1. Go to "OAuth consent screen" in the API & Services section
2. Choose "External" user type
3. Fill in the application information:
   - App name
   - User support email
   - Developer contact information
4. Add the following scopes:
   - fitness.activity.read
   - fitness.body.read
   - fitness.heart_rate.read

## 3. Create OAuth 2.0 Client ID

1. Go to "Credentials" in the API & Services section
2. Click "Create Credentials" > "OAuth client ID"
3. Choose "Web application"
4. Add authorized JavaScript origins:
   - http://localhost:5173 (for development)
   - Your production domain
5. Add authorized redirect URIs:
   - http://localhost:5173 (for development)
   - Your production domain
6. Copy the generated Client ID

## 4. Configure Your Application

1. Create a `.env` file in your project root if it doesn't exist
2. Add your Google Client ID:
   ```
   VITE_GOOGLE_CLIENT_ID=your_client_id_here
   ```

## 5. Using the Google Fit Integration

1. Import the useGoogleFit hook in your component:
   ```typescript
   import { useGoogleFit } from '../lib/googleFit';
   ```

2. Use the hook in your component:
   ```typescript
   const { fitData, isConnected, error, connectGoogleFit } = useGoogleFit();
   ```

3. Connect to Google Fit:
   ```typescript
   <button onClick={connectGoogleFit}>
     Connect Google Fit
   </button>
   ```

4. Access fitness data:
   ```typescript
   {fitData && (
     <div>
       <p>Steps: {fitData.steps}</p>
       <p>Calories: {fitData.calories}</p>
       <p>Distance: {fitData.distance} km</p>
       <p>Heart Rate: {fitData.heartRate} bpm</p>
       <p>Active Minutes: {fitData.activeMinutes}</p>
     </div>
   )}
   ```

## Troubleshooting

- If you see authentication errors, make sure your Client ID is correctly set in the .env file
- Verify that you've enabled all required scopes in the OAuth consent screen
- Check that your authorized origins and redirect URIs match your development/production URLs
- For development, ensure you're running the app on http://localhost:5173

## Security Considerations

- Never commit your Client ID directly in the code
- Always use environment variables for sensitive credentials
- Implement proper error handling for failed authentication attempts
- Regularly monitor your Google Cloud Console for any suspicious activities