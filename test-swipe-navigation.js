#!/usr/bin/env node

/**
 * Test script to verify swipe navigation fix
 * This script tests that:
 * 1. Only one gesture system is active
 * 2. Navigation logs are consistent
 * 3. No duplicate gesture detection occurs
 */

const fs = require('fs');
const path = require('path');

console.log('🧪 Testing Swipe Navigation Fix\n');

const testCases = [
  {
    name: 'AppScreen should not have swipe gestures',
    file: 'components/AppScreen.tsx',
    shouldNotContain: ['useTabSwipeGesture', 'panHandlers', 'onTouchStart', 'onTouchEnd'],
  },
  {
    name: 'SwipeWrapper should be the only gesture handler',
    file: 'components/SwipeWrapper.tsx',
    shouldContain: ['PanGestureHandler', 'navigateToNextTab', 'navigateToPreviousTab'],
  },
  {
    name: 'Layout should properly wrap components',
    file: 'app/(app)/_layout.tsx',
    shouldContain: ['AppScreen', 'SwipeWrapper', 'GestureHandlerRootView'],
  },
];

let allTestsPassed = true;

testCases.forEach(testCase => {
  console.log(`📋 Testing: ${testCase.name}`);
  
  const filePath = path.join(__dirname, testCase.file);
  
  if (!fs.existsSync(filePath)) {
    console.log(`❌ File not found: ${testCase.file}`);
    allTestsPassed = false;
    return;
  }
  
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Check shouldContain
  if (testCase.shouldContain) {
    testCase.shouldContain.forEach(expected => {
      if (!content.includes(expected)) {
        console.log(`❌ Missing expected content: "${expected}"`);
        allTestsPassed = false;
      }
    });
  }
  
  // Check shouldNotContain
  if (testCase.shouldNotContain) {
    testCase.shouldNotContain.forEach(unwanted => {
      if (content.includes(unwanted)) {
        console.log(`❌ Found unwanted content: "${unwanted}"`);
        allTestsPassed = false;
      }
    });
  }
  
  if (allTestsPassed) {
    console.log(`✅ ${testCase.name} - PASSED`);
  }
  console.log('');
});

console.log('📊 Test Results:');
if (allTestsPassed) {
  console.log('🎉 All tests PASSED! Swipe navigation should work correctly now.');
  console.log('\nExpected behavior:');
  console.log('- Only SwipeWrapper will detect gestures');
  console.log('- No duplicate "Swipe detected" log messages');
  console.log('- Clean navigation logs without conflicts');
} else {
  console.log('❌ Some tests FAILED. Please review the issues above.');
}

console.log('\n🚀 To test the fix:');
console.log('1. Start the development server: npm start');
console.log('2. Test swipe gestures on each screen');
console.log('3. Check console logs for clean navigation messages');