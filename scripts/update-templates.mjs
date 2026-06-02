/**
 * Axon Gallery Sync Script (Concept)
 * This script fetches all repositories from the Ex2-Axon organization
 * and generates the TEMPLATES_DATA for App.tsx.
 */

const ORG = 'Ex2-Axon';
const REPO_PREFIX = 'x-template-';

async function syncTemplates() {
  console.log(`🔍 Scanning organization: ${ORG} for ${REPO_PREFIX}* repositories...`);
  
  try {
    // In a real GitHub Action, we would use GITHUB_TOKEN
    const response = await fetch(`https://api.github.com/orgs/${ORG}/repos?per_page=100&sort=created&direction=desc`);
    
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.statusText}`);
    }
    
    const repos = await response.json();
    
    const templates = repos
      .filter(repo => repo.name.startsWith(REPO_PREFIX))
      .map(repo => ({
        id: repo.name,
        title: `${repo.name}: ${repo.description || 'New Template'}`,
        category: 'Special', // Default category
        tags: repo.topics || ['Automated'],
        description: repo.description || 'เทมเพลตที่สร้างขึ้นโดยอัตโนมัติจากระบบ Axon Engine',
        demoUrl: `https://${ORG.toLowerCase()}.github.io/${repo.name}/`,
        imageUrl: `https://raw.githubusercontent.com/${ORG}/${repo.name}/main/.github/screenshots/latest.png`,
        difficulty: 'Intermediate',
        techStack: ['HTML', 'Tailwind CSS']
      }));

    console.log(`✅ Found ${templates.length} templates.`);
    console.log('--- GENERATED CODE FOR App.tsx ---');
    console.log(JSON.stringify(templates, null, 2));
    
  } catch (error) {
    console.error('❌ Sync failed:', error.message);
  }
}

syncTemplates();
