
import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:3000/api';
let AUTH_TOKEN_A = '';
let AUTH_TOKEN_B = '';
let MANUSCRIPT_ID = '';

async function request(endpoint, method = 'GET', body = null, token = null) {
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers['Cookie'] = `token=${token}`;

    const response = await fetch(`${BASE_URL}${endpoint}`, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
    });

    const data = await response.json();
    const setCookie = response.headers.get('set-cookie');

    return { status: response.status, data, setCookie };
}

async function extractToken(setCookie) {
    if (!setCookie) return null;
    const match = setCookie.match(/token=([^;]+)/);
    return match ? match[1] : null;
}

async function main() {
    console.log('--- Starting Backend Verification ---');

    // 1. Signup User A (Author)
    const emailA = `author_${Date.now()}@test.com`;
    console.log(`\n1. Signing up Author (${emailA})...`);
    const signupA = await request('/auth/signup', 'POST', {
        email: emailA,
        password: 'password123',
        firstName: 'Alice',
        lastName: 'Author'
    });
    console.log('Status:', signupA.status); // Expect 201
    AUTH_TOKEN_A = await extractToken(signupA.setCookie);
    console.log('Token A acquired:', !!AUTH_TOKEN_A);

    if (!AUTH_TOKEN_A) {
        console.error("Failed to get token for User A. Aborting.");
        return;
    }

    // 2. Submit Manuscript (User A)
    console.log(`\n2. Submitting Manuscript as Author...`);
    const manuscriptRes = await request('/manuscripts', 'POST', {
        title: 'Test Manuscript ' + Date.now(),
        abstract: 'This is a test abstract.',
        fileUrl: 'http://example.com/file.pdf'
    }, AUTH_TOKEN_A);
    console.log('Status:', manuscriptRes.status); // Expect 201
    console.log('Manuscript:', manuscriptRes.data?.manuscript?.id);
    MANUSCRIPT_ID = manuscriptRes.data?.manuscript?.id;

    if (!MANUSCRIPT_ID) {
        console.error("Failed to create manuscript. Aborting.");
        return;
    }

    // 3. Get My Manuscripts (User A)
    console.log(`\n3. Fetching User A Manuscripts...`);
    const myManuscripts = await request('/manuscripts?filter=my', 'GET', null, AUTH_TOKEN_A);
    console.log('Status:', myManuscripts.status); // Expect 200
    console.log('Count:', myManuscripts.data?.manuscripts?.length);

    // 4. Signup User B (Reviewer)
    const emailB = `reviewer_${Date.now()}@test.com`;
    console.log(`\n4. Signing up Reviewer (${emailB})...`);
    const signupB = await request('/auth/signup', 'POST', {
        email: emailB,
        password: 'password123',
        firstName: 'Bob',
        lastName: 'Reviewer'
    });
    AUTH_TOKEN_B = await extractToken(signupB.setCookie);
    console.log('Token B acquired:', !!AUTH_TOKEN_B);

    // 5. Submit Review (User B)
    console.log(`\n5. Submitting Review as User B...`);
    const reviewRes = await request('/reviews', 'POST', {
        manuscriptId: MANUSCRIPT_ID,
        content: 'This is a very good paper. I accept it.',
        decision: 'ACCEPT'
    }, AUTH_TOKEN_B);
    console.log('Status:', reviewRes.status); // Expect 201
    console.log('Review:', reviewRes.data?.review?.id);

    // 6. Get Pending Reviews (User B) - actually submitted reviews for now
    console.log(`\n6. Fetching User B Reviews...`);
    const myReviews = await request('/reviews/pending', 'GET', null, AUTH_TOKEN_B);
    console.log('Status:', myReviews.status); // Expect 200
    console.log('Count:', myReviews.data?.submittedReviews?.length);

    console.log('\n--- Verification Complete ---');
}

main().catch(console.error);
