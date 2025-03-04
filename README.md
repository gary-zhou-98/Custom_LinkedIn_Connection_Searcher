# LinkedIn Connections Filter V1

## Context

This project was inspired by a friend who asked me for referrals to FAANG companies, and LinkedIn's lack of search capability for fuzzy connections search using criterias such as "FAANG companies" or "tech start-ups". It provides a streamlined solution for filtering and analyzing your **first degree** (see details below) LinkedIn connections based on custom criteria. By leveraging AI, it helps users identify specific segments of their professional network, such as finding connections working at startups, specific industries, or companies matching certain criteria.

The application processes a CSV export of LinkedIn connections and uses GPT-4 to intelligently filter and categorize connections based on user-defined criteria, making it easier to maintain and leverage your professional network effectively.

## Features

- 📤 CSV file upload for LinkedIn connections
- 🔍 AI-powered filtering of connections
- 💻 Clean, responsive UI with dark mode
- ⚡ Real-time batch processing with progress indication
- 🔄 Toggle between full and filtered connection views
- 📱 Mobile-friendly design

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- [OpenAI API key](https://platform.openai.com/docs/quickstart)

### Installation

1. Clone the repository

```bash
git clone https://github.com/your-username/custom_linkedin_searcher.git
cd custom_linkedin_searcher
```

2. Install dependencies for both client and server

```bash
# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install
```

3. Set up environment variables

```bash
# In server directory, create a .env file
OPEN_AI_API_KEY=your_openai_api_key

# In client directory, create a .env file
NEXT_PUBLIC_API_URL=http://localhost:5000 # by default the server would run on port 5000, you can customize in the server-side .env file
```

4. Start the development servers

```bash
# Start the server (from server directory)
npm run dev

# Start the client (from client directory)
npm run dev
```

5. Access the application at `http://localhost:3000`

### Using the Application

1. Export your LinkedIn connections:

- Follow detailed instructions from [LinkeIn Help Center](https://www.linkedin.com/help/linkedin/answer/a566336/export-connections-from-linkedins)

2. Upload the CSV file using the application's upload button

3. Enter your filtering criteria in the search box (e.g., "tech startups in Series A or earlier")

4. View and toggle between full and filtered results

## Caveats

1. Upon planning and researching for the projects, I learnt that LinkedIn API is quite limited in providing Connections data (at least if you're not a trusted partner), and they have a strict anti-scraping policy. Therefore, I have to opt for manually downloading the data myself.
2. Initially, I was hoping to supplement the data for companies of my connections by using a third-party API to fetch more information about company to make the filtering more preciese. However, there doesn't seem to exist a lightweight API that's friendly for non-enterprise developers building personal projects. APIs like Crunchbase or Clearbit API access requires me talking to their Salse team, which didn't feel like it was worth the effort for a lightweight personal project. If you have good API suggesions for enriching the company data, please let me know!!
3. I'm using the GPT 4o model for this project primarily because it has the latest knowledge cut-off date (June 2024). I didn't play too around too much with configuring and trying the model, so please feel free to tinker around. Would be curious to see if other OpenAI, or even non-OpenAI models, would work better for this project!

## Potential Improvements

1. Performance Enhancements

   - Implement caching for filtered results
   - Optimize batch processing size

2. Feature Additions

   - Save filtering criteria for future use
   - Export filtered results to CSV
   - Add multiple filter criteria
   - Implement sorting functionality
   - Add connection statistics and visualizations

3. UI/UX Improvements

   - Add more detailed loading states
   - Implement error boundary handling
   - Add tooltips for better user guidance
   - Enhance mobile responsiveness

4. Technical Improvements
   - Add comprehensive test coverage
   - Implement rate limiting
   - Add user authentication
   - Improve error handling and recovery
   - Add logging and monitoring

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

I am still relatively new to web-app development, so if you have any feedback/comments/ideas, I would love to hear about them! My email is garys.casual.repo@gmail.com.
