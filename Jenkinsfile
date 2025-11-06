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

        stage('Run Docker Compose') {
            steps {
                script {
                    sh '''
                    echo "🚀 Cleaning up old containers before deploy..."
                    docker rm -f mongo backend frontend 2>/dev/null || true

                    echo "🧱 Deploying using Docker Compose..."
                    docker compose down -v --remove-orphans || true
                    docker compose up -d --build
                  '''
                }
              }
        }

    }

    post {
        success {
            echo "✅ CI/CD Pipeline completed successfully!"
        }
        failure {
            echo "❌ CI/CD Pipeline failed!"
        }
    }
}
