async function searchProfile() {
    const username = document.getElementById('username').value;
    const profileInfoDiv = document.getElementById('profile-info');
  
    if (username.trim() === '') {
      profileInfoDiv.innerHTML = 'Please enter a username.';
      return;
    }
  
    const url = `https://api.github.com/users/${username}`;
  
    try {
      const response = await axios.get(url);
      const user = response.data;
  
      profileInfoDiv.innerHTML = `
        <p><strong>Username:</strong> ${user.login}</p>
        <p><strong>Name:</strong> ${user.name}</p>
        <p><strong>Bio:</strong> ${user.bio}</p>
        <p><strong>Location:</strong> ${user.location}</p>
        <p><strong>Followers:</strong> ${user.followers}</p>
        <p><strong>Following:</strong> ${user.following}</p>
        <p><strong>Public Repos:</strong> ${user.public_repos}</p>
        <p><strong>Profile URL:</strong> <a href="${user.html_url}" target="_blank">${user.html_url}</a></p>
      `;
    } catch (error) {
      profileInfoDiv.innerHTML = 'Error fetching GitHub profile.';
    }
  }
  