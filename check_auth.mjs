import { readFileSync } from 'fs';

const authFile = 'tests/fixtures/shiksha_auth.json';
const authState = JSON.parse(readFileSync(authFile, 'utf-8'));

const now = Date.now() / 1000;
const authCookies = authState.cookies.filter(c =>
    ['user', 'refreshToken', 'user_session_data'].includes(c.name)
);

console.log('\n--- Auth Cookie Status ---');
for (const cookie of authCookies) {
    const expiresInDays = cookie.expires > 0
        ? Math.round((cookie.expires - now) / 86400)
        : 'session';
    const status = cookie.expires > 0 && cookie.expires < now ? 'EXPIRED ❌' : 'VALID ✅';
    console.log(`  ${cookie.name}: ${status} (expires in ${expiresInDays} days)`);
}

const userCookie = authState.cookies.find(c => c.name === 'user');
if (userCookie) {
    const decoded = decodeURIComponent(userCookie.value).substring(0, 150);
    console.log('\n--- User Cookie (first 150 chars) ---');
    console.log(' ', decoded);
    console.log('\n Session is saved and contains user identity data.');
} else {
    console.log('\n No "user" cookie found — session may not be authenticated.');
}

console.log(`\nTotal cookies saved: ${authState.cookies.length}`);
console.log(`Origins saved: ${authState.origins?.length ?? 0}\n`);
