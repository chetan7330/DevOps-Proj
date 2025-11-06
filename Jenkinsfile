pipeline {
    agent any
    environment {
        DOCKER_BUILDKIT = '1'
        PATH = "/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:/Users/chetankrishna/.npm-global/bin"
    }

    stages {
        stage('Checkout') {
            steps {
                echo "📥 Checking out source code..."
                checkout scm
            }
        }

        stage('Build Backend Image') {
            steps {
                dir('backend') {
                    echo "⚙️ Building Backend Docker Image..."
                    sh 'docker build -t student-backend:latest .'
                }
            }
        }

        stage('Build Frontend Image') {
            steps {
                dir('frontend') {
                    echo "⚙️ Building Frontend Docker Image..."
                    sh 'docker build -t student-frontend:latest .'
                }
            }
        }

        stage('Run Docker Compose') {
            steps {
                script {
                    echo "🚀 Deploying containers using Docker Compose..."
                    sh '''
                    docker rm -f $(docker ps -aq --filter "name=backend") || true
                    docker rm -f $(docker ps -aq --filter "name=frontend") || true
                    docker rm -f $(docker ps -aq --filter "name=mongo") || true
                    
                    docker compose down -v --remove-orphans || true
                    docker compose up -d --build
                    '''
                }
            }
        }

        stage('Run API Tests') {
            steps {
                script {
                    echo "🧪 Running API Tests using Newman..."
                    // Wait a bit for backend to start fully before testing
                    sh '''
                    sleep 10
                    newman run backend/tests/student_api_collection.json || exit 1
                    '''
                }
            }
        }
    }

    post {
        success {
            echo "✅ CI/CD Pipeline completed successfully! All tests passed!"
        }
        failure {
            echo "❌ CI/CD Pipeline failed! Check Jenkins logs for details."
        }
        always {
            echo "🧹 Cleaning up workspace..."
            deleteDir()
        }
    }
}
