# Jack Portfolio Website Development Standards & Rules

## Git Commit Message Standards

### Commit Message Format

All commit messages MUST follow the Conventional Commits specification:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Commit Types

- **feat**: A new feature for the user
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, etc)
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **perf**: A code change that improves performance
- **test**: Adding missing tests or correcting existing tests
- **build**: Changes that affect the build system or external dependencies
- **ci**: Changes to CI configuration files and scripts
- **chore**: Other changes that don't modify src or test files
- **revert**: Reverts a previous commit

### Examples

```
feat(hero): add smooth scroll animations to landing section
fix(about): resolve facts display issue in AboutSection component
docs(components): update component prop interfaces and usage
test(nav): add comprehensive navigation component tests
refactor(footer): optimize footer layout and icon sizing
perf(images): implement lazy loading for project gallery
```

### Commit Message Rules

1. **Subject Line**: 
   - Use imperative mood ("add" not "added" or "adds")
   - Keep under 50 characters
   - No period at the end
   - Capitalize first letter

2. **Body** (optional):
   - Wrap at 72 characters
   - Explain what and why, not how
   - Separate from subject with blank line

3. **Footer** (optional):
   - Reference issues: "Closes #123"
   - Breaking changes: "BREAKING CHANGE: description"

### Commit Message Integration

For significant changes, include a summary in relevant documentation:

```markdown
## Recent Changes

### Commit: [commit-hash]
**Message**: `feat(ai): add model routing optimization`
**Summary**: Implemented intelligent model selection based on request complexity and cost constraints
**Impact**: Reduces AI costs by ~30% while maintaining response quality
**Files**: src/ai/model-router.ts, tests/ai/model-router.test.ts
```

## Code Quality Standards

### TypeScript Requirements

- **Strict Mode**: All TypeScript projects MUST use strict mode
- **No Any Types**: Use proper type definitions, never `any`
- **Interface-First**: Define interfaces before implementation
- **Type Coverage**: Maintain >95% type coverage

### Code Formatting

- **ESLint**: All code MUST pass ESLint checks
- **Prettier**: Consistent formatting across all files
- **Pre-commit Hooks**: Husky hooks prevent commits with linting errors
- **Import Organization**: Use absolute imports, organize by type

### Code Review Standards

1. **Required Reviews**: All PRs require at least 1 approval
2. **Review Checklist**:
   - [ ] Code follows TypeScript standards
   - [ ] Tests are comprehensive and passing
   - [ ] Documentation is updated
   - [ ] Performance impact is considered
   - [ ] Security implications are reviewed
   - [ ] Error handling is appropriate

## Testing Requirements

### Test Coverage Standards

- **Unit Tests**: >90% code coverage for all components (using Jest)
- **Integration Tests**: All API endpoints and service interactions
- **E2E Tests**: Critical user workflows and business logic
- **AI Tests**: Model response validation and accuracy testing

### Testing Framework Standards

```typescript
// Jest configuration for all TypeScript projects
export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.test.{ts,tsx}',
    '!src/**/__tests__/**'
  ],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90
    }
  }
};
```

### Test Organization

- **Unit Tests**: `__tests__/` directories alongside source code
- **Integration Tests**: `tests/integration/` in project root
- **E2E Tests**: `tests/e2e/` with Playwright/Cypress
- **AI Tests**: `tests/ai/` for model validation and accuracy

### Test Naming Conventions

```typescript
describe('AuthService', () => {
  describe('validateToken', () => {
    it('should return true for valid JWT token', () => {
      // Test implementation
    });
    
    it('should throw error for expired token', () => {
      // Test implementation
    });
    
    it('should handle malformed token gracefully', () => {
      // Test implementation
    });
  });
});
```

## Documentation Standards

### Code Documentation

- **JSDoc**: All public functions and classes MUST have JSDoc comments
- **README**: Each service/component needs comprehensive README
- **API Documentation**: OpenAPI/Swagger for all REST endpoints
- **Architecture Decisions**: Document in `.kiro/specs/` directory

### Documentation Format

```typescript
/**
 * Validates JWT token and extracts user information
 * @param token - JWT token string
 * @param options - Validation options
 * @returns Promise resolving to user data or throwing error
 * @throws {AuthenticationError} When token is invalid or expired
 * @example
 * ```typescript
 * const user = await validateToken(token, { audience: 'api' });
 * ```
 */
async function validateToken(
  token: string, 
  options: ValidationOptions
): Promise<UserData> {
  // Implementation
}
```

### Documentation Display

**MVP Phase**: Focus on inline code documentation and README files
**Future Consideration**: Implement documentation website/portal for external access

Documentation should be:
- **Accessible**: Easy to find and navigate
- **Current**: Updated with every significant change
- **Practical**: Include working examples and use cases
- **Contextual**: Explain the why, not just the what

## Performance Standards

### MVP Performance Goals
- **AI Responses**: <2 seconds initial response (target)
- **Basic Operations**: Reasonable response times for development
- **Focus**: Functional correctness over optimization

### Production Performance Requirements (Future)
- **API Endpoints**: <500ms for standard operations
- **WebSocket**: <100ms latency for real-time features
- **Document Processing**: <5 seconds for typical reports
- **Load Testing**: Regular performance testing under realistic load

### Performance Monitoring
- **MVP**: Basic performance awareness during development
- **Production**: Comprehensive metrics collection and alerting

## Development Phase Considerations

### MVP Phase (Current)
**Focus Areas**:
- Core functionality implementation
- Basic testing and code quality
- Development workflow establishment
- Essential security practices

**Deferred for Later**:
- Advanced security auditing
- Performance optimization
- Production monitoring
- Compliance frameworks

### Production Phase (Future)
**Additional Requirements**:
- Comprehensive security auditing
- Performance monitoring and optimization
- Compliance and regulatory requirements
- Advanced error tracking and alerting

## Security Standards

### MVP Security Requirements
- **Secrets Management**: Never commit secrets, use environment variables
- **Input Validation**: Basic validation for all user inputs
- **Error Handling**: Don't expose sensitive information in errors
- **Dependencies**: Keep dependencies updated

### Production Security Requirements (Future)
- **Dependency Scanning**: Automated vulnerability scans
- **Security Auditing**: Regular penetration testing
- **Compliance**: SOC 2, financial services regulations
- **Advanced Monitoring**: Real-time security monitoring

### Security Review Checklist (MVP)
- [ ] No hardcoded secrets or credentials
- [ ] Basic input validation implemented
- [ ] Error messages don't leak sensitive data
- [ ] Dependencies are reasonably up to date

## Chain of Thought Integration

### Reasoning Documentation

When implementing complex logic, especially AI-related features, document the reasoning process:

```typescript
/**
 * Model routing logic with chain of thought reasoning
 * 
 * Reasoning Chain:
 * 1. Analyze request complexity (token count, task type)
 * 2. Check user preferences and cost constraints
 * 3. Evaluate model availability and performance
 * 4. Select optimal model based on cost/performance trade-off
 * 5. Implement fallback strategy for model unavailability
 */
class ModelRouter {
  async selectModel(request: AIRequest): Promise<ModelSelection> {
    // Step 1: Analyze complexity
    const complexity = this.analyzeComplexity(request);
    
    // Step 2: Check constraints
    const constraints = await this.getUserConstraints(request.userId);
    
    // Step 3: Evaluate availability
    const availability = await this.checkModelAvailability();
    
    // Step 4: Make selection
    return this.optimizeSelection(complexity, constraints, availability);
  }
}
```

### Decision Documentation

Document key architectural and implementation decisions:

```markdown
## Decision: Use Pinecone for Vector Database

### Context
Need vector database for RAG system to store document embeddings.

### Options Considered
1. Pinecone (managed)
2. Weaviate (self-hosted)
3. Chroma (embedded)

### Decision
Selected Pinecone for managed service benefits.

### Reasoning Chain
1. Evaluate operational overhead vs. performance needs
2. Consider scaling requirements for enterprise deployment
3. Assess cost implications for target budget
4. Review integration complexity with existing stack
5. Factor in team expertise and maintenance burden

### Consequences
- Reduced operational overhead
- Vendor dependency
- Cost predictability
- Faster time to market
```

## Continuous Improvement

### Code Quality Metrics

Track and improve:
- Test coverage percentage
- Code complexity scores
- Performance benchmarks
- Security vulnerability counts
- Documentation coverage

### Regular Reviews

- **Weekly**: Code quality metrics review
- **Monthly**: Performance and security assessment
- **Quarterly**: Architecture and standards review
- **Annually**: Technology stack evaluation

These standards ensure consistent, high-quality development practices across the entire ERA project while supporting efficient chain of thought reasoning and decision-making processes.