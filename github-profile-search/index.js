const axios = require('axios');
const readline = require('readline');

// Setup readline to take input from the user
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Function to search GitHub user profile
async function searchGitHubProfile(username) {
  const url = `https://api.github.com/users/${username}`;
  
  try {
    const response = await axios.get(url);
    const user = response.data;

    console.log(`Username: ${user.login}`);
    console.log(`Name: ${user.name}`);
    console.log(`Bio: ${user.bio}`);
    console.log(`Location: ${user.location}`);
    console.log(`Followers: ${user.followers}`);
    console.log(`Following: ${user.following}`);
    console.log(`Public Repos: ${user.public_repos}`);
    console.log(`Profile URL: ${user.html_url}`);
  } catch (error) {
    console.error('Error fetching GitHub profile:', error.message);
  }
}

// Ask the user for a GitHub username
rl.question('Enter GitHub username to search: ', (username) => {
  searchGitHubProfile(username);
  rl.close();
});
