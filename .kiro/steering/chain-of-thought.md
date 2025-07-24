# Chain of Thought Standards

## When to Use

Apply chain of thought documentation for:
- Complex technical decisions
- Bug investigations
- Architecture choices
- AI model selection
- Problem-solving that affects multiple components

For simple tasks, basic reasoning in code comments is sufficient.

## Core Principles

- **Show your work**: Document why, not just what
- **Consider alternatives**: List other options you evaluated
- **State assumptions**: Be explicit about what you're assuming
- **Capture learnings**: Note insights for future reference

## Simple Templates

### Problem Solving
```markdown
## Problem: [Brief description]

**What's wrong**: [Current issue]
**Why it matters**: [Impact]
**Options considered**:
1. [Option A] - Pros: X, Cons: Y
2. [Option B] - Pros: X, Cons: Y

**Chosen solution**: [Selected option]
**Reasoning**: [Why this choice makes sense]
```

### Technical Decisions
```markdown
## Decision: [Technology/approach choice]

**Context**: [What needs to be decided and why]
**Options**:
- [Option 1]: [Brief pros/cons]
- [Option 2]: [Brief pros/cons]

**Decision**: [Chosen option]
**Reasoning**: [Key factors that drove the decision]
**Trade-offs**: [What we're giving up]
```

### Code Implementation
For complex implementations, add reasoning in code comments:

```typescript
/**
 * User profile structure
 * 
 * Reasoning: Nested preferences object allows easy extension
 * without breaking existing code. Separate modelChoice from
 * writingStyle for independent updates.
 */
interface UserProfile {
  id: string;
  preferences: {
    modelChoice: ModelType;    // User's preferred AI model
    writingStyle: StyleConfig; // LoRA fine-tuning settings
  };
}

// Error handling strategy: Different error types need different responses
try {
  const result = await processUserRequest(request);
  return result;
} catch (error) {
  if (error instanceof ValidationError) {
    return { error: "Please check your input format" };
  }
  // Log unexpected errors for debugging
  logger.error("Unexpected error", { error, request });
  throw new InternalServerError("Processing failed");
}
```

## AI-Specific Reasoning

### Model Selection
```markdown
## AI Model Choice: [Task description]

**Task needs**: [Accuracy/speed/cost priority]
**Models considered**: 
- Haiku 3.5: Fast, cheap, good for simple tasks
- Sonnet 4.0: Balanced performance and cost
- Opus 4.0: Highest accuracy, expensive

**Selected**: [Chosen model]
**Why**: [Primary reason - cost, speed, or accuracy focus]
**Fallback**: [Backup model if primary fails]
```

### Prompt Engineering
```markdown
## Prompt: [Purpose]

**Goal**: [What it should accomplish]
**Key changes from v1**: [What was improved and why]
**Testing**: [How you validated it works]

**Final prompt**:
```
[Your optimized prompt here]
```

**Notes**: [Any important considerations for future updates]
```

## Quick Guidelines

### Code Reviews
When reviewing code, briefly explain your reasoning:
- "This approach is good because..."
- "Consider X instead of Y because..."
- "This could cause issues when..."

### Learning Capture
After completing complex tasks, note:
- What worked well
- What you'd do differently
- Useful patterns for future use

### Documentation
Keep it simple:
- Write for the person who will maintain this code
- Include examples for complex concepts
- Explain the "why" behind non-obvious decisions

## Remember

Chain of thought is about **clarity and learning**, not bureaucracy. Use your judgment on when detailed reasoning is needed versus when simple comments suffice.