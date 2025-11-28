#!/bin/bash

# Safe Haven Africa - API Integration Test Script
# This script verifies all components are properly installed and configured

echo "🧪 Safe Haven Africa - API Integration Test Suite"
echo "=================================================="
echo ""

# Color codes
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Counter for tests
PASSED=0
FAILED=0

# Test function
test_command() {
    local test_name="$1"
    local command="$2"
    
    echo -n "Testing: $test_name ... "
    if eval "$command" > /dev/null 2>&1; then
        echo -e "${GREEN}✓ PASS${NC}"
        ((PASSED++))
    else
        echo -e "${RED}✗ FAIL${NC}"
        ((FAILED++))
    fi
}

# Test file existence
test_file() {
    local file_name="$1"
    local file_path="$2"
    
    echo -n "Checking: $file_name ... "
    if [ -f "$file_path" ]; then
        echo -e "${GREEN}✓ EXISTS${NC}"
        ((PASSED++))
    else
        echo -e "${RED}✗ MISSING${NC}"
        ((FAILED++))
    fi
}

# Section: Prerequisites
echo -e "${BLUE}═══════════════════════════════════════════${NC}"
echo -e "${BLUE}Section 1: Prerequisites${NC}"
echo -e "${BLUE}═══════════════════════════════════════════${NC}"
echo ""

test_command "Node.js installed" "node --version"
test_command "npm installed" "npm --version"

echo ""

# Section: Backend Files
echo -e "${BLUE}═══════════════════════════════════════════${NC}"
echo -e "${BLUE}Section 2: Backend Files${NC}"
echo -e "${BLUE}═══════════════════════════════════════════${NC}"
echo ""

test_file "server.js" "server/server.js"
test_file "User model" "server/models/User.js"
test_file "JournalEntry model" "server/models/JournalEntry.js"
test_file "CBTProgress model" "server/models/CBTProgress.js"
test_file "Auth controller" "server/controllers/authController.js"
test_file "Journal controller" "server/controllers/journalController.js"
test_file "CBT controller" "server/controllers/cbtController.js"
test_file "Auth middleware" "server/middleware/auth.js"
test_file "Auth routes" "server/routes/auth.js"
test_file "Journal routes" "server/routes/journal.js"
test_file "CBT routes" "server/routes/cbt.js"
test_file "Database config" "server/config/db.js"

echo ""

# Section: Frontend Files
echo -e "${BLUE}═══════════════════════════════════════════${NC}"
echo -e "${BLUE}Section 3: Frontend Files${NC}"
echo -e "${BLUE}═══════════════════════════════════════════${NC}"
echo ""

test_file "API service" "client/src/services/api.ts"
test_file "Auth context" "client/src/contexts/AuthContext.tsx"
test_file "useApi hook" "client/src/hooks/useApi.ts"
test_file "Journal page" "client/src/pages/Journal.tsx"
test_file "CBT Modules page" "client/src/pages/CBTModules.tsx"
test_file "CBT Exercise 1" "client/src/pages/CBTExercise1.tsx"
test_file "CBT Exercise 2" "client/src/pages/CBTExercise2.tsx"
test_file "CBT Exercise 3" "client/src/pages/CBTExercise3.tsx"
test_file "CBT Exercise 4" "client/src/pages/CBTExercise4.tsx"
test_file "CBT Exercise 5" "client/src/pages/CBTExercise5.tsx"

echo ""

# Section: Configuration Files
echo -e "${BLUE}═══════════════════════════════════════════${NC}"
echo -e "${BLUE}Section 4: Configuration Files${NC}"
echo -e "${BLUE}═══════════════════════════════════════════${NC}"
echo ""

test_file "Backend package.json" "server/package.json"
test_file "Frontend package.json" "client/package.json"

echo ""

# Section: Documentation Files
echo -e "${BLUE}═══════════════════════════════════════════${NC}"
echo -e "${BLUE}Section 5: Documentation Files${NC}"
echo -e "${BLUE}═══════════════════════════════════════════${NC}"
echo ""

test_file "Quick Start Guide" "QUICK_START_INTEGRATION.md"
test_file "API Integration Guide" "API_INTEGRATION_GUIDE.md"
test_file "API Integration Verification" "API_INTEGRATION_VERIFICATION.md"
test_file "API Testing Guide" "API_TESTING_GUIDE.md"
test_file "Integration Summary" "API_INTEGRATION_SUMMARY.md"

echo ""

# Section: Dependencies Check
echo -e "${BLUE}═══════════════════════════════════════════${NC}"
echo -e "${BLUE}Section 6: Dependencies Check${NC}"
echo -e "${BLUE}═══════════════════════════════════════════${NC}"
echo ""

echo -n "Checking: Backend dependencies installed ... "
if [ -d "server/node_modules" ]; then
    echo -e "${GREEN}✓ EXISTS${NC}"
    ((PASSED++))
else
    echo -e "${YELLOW}⚠ NOT INSTALLED (run: cd server && npm install)${NC}"
    ((FAILED++))
fi

echo -n "Checking: Frontend dependencies installed ... "
if [ -d "client/node_modules" ]; then
    echo -e "${GREEN}✓ EXISTS${NC}"
    ((PASSED++))
else
    echo -e "${YELLOW}⚠ NOT INSTALLED (run: cd client && npm install)${NC}"
    ((FAILED++))
fi

echo ""

# Section: Environment Variables
echo -e "${BLUE}═══════════════════════════════════════════${NC}"
echo -e "${BLUE}Section 7: Environment Variables${NC}"
echo -e "${BLUE}═══════════════════════════════════════════${NC}"
echo ""

echo -n "Checking: Backend .env file ... "
if [ -f "server/.env" ]; then
    echo -e "${GREEN}✓ EXISTS${NC}"
    ((PASSED++))
else
    echo -e "${YELLOW}⚠ MISSING (create with: PORT=5000, MONGODB_URI, JWT_SECRET)${NC}"
    ((FAILED++))
fi

echo -n "Checking: Frontend .env file ... "
if [ -f "client/.env" ]; then
    echo -e "${GREEN}✓ EXISTS${NC}"
    ((PASSED++))
else
    echo -e "${YELLOW}⚠ MISSING (create with: VITE_API_URL=http://localhost:5000/api)${NC}"
    ((FAILED++))
fi

echo ""

# Summary
echo -e "${BLUE}═══════════════════════════════════════════${NC}"
echo -e "${BLUE}Test Summary${NC}"
echo -e "${BLUE}═══════════════════════════════════════════${NC}"
echo ""
echo -e "Tests Passed: ${GREEN}$PASSED${NC}"
echo -e "Tests Failed: ${RED}$FAILED${NC}"
TOTAL=$((PASSED + FAILED))
echo "Total Tests: $TOTAL"
echo ""

if [ $FAILED -eq 0 ]; then
    echo -e "${GREEN}✓ All checks passed! Ready to run the application.${NC}"
    echo ""
    echo "Next steps:"
    echo "1. Start MongoDB: mongod"
    echo "2. Start backend: cd server && npm start"
    echo "3. Start frontend: cd client && npm run dev (in another terminal)"
    echo "4. Open browser: http://localhost:5173"
else
    echo -e "${YELLOW}⚠ Some checks failed. Please review the above output.${NC}"
fi

echo ""
echo "For more information, see:"
echo "  - QUICK_START_INTEGRATION.md"
echo "  - API_INTEGRATION_GUIDE.md"
echo ""
