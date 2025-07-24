# Technology Stack & Development Standards

## Core Technology Stack

### Frontend
- **Framework**: Next.js 14 with TypeScript (strict mode)
- **Styling**: Tailwind CSS + Headless UI
- **Office Integration**: Office JS API for Word add-in
- **State Management**: Zustand for client state, React Query for server state
- **Real-time**: WebSocket client for streaming
- **Voice Input**: Whisper integration for speech-to-text
- **Testing**: Jest + React Testing Library + Cypress/Playwright

### Backend
- **API Framework**: FastAPI with asyncio for high-performance
- **Language**: TypeScript for all services (NO Python per user requirement)
- **Containerization**: Docker on AWS ECS Fargate
- **Authentication**: JWT-based with role-based access control
- **Real-time**: WebSocket via API Gateway
- **Testing**: Jest for Node.js services

### AI & ML
- **Primary Models**: Amazon Bedrock (Claude Sonnet 4.0, Opus 4.0, Haiku 3.5)
- **Personalization**: LoRA fine-tuning pipeline
- **Vector Database**: Pinecone for RAG and document retrieval
- **Guardrails**: Bedrock Guardrails with custom financial validation

### Data & Storage
- **Database**: PostgreSQL with JSONB for flexible schemas
- **Caching**: Redis for sessions and performance
- **Document Storage**: AWS S3 with intelligent tiering
- **Vector Search**: Pinecone for semantic search

### Infrastructure (AWS)
- **Compute**: ECS Fargate for containerized services
- **API**: API Gateway + Application Load Balancer
- **Monitoring**: CloudWatch + Kinesis Firehose + QuickSight
- **Security**: VPC with private subnets, end-to-end encryption

## Development Standards

### TypeScript Requirements
- Strict TypeScript configuration across all projects
- No `any` types - use proper type definitions
- Comprehensive type coverage with strict null checks
- Interface-first development for all APIs

### Testing Requirements (Per User Request)
- **Comprehensive Test Coverage**: Every frontend, backend, and AI component must have tests
- **Testing Framework**: Jest for all TypeScript testing
- **Frontend Testing**: Component tests, integration tests, E2E tests
- **Backend Testing**: Unit tests, API tests, integration tests
- **AI Testing**: Model response validation, accuracy testing, hallucination detection

### Code Quality Standards
- ESLint + Prettier for consistent formatting
- Husky pre-commit hooks for quality gates
- SonarQube for code quality metrics
- Comprehensive error handling with proper logging

### Bug Tracking & Root Cause Analysis (Per User Request)
- **Standardized Bug Framework**: All bugs must include root cause analysis using 5 Whys methodology
- **Bug Documentation**: Maintain `.kiro/specs/equity-research-copilot/bugs.md` with comprehensive tracking
- **Change Log**: Update `.kiro/specs/equity-research-copilot/CHANGELOG.md` for every modification
- **Issue Templates**: Structured bug reports with reproduction steps and chain of thought analysis
- **Root Cause Analysis**: Mandatory for all bugs using standardized templates in `.kiro/steering/bug-tracking.md`

## Common Development Commands

```bash
# Project Setup (when implemented)
npm install                    # Install dependencies
npm run dev                   # Start development server
npm run build                 # Build for production
npm run test                  # Run comprehensive test suite
npm run test:watch           # Run tests in watch mode
npm run test:coverage        # Generate test coverage report
npm run lint                 # Run ESLint
npm run lint:fix            # Fix linting issues
npm run typecheck           # Run TypeScript checking
npm run format              # Format code with Prettier

# Testing Commands
npm run test:unit           # Run unit tests
npm run test:integration    # Run integration tests
npm run test:e2e           # Run end-to-end tests
npm run test:ai            # Run AI model tests

# Development Workflow
npm run dev:frontend       # Start frontend development
npm run dev:backend        # Start backend services
npm run dev:full          # Start full development environment

# Build & Deploy
npm run build:frontend     # Build frontend for production
npm run build:backend      # Build backend services
npm run deploy:staging     # Deploy to staging environment
npm run deploy:prod        # Deploy to production

# Quality & Analysis
npm run analyze           # Bundle analysis
npm run security:audit    # Security vulnerability scan
npm run performance:test  # Performance testing
```

## Project Management & MCP Integration (Per User Request)

### Task Management
- Use MCP services for project management when necessary
- Maintain living task lists in `.kiro/specs/equity-research-copilot/tasks/`
- Regular spec alignment with project status
- Continuous improvement of development plans

### MCP Configuration
- Configure MCP servers in `.kiro/settings/mcp.json`
- Auto-approve trusted MCP tools for efficiency
- Use MCP for external integrations and data sources

## Security & Compliance Standards

### Financial Services Compliance
- SOC 2 Type II compliance requirements
- End-to-end encryption (TLS 1.3 in transit, AES-256 at rest)
- Data residency controls for sensitive financial data
- Regular security audits and penetration testing

### Development Security
- Secure coding practices with OWASP guidelines
- Dependency vulnerability scanning
- Secrets management with AWS Secrets Manager
- Regular security training and code reviews

## Performance Standards

### Response Time Requirements
- Initial AI response: <2 seconds
- WebSocket streaming: Real-time with <100ms latency
- Document processing: <5 seconds for typical reports
- Database queries: <500ms for standard operations

### Cost Optimization
- Intelligent AI model routing for cost efficiency
- Resource monitoring and automatic scaling
- Cost per analyst seat tracking (<$2,000 target)
- LoRA fine-tuning cost optimization (<$50 per analyst)
## Compr
ehensive Development Rules System

The ERA project follows a comprehensive set of development rules and standards documented in the steering system:

### Core Rule Documents
- **`.kiro/steering/rules-summary.md`**: Quick reference for all development rules and standards
- **`.kiro/steering/development-standards.md`**: Detailed coding standards, commit messages, and quality requirements
- **`.kiro/steering/bug-tracking.md`**: Standardized bug tracking with root cause analysis methodology
- **`.kiro/steering/task-management.md`**: Task management framework with chain of thought integration
- **`.kiro/steering/chain-of-thought.md`**: Templates and standards for transparent decision-making

### Chain of Thought Integration
All development activities must include chain of thought documentation:
- **Problem Analysis**: Systematic approach to understanding issues
- **Technical Decisions**: Documented reasoning for all architectural choices
- **Implementation Strategy**: Clear rationale for code design and approach
- **Bug Investigation**: Transparent debugging and root cause analysis
- **Task Planning**: Reasoning behind task breakdown and estimation

### Quality Assurance Framework
- **Comprehensive Testing**: >90% code coverage with unit, integration, and E2E tests
- **Code Review Standards**: Mandatory peer review with documented feedback reasoning
- **Security First**: Security considerations in all development decisions
- **Performance Monitoring**: Continuous performance tracking and optimization
- **Documentation Standards**: Living documentation with decision rationale

### Standardized Processes
- **Git Workflow**: Conventional commits with clear reasoning
- **Bug Lifecycle**: From report to resolution with full analysis
- **Task Management**: Transparent progress tracking with decision documentation
- **Change Management**: All changes tracked in comprehensive changelog
- **Knowledge Capture**: Learning documentation for continuous improvement

This comprehensive rule system ensures consistent, high-quality development while maintaining transparency and enabling effective knowledge transfer across the ERA development team.