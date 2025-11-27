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
        dir('backend') {
            echo '🧪 Running API tests using Newman...'
            sh '''
              npm install
              npx newman run tests/student_api_collection.json
            '''
        }
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
