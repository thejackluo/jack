# Jack Portfolio Website Development Rules Summary

## Overview

This document provides a comprehensive summary of all development rules, standards, and processes for Jack Luo's portfolio website migration project. It serves as a quick reference for developers and AI agents working on the Next.js portfolio website.

**Important**: Agents should use contextual sections of the steering documents based on their current task. Not all rules need to be applied simultaneously - select relevant guidelines based on the specific work being performed.

## Core Development Principles

### 1. Chain of Thought First
- **All decisions** must include visible reasoning processes
- **Complex problems** require documented analysis chains
- **Alternative approaches** must be considered and documented
- **Learning capture** is mandatory for knowledge building

### 2. Quality Over Speed
- **Comprehensive testing** is required for all code
- **Code reviews** are mandatory for all changes
- **Documentation** must be updated with all changes
- **Security considerations** must be evaluated

### 3. Transparency and Traceability
- **All changes** must be tracked in the changelog
- **Bug reports** require root cause analysis
- **Task progress** must be documented with reasoning
- **Decision records** must capture the why, not just the what

## Quick Reference Rules

### Git Commit Standards
```
<type>[scope]: <description>

Types: feat, fix, docs, style, refactor, perf, test, build, ci, chore, revert
Scope: Optional component (hero, nav, about, blog, etc.)
Description: Imperative mood, <50 chars, no period
```

### Code Quality Requirements
- ✅ TypeScript strict mode (no `any` types)
- ✅ >90% test coverage for critical components (using Jest)
- ✅ ESLint and Prettier compliance
- ✅ Basic security practices (not production-level)
- ✅ Performance optimization for Vercel deployment

### Bug Tracking Process
1. **Report** using standardized template
2. **Classify** by severity and category
3. **Investigate** with 5 Whys analysis
4. **Document** chain of thought reasoning
5. **Fix** with comprehensive testing
6. **Prevent** with process improvements

### Task Management Flow
```
Backlog → Ready → In Progress → Review → Testing → Done
```

Each task must include:
- Clear acceptance criteria
- Chain of thought documentation
- Implementation reasoning
- Testing strategy
- Definition of done checklist

## Website-Specific Rules

### Component Development Standards
1. **Assume components are broken** until proven working through tests
2. **Test individual components** before integration
3. **Follow atomic design** with atoms/molecules structure (no organisms)
4. **Maintain glassmorphism consistency** across all components
5. **Ensure responsive design** works across all breakpoints

### Asset Management Standards
- **Label black icons** explicitly (arrows, social media icons)
- **Organize assets** by context (bg/, jack/, projects/, toy/)
- **Optimize images** for web performance (WebP/AVIF)
- **Maintain font consistency** (Elianto, Dual-300, Stellar, PP Stellar)

### Performance Standards for Portfolio
- **First Contentful Paint** < 1 second on Vercel
- **Largest Contentful Paint** < 2.5 seconds
- **Cumulative Layout Shift** < 0.1
- **Mobile-first responsive design** across all components

## Development Workflow Rules

### Pre-Development
- [ ] Task clearly defined with acceptance criteria
- [ ] Chain of thought analysis completed
- [ ] Technical approach documented
- [ ] Dependencies identified and resolved

### During Development
- [ ] Follow TypeScript strict standards
- [ ] Write tests alongside code
- [ ] Document complex logic with reasoning
- [ ] Regular commits with proper messages

### Pre-Commit
- [ ] All tests passing
- [ ] Linting errors resolved
- [ ] Code review completed
- [ ] Documentation updated

### Post-Deployment
- [ ] Monitoring alerts configured
- [ ] Performance metrics tracked
- [ ] User feedback collected
- [ ] Lessons learned documented

## Documentation Standards

### Required Documentation
- **Code comments** for complex logic
- **API documentation** for all endpoints
- **README files** for all components
- **Architecture decisions** with reasoning
- **Chain of thought** for significant decisions

### Documentation Format
```typescript
/**
 * [Clear description of function/class purpose]
 * 
 * Chain of Thought:
 * 1. [Why this approach was chosen]
 * 2. [What alternatives were considered]
 * 3. [What trade-offs were made]
 * 
 * @param {Type} param - [Parameter description]
 * @returns {Type} [Return value description]
 * @throws {ErrorType} [When this error occurs]
 * 
 * @example
 * ```typescript
 * const result = await functionName(param);
 * ```
 */
```

## Testing Requirements

### Test Categories
- **Unit Tests**: Individual component testing (>90% coverage)
- **Integration Tests**: Component interaction testing
- **E2E Tests**: Complete user workflow testing
- **AI Tests**: Model accuracy and performance testing
- **Security Tests**: Vulnerability and penetration testing

### Test Documentation
```typescript
describe('Component/Function Name', () => {
  describe('specific functionality', () => {
    it('should handle normal case correctly', () => {
      // Test implementation with clear assertions
    });
    
    it('should handle edge case gracefully', () => {
      // Edge case testing with error handling
    });
    
    it('should throw appropriate error for invalid input', () => {
      // Error condition testing
    });
  });
});
```

## Security Rules

### Code Security Checklist
- [ ] No hardcoded secrets or credentials
- [ ] Input validation for all user data
- [ ] Proper authentication and authorization
- [ ] Secure communication (HTTPS/WSS)
- [ ] Error messages don't leak sensitive data
- [ ] Dependencies are up to date and secure

### AI Security Considerations
- [ ] Prompt injection prevention
- [ ] Output sanitization and validation
- [ ] Rate limiting and abuse prevention
- [ ] Data privacy and compliance
- [ ] Model access controls

## Performance Standards

### Response Time Requirements
- **API Endpoints**: <500ms for standard operations
- **AI Responses**: <2 seconds initial response
- **WebSocket**: <100ms latency for real-time features
- **Document Processing**: <5 seconds for typical reports

### Performance Monitoring
- **Metrics Collection**: All services emit performance data
- **Alerting**: Automated alerts for degradation
- **Load Testing**: Regular testing under realistic load
- **Optimization**: Continuous performance improvement

## Error Handling Standards

### Error Categories
- **User Errors**: Invalid input, authentication failures
- **System Errors**: Service unavailable, timeout errors
- **Business Errors**: Validation failures, constraint violations
- **Unknown Errors**: Unexpected system failures

### Error Response Format
```typescript
interface ErrorResponse {
  error: {
    code: string;           // Machine-readable error code
    message: string;        // Human-readable error message
    details?: any;          // Additional error context
    timestamp: string;      // When the error occurred
    requestId: string;      // For error tracking
  };
}
```

## Chain of Thought Integration

### Decision Documentation Template
```markdown
## Decision: [Brief Title]

### Context
[Situation requiring a decision]

### Options Considered
1. **Option A**: [Pros, cons, implications]
2. **Option B**: [Pros, cons, implications]
3. **Option C**: [Pros, cons, implications]

### Decision Criteria
- [Criterion 1 with weight/importance]
- [Criterion 2 with weight/importance]
- [Criterion 3 with weight/importance]

### Reasoning Chain
1. [First consideration]
2. [Second consideration]
3. [Final reasoning]

### Selected Option
[Chosen option with justification]

### Implementation Plan
[How the decision will be implemented]

### Success Metrics
[How success will be measured]

### Review Schedule
[When to reassess this decision]
```

## Continuous Improvement

### Regular Reviews
- **Daily**: Standup with progress and blockers
- **Weekly**: Code quality and bug metrics review
- **Monthly**: Performance and security assessment
- **Quarterly**: Architecture and process review

### Learning Capture
- **Document insights** from each development cycle
- **Share knowledge** across the team
- **Update processes** based on lessons learned
- **Build reusable patterns** and templates

### Process Evolution
- **Measure effectiveness** of current processes
- **Identify improvement opportunities** regularly
- **Implement changes** with proper testing
- **Document process changes** with reasoning

## Phase-Based Requirements

### MVP Phase (Current)
- **Focus**: Core functionality and development workflow
- **Testing**: Comprehensive unit and integration testing
- **Security**: Basic security practices and input validation
- **Performance**: Functional correctness over optimization
- **Documentation**: Inline documentation and README files

### Production Phase (Future)
- **Compliance**: SOC 2 Type II, financial services regulations
- **Security**: Advanced security auditing and monitoring
- **Performance**: Strict performance requirements and monitoring
- **Documentation**: External documentation portal

### Development Standards (All Phases)
- **TypeScript strict mode** across all projects
- **Comprehensive testing** with >90% coverage using Jest
- **Chain of thought** documentation for significant decisions
- **Modular approach** - use relevant rules for current context

---

## Quick Action Items

When starting any development work:

1. **Read the task** and understand acceptance criteria
2. **Document your approach** with chain of thought
3. **Set up proper testing** before writing code
4. **Follow coding standards** and security practices
5. **Update documentation** as you develop
6. **Test thoroughly** including edge cases
7. **Get code review** before merging
8. **Monitor deployment** and gather feedback
9. **Document lessons learned** for future reference
10. **Update this summary** if processes change

This rules summary ensures consistent, high-quality development practices across the entire ERA project while maintaining transparency and continuous improvement.