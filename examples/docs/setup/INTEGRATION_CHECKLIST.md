# Integration Checklist

Use this checklist to verify the paper_mind_graph integration is working correctly.

## ✅ Pre-flight Checklist

### 1. Database Setup
- [ ] Migration applied successfully
  ```bash
  npx supabase db push
  # Should show: Applied migration 20251212000000_add_paper_analysis.sql
  ```
- [ ] Check table exists in Supabase dashboard
  - Navigate to Table Editor
  - Look for `paper_analysis` table
  - Verify columns exist (analysis_data, markdown_summary, etc.)

### 2. Backend Dependencies
- [ ] Python packages installed
  ```bash
  pip list | grep fastapi  # Should show fastapi
  pip list | grep uvicorn  # Should show uvicorn
  pip list | grep supabase # Should show supabase
  ```
- [ ] paper_mind_graph dependencies installed
  ```bash
  pip list | grep smolagents # Should show smolagents
  pip list | grep litellm    # Should show litellm
  ```

### 3. Frontend Dependencies
- [ ] React packages installed
  ```bash
  npm list react-mermaid2  # Should be installed
  npm list mermaid         # Should be installed
  ```

### 4. Environment Configuration
- [ ] `.env` file has required variables
  ```bash
  grep OLLAMA_API_BASE .env  # Should return a value
  grep OLLAMA_MODEL .env     # Should return a value
  ```
- [ ] Ollama is running (if using local LLM)
  ```bash
  curl http://localhost:11434  # Should return Ollama response
  ```

---

## 🚀 Startup Checklist

### 1. Start API Server
- [ ] API starts without errors
  ```bash
  ./start_paper_analysis_api.sh
  ```
- [ ] API responds to health check
  ```bash
  curl http://localhost:8001
  # Should return: {"status":"ok","message":"Paper Analysis API is running"}
  ```

### 2. Start Frontend
- [ ] Vite dev server running
  ```bash
  npm run dev
  # Should be running on http://localhost:5173
  ```
- [ ] No TypeScript errors in console
  - Check browser console
  - Should not have import errors for new components

---

## 🧪 Functional Testing

### Test 1: Paper Analysis UI Appears
- [ ] Navigate to a paper in a community
- [ ] Click on the paper to open detail view
- [ ] See "AI Analysis" tab between "Details" and "Discussion"
- [ ] Tab is clickable and switches content

### Test 2: Session Analysis Button Appears
- [ ] Navigate to a session
- [ ] Open session detail view
- [ ] See "Paper Analysis" button in header (purple)
- [ ] Button is clickable

### Test 3: Analyze a Paper (End-to-End)
- [ ] Open a paper with valid arxiv_id
- [ ] Click "AI Analysis" tab
- [ ] See "Analyze Paper" button
- [ ] Click "Analyze Paper"
- [ ] See "Processing..." message
- [ ] Wait 2-5 minutes
- [ ] Page auto-updates with analysis
- [ ] Can see:
  - [ ] Statistics (concepts count, methods count, etc.)
  - [ ] Summary tab with markdown content
  - [ ] Mind Map tab with diagram
  - [ ] Flowchart tab with diagram
  - [ ] Concepts tab with list
  - [ ] Methods tab with list
  - [ ] Experiments tab with list
  - [ ] Interactive Graph tab
  - [ ] Q&A tab with input field

### Test 4: Ask a Question
- [ ] With analyzed paper, go to Q&A tab
- [ ] Type question: "What are the main contributions?"
- [ ] Click "Ask" button
- [ ] See answer appear within a few seconds
- [ ] Answer includes relevant sections/figures/tables

### Test 5: Session Analysis
- [ ] Open session with multiple papers
- [ ] Click "Paper Analysis" button
- [ ] See session analysis view
- [ ] Click "Analyze All Papers"
- [ ] See processing status
- [ ] Wait for completion
- [ ] See:
  - [ ] Aggregate statistics
  - [ ] Combined insights section
  - [ ] Individual paper list
  - [ ] Can expand individual papers

### Test 6: Download Functionality
- [ ] In paper analysis view
- [ ] Click "JSON" download button
- [ ] File downloads successfully
- [ ] Click "Markdown" download button
- [ ] File downloads successfully
- [ ] Files contain valid data

---

## 🔍 Database Verification

### Check Analysis Stored
```sql
-- Run in Supabase SQL editor
SELECT
  id,
  paper_id,
  concepts_count,
  methods_count,
  experiments_count,
  created_at
FROM paper_analysis
ORDER BY created_at DESC
LIMIT 5;
```
- [ ] Returns rows after analysis completes
- [ ] Counts match what's shown in UI
- [ ] JSON data is valid (check analysis_data column)

### Check RLS Policies
```sql
-- Verify policies exist
SELECT policyname, cmd
FROM pg_policies
WHERE tablename = 'paper_analysis';
```
- [ ] Returns policies for SELECT, INSERT, UPDATE, DELETE
- [ ] Each policy has appropriate conditions

---

## 🐛 Troubleshooting Checks

### If Analysis Fails
- [ ] Check API logs for errors
  - Look at terminal where API is running
  - Check for Python errors
- [ ] Verify paper has arxiv_id or pdf_url
  ```sql
  SELECT id, title, arxiv_id, pdf_url
  FROM papers
  WHERE id = 'YOUR_PAPER_ID';
  ```
- [ ] Check Ollama is responding
  ```bash
  curl http://localhost:11434/api/tags
  # Should list available models
  ```
- [ ] Verify environment variables
  ```bash
  cat .env | grep VITE_SUPABASE_URL  # Should match your Supabase URL
  ```

### If UI Components Don't Show
- [ ] Check browser console for errors
- [ ] Verify imports are correct
  - SessionAnalysisView imported in SessionDetailView.tsx
  - PaperAnalysisView imported in CommunityPaperDetailView.tsx
- [ ] Clear browser cache and reload
- [ ] Restart Vite dev server

### If Mermaid Diagrams Don't Render
- [ ] Check npm packages installed
  ```bash
  npm list | grep mermaid
  ```
- [ ] Check browser console for Mermaid errors
- [ ] Verify Mermaid syntax in generated diagrams
  - Download markdown and check diagram syntax

---

## 📊 Performance Checks

### API Response Times
- [ ] Health check: < 100ms
  ```bash
  time curl http://localhost:8001
  ```
- [ ] Get existing analysis: < 500ms
  ```bash
  time curl http://localhost:8001/analysis/YOUR_ANALYSIS_ID
  ```

### Analysis Processing
- [ ] Short paper (5-10 pages): 2-3 minutes
- [ ] Medium paper (10-15 pages): 3-5 minutes
- [ ] Long paper (20+ pages): 5-10 minutes

### UI Responsiveness
- [ ] Clicking "Analyze" doesn't freeze UI
- [ ] Can navigate away during processing
- [ ] Polling updates UI automatically
- [ ] Tab switching is instant

---

## 🎯 User Acceptance Testing

### Scenario 1: First-time User
- [ ] User can find the analysis feature without help
- [ ] Analysis button is clearly visible
- [ ] Loading states are informative
- [ ] Results are easy to understand
- [ ] Visualizations load properly

### Scenario 2: Power User
- [ ] Can analyze multiple papers quickly
- [ ] Session analysis works for 5+ papers
- [ ] Can download results for offline use
- [ ] Q&A provides useful answers
- [ ] Navigation between tabs is smooth

### Scenario 3: Presenter Prep
- [ ] Can analyze all session papers at once
- [ ] Combined insights are valuable
- [ ] Individual paper details are accessible
- [ ] Can ask questions to prepare
- [ ] Can export for presentation

---

## 📝 Final Verification

### Code Quality
- [ ] No TypeScript errors
  ```bash
  npm run build  # Should complete without errors
  ```
- [ ] No console warnings in browser
- [ ] Components render without errors
- [ ] All imports resolve correctly

### Security
- [ ] RLS policies working (can only see own/community analyses)
- [ ] API requires authentication (in production)
- [ ] No sensitive data in client-side code
- [ ] CORS properly configured

### Documentation
- [ ] README files are clear
- [ ] API endpoints documented
- [ ] Setup instructions work
- [ ] Troubleshooting guide is helpful

---

## ✅ Sign-off

When all items above are checked:
- ✅ Integration is complete
- ✅ System is ready for production
- ✅ Users can analyze papers
- ✅ Documentation is available

**Date Completed**: _______________

**Tested By**: _______________

**Notes**: _______________

---

## 🆘 Quick Help

### Most Common Issues

**"API won't start"**
→ Check Python dependencies, verify .env file

**"Analysis stuck"**
→ Check API logs, verify Ollama running

**"Diagrams not showing"**
→ Install mermaid: `npm install react-mermaid2 mermaid`

**"Can't see analysis"**
→ Check RLS policies, verify user is member of community

**"TypeScript errors"**
→ Restart TypeScript server, check imports

---

For detailed help, see:
- `PAPER_ANALYSIS_QUICK_START.md`
- `PAPER_MIND_GRAPH_INTEGRATION.md`
- `paper_mind_graph/README.md`
