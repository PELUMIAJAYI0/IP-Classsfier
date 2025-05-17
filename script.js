// script.js

document.getElementById('check-btn').addEventListener('click', () => {
  const ip = document.getElementById('ip-input').value.trim();
  const resultsSection = document.getElementById('results');

  if (!isValidIP(ip)) {
    alert("Please enter a valid IPv4 address.");
    resultsSection.classList.add('hidden');
    return;
  }

  const ipClass = getClass(ip);
  const ipType = isPrivate(ip) ? 'Private' : 'Public';
  const ipRange = getRange(ipClass);
  const ipBinary = toBinary(ip);

  document.getElementById('ip-class').textContent = ipClass;
  document.getElementById('ip-type').textContent = ipType;
  document.getElementById('ip-range').textContent = ipRange;
  document.getElementById('ip-binary').textContent = ipBinary;

  resultsSection.classList.remove('hidden');
});

function isValidIP(ip) {
  const pattern = /^(\d{1,3}\.){3}\d{1,3}$/;
  if (!pattern.test(ip)) return false;

  return ip.split('.').every(part => {
    const n = parseInt(part);
    return n >= 0 && n <= 255;
  });
}

function getClass(ip) {
  const first = parseInt(ip.split('.')[0]);
  if (first >= 1 && first <= 126) return 'Class A';
  if (first >= 128 && first <= 191) return 'Class B';
  if (first >= 192 && first <= 223) return 'Class C';
  if (first >= 224 && first <= 239) return 'Class D (Multicast)';
  if (first >= 240 && first <= 255) return 'Class E (Experimental)';
  return 'Unknown';
}

function isPrivate(ip) {
  const [a, b] = ip.split('.').map(Number);
  if (a === 10) return true;
  if (a === 172 && b >= 16 && b <= 31) return true;
  if (a === 192 && b === 168) return true;
  return false;
}

function getRange(ipClass) {
  switch (ipClass) {
    case 'Class A': return '1.0.0.0 – 126.255.255.255';
    case 'Class B': return '128.0.0.0 – 191.255.255.255';
    case 'Class C': return '192.0.0.0 – 223.255.255.255';
    case 'Class D (Multicast)': return '224.0.0.0 – 239.255.255.255';
    case 'Class E (Experimental)': return '240.0.0.0 – 255.255.255.255';
    default: return 'Unknown';
  }
}

function toBinary(ip) {
  return ip.split('.')
    .map(octet => parseInt(octet).toString(2).padStart(8, '0'))
    .join('.');
}


// Dark Mode Toggle
const themeSwitch = document.getElementById('theme-switch');
themeSwitch.addEventListener('change', () => {
  document.body.classList.toggle('light');
  localStorage.setItem('theme', document.body.classList.contains('light') ? 'light' : 'dark');
});

// Load theme on page load
window.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('theme');
  if (saved === 'light') {
    document.body.classList.add('light');
    document.getElementById('theme-switch').checked = true;
  }
});

// Copy-to-clipboard functionality
document.querySelectorAll('.copy-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const targetId = btn.getAttribute('data-target');
    const text = document.getElementById(targetId).textContent;
    navigator.clipboard.writeText(text).then(() => {
      btn.textContent = '✅ Copied!';
      setTimeout(() => btn.textContent = '📋 Copy', 2000);
    });
  });
});
