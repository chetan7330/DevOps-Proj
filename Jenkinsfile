pipeline {
    agent any

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
                    echo "🐳 Building backend Docker image..."
                    sh 'docker build -t student-backend:latest .'
                }
            }
        }

        stage('Build Frontend Image') {
            steps {
                dir('frontend') {
                    echo "🌐 Building frontend Docker image..."
                    sh 'docker build -t student-frontend:latest .'
                }
            }
        }

        stage('Run Tests') {
            steps {
                echo "🧪 Starting test stack and running Newman tests..."

                // 1) Start only the services needed for tests
                sh '''
                  docker compose up -d mongo backend
                  echo "⏳ Waiting for backend to be ready..."
                  sleep 15
                '''

                // 2) Run Newman tests from backend folder
                dir('backend') {
                    sh '''
                      npm install
                      npx newman run tests/student_api_collection.json
                    '''
                }

                // 3) Tear down test stack
                sh '''
                  echo "🧹 Tearing down test stack..."
                  docker compose down
                '''
            }
        }

        stage('Deploy Using Docker Compose') {
            steps {
                echo "🚀 Deploying stack using Docker Compose..."
                sh '''
                    docker compose down -v --remove-orphans
                    docker compose up -d --build
                '''
            }
        }
    }

    post {
        success {
            echo "✅ Pipeline executed successfully!"
        }
        failure {
            echo "❌ Pipeline failed! Please check logs."
        }
    }
}
