pipeline {
    agent any
    environment {
        DOCKER_BUILDKIT = '1'
        PATH = "/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Backend Image') {
            steps {
                dir('backend') {
                    sh 'docker build -t student-backend:latest .'
                }
            }
        }

        stage('Build Frontend Image') {
            steps {
                dir('frontend') {
                    sh 'docker build -t student-frontend:latest .'
                }
            }
        }

        stage('Deploy Using Docker Compose') {
            steps {
                script {
                    sh '''
                    echo "🚀 Cleaning old containers..."
                    docker compose down -v --remove-orphans || true
                    echo "🚢 Starting new containers..."
                    docker compose up -d --build
                    '''
                }
            }
        }

        stage('Health Check') {
            steps {
                sh '''
                echo "🌐 Checking backend health..."
                curl -f http://localhost:3001 || exit 1
                echo "✅ Backend healthy!"
                '''
            }
        }
    }

    post {
        success {
            echo "✅ Full CI/CD + Monitoring pipeline successful!"
        }
        failure {
            echo "❌ Pipeline failed!"
        }
    }
}