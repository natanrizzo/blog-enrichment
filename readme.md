# Web Scraper with AI Resume

This is a web scraper focused primarily on scraping WordPress blogs. It also supports scraping other types of blogs and includes a feature to generate AI-based summaries of the content collected by the scraper.

## Features

- Scrape WordPress blogs and other blog types.
- Generate AI summaries of the scraped content.
- CLI interface for selecting blogs from the database to scrape.
- Flexible scraping configuration to support multiple blog platforms.

## Installation

Clone the repository:
``` bash
git clone
```
Navigate to the project directory:
``` bash
cd
```
Install the dependencies:
``` bash
npm install
```
## Configuration

Before running the scraper, ensure you have configured the necessary database and AI settings in the environment.

- **Database:** Set up the database and configure the `DATABASE_URL` in the `.env` file.
- **Port:** You can add a diferent port for the backend configuring `PORT` in the `.env` or use the default.
- **AI:** Ensure you have API keys for AI models like OpenAI or Deepseek. **(DEEPSEEK_KEY, DEEPSEEK_KEY)**

## Scripts

Here are the available commands you can run:

- `npm run dev`: Starts the application in development mode.
- `npm run build`: Builds the application for production.
- `npm run scraper`: Runs the web scraper. The CLI interface will allow you to select blogs from the database.
- `npm run start`: Starts the application in production mode (after building it).
- `npm run migrate`: Runs Prisma migrations to update the database schema.
- `npm run studio`: Opens Prisma Studio for managing the database.

## Running the Scraper

To run the scraper:

Use the following command to start the scraper process:
``` bash
npm run scraper
```
The CLI interface will prompt you to select the blogs from the database that you want to scrape.

The scraper will then start scraping the selected blogs. If AI resume generation is enabled, it will also generate a summary of the scraped content.

## AI Resume Feature

The AI resume feature is designed to summarize the content collected from the scraped blogs. It uses AI models to process and generate brief summaries of the content, which can be useful for quick overviews or analysis.

**Supported AI Models:**

- OpenAI
- DeepSeek AI

You can choose the AI model from the available options during the scraping process, or integrate it into the scraping flow.

## Database Schema

The scraper interacts with a PostgreSQL database and uses Prisma for managing database migrations and interactions. The database schema is configured to handle different types of blogs and store the necessary information related to the scraped content.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
