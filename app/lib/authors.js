export const authors = {
    'amir-al-farouqi': {
      name: 'Amir Al-Farouqi',
      title: 'Chief Threat Researcher, BTMSecurity',
      bio: 'Experienced in adversarial AI research. Contributed to MITRE ATT&CK framework. Developed patented algorithms for behavioral anomaly detection used by Fortune 500 companies.',
      image: '/img/amir.jpg'
    },
    'sarah-connor': {
      name: 'Sarah Connor',
      title: 'Senior Security Analyst, BTMSecurity',
      bio: 'Specializes in network security and intrusion detection. Certified ethical hacker with 10+ years of experience in corporate security.',
      image: '/img/sarah.jpg'
    },
    'david-chen': {
      name: 'David Chen',
      title: 'AI Security Specialist, BTMSecurity',
      bio: 'Focuses on machine learning security and adversarial attacks. PhD in Computer Science from Stanford University.',
      image: '/img/david.jpg'
    }
  }
  
  export function getAuthor(slug) {
    return authors[slug] || authors['amir-al-farouqi'] // Default author
  }
  
  export function getAllAuthors() {
    return Object.keys(authors)
  }