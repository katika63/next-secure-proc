export const blogPosts = {
    'ai-cyber-threats': {
      title: 'The Rise of AI-Powered Cyberattacks',
      slug: 'ai-cyber-threats',
      category: 'Threat Intelligence',
      date: 'May 22, 2025',
      authorSlug: 'amir-al-farouqi',
      excerpt: 'The cybersecurity landscape is undergoing a seismic shift as artificial intelligence becomes weaponized.',
      image: '/img/ai-cyber-attacks.jpg',
      imageAlt: 'AI Cybersecurity',
      content: {
        intro: 'The cybersecurity landscape is undergoing a seismic shift as artificial intelligence becomes weaponized by threat actors. Our latest threat intelligence reports show a 300% increase in AI-powered attacks since Q1 2024, requiring fundamentally new defense paradigms.',
        sections: [
          {
            type: 'text',
            title: 'The New AI Attack Toolkit',
            content: 'Dark web markets now offer specialized AI tools that lower the barrier to entry for cybercriminals:'
          },
          {
            type: 'cards',
            items: [
              {
                icon: 'fas fa-language',
                title: 'Polyglot Phishing',
                description: 'AI-generated emails that adapt linguistic patterns to match the recipient\'s communication style with 98% accuracy.'
              },
              {
                icon: 'fas fa-code',
                title: 'Polymorphic Malware',
                description: 'Self-modifying code that changes its signature faster than traditional AV can update definitions.'
              },
              {
                icon: 'fas fa-fingerprint',
                title: 'Behavioral Spoofing',
                description: 'AI that learns normal user patterns to bypass anomaly detection systems.'
              }
            ]
          },
          {
            type: 'quote',
            quote: 'We intercepted a campaign where AI-generated voice clones successfully bypassed voice authentication systems at three major banks. The attackers trained the models using just 30 seconds of publicly available CEO interview footage.',
            author: 'BTM Threat Intelligence Team'
          },
          // More sections can be added here
        ]
      }
    },
    'zero-day-exploits': {
      title: 'Understanding Zero-Day Exploits in 2025',
      slug: 'zero-day-exploits',
      category: 'Vulnerability Research',
      date: 'April 15, 2025',
      authorSlug: 'sarah-connor',
      excerpt: 'An in-depth analysis of the latest zero-day vulnerabilities and exploitation techniques.',
      image: '/img/zero-day.jpg',
      imageAlt: 'Zero Day Exploit',
      content: {
        intro: 'Zero-day vulnerabilities continue to pose significant threats to organizations worldwide. In 2025, we\'ve observed a 45% increase in sophisticated zero-day attacks targeting critical infrastructure.',
        sections: [
          // Content sections for this post
        ]
      }
    }
  }
  
  export function getBlogPost(slug) {
    return blogPosts[slug] || blogPosts['ai-cyber-threats'] // Default to first post
  }
  
  export function getAllBlogSlugs() {
    return Object.keys(blogPosts)
  }