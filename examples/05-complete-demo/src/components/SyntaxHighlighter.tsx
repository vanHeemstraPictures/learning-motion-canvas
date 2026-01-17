import {Code} from '@motion-canvas/2d';
import {SignalValue} from '@motion-canvas/core/lib/signals';

export interface SyntaxHighlighterProps {
  language: 'typescript' | 'javascript' | 'python' | 'bash' | 'yaml' | 'json';
  code: SignalValue<string>;
  fontSize?: SignalValue<number>;
  fontFamily?: SignalValue<string>;
  theme?: 'monokai' | 'github' | 'dracula';
  x?: SignalValue<number>;
  y?: SignalValue<number>;
  offsetX?: SignalValue<number>;
  offsetY?: SignalValue<number>;
}

/**
 * SyntaxHighlighter component for code display with syntax highlighting
 * 
 * This is a wrapper around Motion Canvas's built-in Code component
 * with predefined configurations for common use cases.
 * 
 * Supported languages:
 * - TypeScript
 * - JavaScript
 * - Python
 * - Bash/Shell
 * - YAML
 * - JSON
 * 
 * Example usage:
 * ```tsx
 * <SyntaxHighlighter
 *   language="typescript"
 *   code={codeString}
 *   fontSize={24}
 *   theme="monokai"
 * />
 * ```
 */
export class SyntaxHighlighter extends Code {
  public constructor(props: SyntaxHighlighterProps) {
    super({
      language: props.language,
      code: props.code,
      fontSize: props.fontSize ?? 24,
      fontFamily: props.fontFamily ?? 'JetBrains Mono, Fira Code, monospace',
      offsetX: props.offsetX ?? -1,
      offsetY: props.offsetY ?? -1,
      x: props.x,
      y: props.y,
    });
  }
}

/**
 * Pre-configured code snippets for common scenarios
 */
export const CodeSnippets = {
  typescript: {
    helloWorld: `function greet(name: string): void {
  console.log(\`Hello, \${name}!\`);
}

greet("Motion Canvas");`,
    
    asyncFunction: `async function fetchData(url: string): Promise<Data> {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}`,

    interface: `interface User {
  id: number;
  name: string;
  email: string;
  roles: string[];
}

const user: User = {
  id: 1,
  name: "Willem",
  email: "willem@example.com",
  roles: ["admin", "developer"]
};`,
  },

  bash: {
    kubectl: `# Get all pods in production namespace
kubectl get pods -n production

# Describe a specific pod
kubectl describe pod webapp-7d9b8c5f4-k8m2j

# View logs
kubectl logs -f webapp-7d9b8c5f4-k8m2j`,

    docker: `# Build Docker image
docker build -t myapp:latest .

# Run container
docker run -d -p 8080:80 myapp:latest

# View running containers
docker ps`,

    git: `# Initialize repository
git init

# Add files and commit
git add .
git commit -m "Initial commit"

# Push to remote
git push origin main`,
  },

  python: {
    class: `class CloudDeployer:
    def __init__(self, region: str):
        self.region = region
        self.client = boto3.client('ec2', region_name=region)
    
    def deploy(self, instance_type: str):
        response = self.client.run_instances(
            ImageId='ami-12345678',
            InstanceType=instance_type,
            MinCount=1,
            MaxCount=1
        )
        return response['Instances'][0]['InstanceId']`,

    dataProcessing: `import pandas as pd

def process_data(df: pd.DataFrame) -> pd.DataFrame:
    # Clean data
    df = df.dropna()
    
    # Transform
    df['processed'] = df['value'].apply(lambda x: x * 2)
    
    return df`,
  },

  yaml: {
    kubernetes: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: webapp
  namespace: production
spec:
  replicas: 3
  selector:
    matchLabels:
      app: webapp
  template:
    metadata:
      labels:
        app: webapp
    spec:
      containers:
      - name: webapp
        image: webapp:latest
        ports:
        - containerPort: 80`,

    cicd: `name: CI/CD Pipeline
on:
  push:
    branches: [main]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Build
        run: npm run build
      - name: Test
        run: npm test`,
  },

  json: {
    config: `{
  "name": "cloud-infrastructure",
  "version": "1.0.0",
  "environments": {
    "production": {
      "region": "eu-west-1",
      "instances": 5,
      "autoscaling": true
    },
    "staging": {
      "region": "eu-west-1",
      "instances": 2,
      "autoscaling": false
    }
  }
}`,

    api: `{
  "status": "success",
  "data": {
    "deployments": [
      {
        "id": "dep-123",
        "status": "running",
        "replicas": 3
      },
      {
        "id": "dep-456",
        "status": "pending",
        "replicas": 2
      }
    ]
  }
}`,
  },
};

/**
 * Helper function to get syntax highlighted code
 */
export function getCodeSnippet(
  language: keyof typeof CodeSnippets,
  snippet: string
): string {
  const langSnippets = CodeSnippets[language];
  if (!langSnippets || !(snippet in langSnippets)) {
    console.warn(`Snippet "${snippet}" not found for language "${language}"`);
    return '';
  }
  return langSnippets[snippet as keyof typeof langSnippets];
}
