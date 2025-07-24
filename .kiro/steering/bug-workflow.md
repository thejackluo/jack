# Comprehensive Bug Investigation Workflow

## Core Principles for Bug Resolution

When encountering any bug during development, follow this comprehensive approach:

### 1. Deep Research First
- **Always use Brave Search** to research similar issues, solutions, and best practices
- Search for error messages, technology combinations, and known issues
- Look for official documentation, GitHub issues, Stack Overflow discussions
- Research the specific technology stack components involved

### 2. First Principles Analysis
- Break down the problem to its fundamental components
- Understand what each part of the system is supposed to do
- Identify where the actual behavior diverges from expected behavior
- Question assumptions about how things should work

### 3. Root Cause Analysis (5 Whys)
- Don't just fix symptoms - find the underlying cause
- Ask "why" at least 5 times to get to the root
- Document the entire reasoning chain
- Consider multiple potential root causes

### 4. Comprehensive Documentation
- Create individual bug files for each issue
- Document the entire investigation process
- Include all research findings and sources
- Capture lessons learned for future reference

## Bug Investigation Process

### Step 1: Initial Assessment and Research
```markdown
## Bug Investigation: [Brief Description]

### Initial Observation
- **What happened**: [Exact error or unexpected behavior]
- **When it happens**: [Conditions that trigger the issue]
- **Environment**: [Development/staging/production, OS, versions]

### Immediate Research
**Brave Search Queries Used**:
1. "[exact error message]"
2. "[technology stack] + [error type]"
3. "[specific component] troubleshooting"

**Key Findings from Research**:
- [Source 1]: [Key insight or solution approach]
- [Source 2]: [Alternative approach or related issue]
- [Source 3]: [Best practices or prevention methods]
```

### Step 2: Deep Technical Analysis
```markdown
### Technical Investigation

#### System State Analysis
- **Configuration**: [Relevant config files and settings]
- **Dependencies**: [Package versions, system requirements]
- **Environment Variables**: [Relevant env vars and their values]
- **File System**: [Permissions, paths, file existence]

#### Code Analysis
- **Entry Point**: [Where the issue manifests]
- **Call Stack**: [Trace of function calls leading to issue]
- **Data Flow**: [How data moves through the system]
- **State Changes**: [What changes between working and broken states]
```

### Step 3: Hypothesis Formation and Testing
```markdown
### Hypothesis Testing

#### Primary Hypothesis
**Theory**: [Most likely cause based on research and analysis]
**Evidence Supporting**: [What points to this being the cause]
**Test Approach**: [How to validate this hypothesis]
**Test Results**: [What happened when tested]

#### Alternative Hypotheses
1. **Theory**: [Second most likely cause]
   - **Test**: [How to check this]
   - **Result**: [Outcome]

2. **Theory**: [Third possibility]
   - **Test**: [How to check this]
   - **Result**: [Outcome]
```

### Step 4: Root Cause Analysis
```markdown
### 5 Whys Analysis

1. **Why did the error occur?** [Direct cause]
2. **Why did that happen?** [Underlying cause]
3. **Why did that condition exist?** [System cause]
4. **Why wasn't this prevented?** [Process cause]
5. **Why don't we have safeguards?** [Root organizational cause]

### Root Cause Determination
**Primary Root Cause**: [The fundamental issue]
**Contributing Factors**: [Other elements that made this possible]
**System Weaknesses Exposed**: [What this reveals about our system]
```

### Step 5: Solution Development
```markdown
### Solution Strategy

#### Research-Based Solutions
**Best Practices Found**: [Industry standard approaches]
**Recommended Solutions**: [What experts suggest]
**Alternative Approaches**: [Different ways to solve this]

#### Selected Solution
**Approach**: [Chosen solution method]
**Reasoning**: [Why this approach over others]
**Implementation Steps**: [Detailed steps to implement]
**Validation Plan**: [How to verify the fix works]

#### Prevention Measures
**Immediate**: [Quick fixes to prevent recurrence]
**Short-term**: [Process improvements]
**Long-term**: [Architectural or systematic changes]
```

## Research Guidelines

### Effective Brave Search Strategies

#### Search Query Patterns
1. **Exact Error Messages**: Use quotes for exact error text
2. **Technology Combinations**: "[framework] + [tool] + [issue type]"
3. **Solution-Focused**: "how to fix [specific problem]"
4. **Best Practices**: "[technology] best practices [context]"
5. **Troubleshooting**: "[tool] troubleshooting guide"

#### Source Prioritization
1. **Official Documentation**: Framework/tool official docs
2. **GitHub Issues**: Especially closed issues with solutions
3. **Stack Overflow**: High-voted answers with explanations
4. **Technical Blogs**: From reputable sources and maintainers
5. **Community Forums**: Framework-specific communities

#### Research Documentation
```markdown
### Research Summary

#### Search Queries and Results
1. **Query**: "[exact search terms]"
   - **Source**: [URL or reference]
   - **Key Finding**: [Main insight]
   - **Relevance**: [How this applies to our issue]

2. **Query**: "[second search]"
   - **Source**: [URL or reference]
   - **Key Finding**: [Main insight]
   - **Relevance**: [How this applies to our issue]

#### Synthesis of Findings
**Common Themes**: [Patterns across multiple sources]
**Conflicting Information**: [Where sources disagree]
**Best Practices Identified**: [Recommended approaches]
**Warnings and Gotchas**: [Things to avoid]
```

## Bug File Organization

### File Naming Convention
- **Format**: `BUG-YYYY-MM-DD-XXX-brief-description.md`
- **Location**: `.kiro/specs/equity-research-copilot/bugs/`
- **Example**: `BUG-2025-01-23-001-npm-dev-turbo-compilation.md`

### Bug File Template
```markdown
# Bug Report: [Descriptive Title]

## Bug Information
- **ID**: BUG-YYYY-MM-DD-XXX
- **Date**: YYYY-MM-DD HH:MM
- **Severity**: [Critical/High/Medium/Low]
- **Category**: [Build/Runtime/Configuration/Integration]
- **Status**: [New/Investigating/In Progress/Testing/Resolved]
- **Environment**: [Development/Staging/Production]

## Problem Description
### Summary
[Clear description of what's wrong]

### Expected Behavior
[What should happen]

### Actual Behavior
[What actually happens]

### Reproduction Steps
1. [Step 1]
2. [Step 2]
3. [Result]

---

## Investigation Log

[Use the investigation process template above]

---

## Resolution

### Final Solution
[What ultimately fixed the issue]

### Implementation Details
[Specific changes made]

### Validation
[How the fix was verified]

### Prevention Measures
[What was put in place to prevent recurrence]

### Lessons Learned
[Key insights for future reference]
```

## Integration with Development Workflow

### When to Create Bug Files
- Any error that takes more than 15 minutes to resolve
- Recurring issues, even if previously "fixed"
- Configuration or setup problems
- Integration failures between components
- Performance issues or unexpected behavior

### Commit Message Integration
When fixing bugs, reference the bug file:
```
fix(component): resolve [issue description] (refs BUG-YYYY-MM-DD-XXX)

- [Brief description of fix]
- [Key changes made]
- See BUG-YYYY-MM-DD-XXX.md for full investigation details
```

### Knowledge Building
- Update relevant documentation with insights
- Add troubleshooting sections to README files
- Create prevention checklists for common issues
- Share findings with team through appropriate channels

This comprehensive approach ensures that every bug becomes a learning opportunity and contributes to the overall robustness and maintainability of the ERA system.