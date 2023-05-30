const axios = require('axios');
exports.fetchData=fetchData;
exports.Gitpush=Gitpush;

var fileData,headers;
async function fetchData(token, owner, repo, filePath)
{
  try {
    // Authenticate
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    this.headers=headers;
    // Retrieve the current file
    const url = `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`;
    const response = await axios.get(url, { headers });
    const fileData = response.data;
    this.fileData=fileData;
    
    // Modify the content
    const fileContent = Buffer.from(fileData.content, 'base64').toString('utf-8');
    return fileContent;

  }catch (error) {
    console.error('Error updating file:', error.response.data);
  }
}


async function Gitpush(owner, repo, filePath, updatedContent) {
  try {
    // Create a new commit
    headers=this.headers;
    const branch = 'main';
    const commitMessage = 'Update file';
    const newCommit = {
      message: commitMessage,
      content: Buffer.from(updatedContent).toString('base64'),
      sha: this.fileData.sha,
      branch: branch,
      force: true
    };
   
    // Push the commit
    const createCommitUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`;
    await axios.put(createCommitUrl, newCommit, { headers });
    
    console.log('File updated successfully!');
  } catch (error) {
   console.error('Error updating file:', error.response.data);
  }
}

