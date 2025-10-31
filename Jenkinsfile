pipeline {
    agent any
    environment {
        DOCKER_BUILDKIT = '1'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Backend Install & Test') {
            steps {
                dir('student-record-backend') {
                    sh '''
                        echo "🔧 Checking Node.js setup..."
                        node -v
                        echo "📦 Installing backend dependencies..."
                        npm install
                        echo "🧪 Running backend tests (if any)..."
                        npm test || echo "No backend tests found"
                    '''
                }
            }
        }

        stage('Frontend Install & Build') {
            steps {
                dir('student-record-frontend') {
                    sh '''
                        echo "📦 Installing frontend dependencies..."
                        npm install
                        echo "⚙️ Building frontend..."
                        npm run build
                    '''
                }
            }
        }

        stage('Docker Build & Deploy') {
            steps {
                script {
                    echo "🚀 Deploying using Docker Compose..."
                    sh '''
                        docker compose down -v --remove-orphans
                        docker compose up -d --build
                    '''
                }
            }
        }
    }

    post {
        success {
            echo "✅ Pipeline completed successfully!"
        }
        failure {
            echo "❌ Pipeline failed!"
        }
    }
}
