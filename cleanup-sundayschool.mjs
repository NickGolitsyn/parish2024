/**
 * Quick script to delete old Sunday School documents
 * 
 * Usage:
 * 1. Make sure you have SANITY_API_TOKEN in your .env.local file
 *    (You can create a token at: https://www.sanity.io/manage)
 * 2. Run: node cleanup-sundayschool.mjs
 * 
 * Or set environment variables directly:
 * NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
 * NEXT_PUBLIC_SANITY_DATASET=production
 * SANITY_API_TOKEN=your-token
 */

import { createClient } from '@sanity/client';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN, // You need to add this to .env
  apiVersion: '2024-01-01',
});

async function cleanup() {
  try {
    // Fetch all Sunday School documents
    const allDocs = await client.fetch(`*[_type == "sundayschool"]`);
    
    console.log(`Found ${allDocs.length} Sunday School document(s)`);
    
    // Filter out the singleton (which has _id === "sundayschool")
    const oldDocs = allDocs.filter(doc => doc._id !== 'sundayschool');
    
    if (oldDocs.length === 0) {
      console.log('✅ No old documents to delete. All clean!');
      return;
    }
    
    console.log(`\nFound ${oldDocs.length} old document(s) to delete:`);
    oldDocs.forEach(doc => {
      console.log(`  - ${doc._id}${doc.title?.en ? ` (${doc.title.en})` : ''}`);
    });
    
    // Delete old documents
    const transaction = client.transaction();
    oldDocs.forEach(doc => {
      transaction.delete(doc._id);
    });
    
    await transaction.commit();
    
    console.log(`\n✅ Successfully deleted ${oldDocs.length} old document(s)`);
    console.log('The singleton document (_id: "sundayschool") is safe and unchanged.');
  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.message.includes('token')) {
      console.error('\n💡 Tip: Make sure you have SANITY_API_TOKEN in your .env file');
      console.error('   You can create a token at: https://www.sanity.io/manage');
    }
    process.exit(1);
  }
}

cleanup();
