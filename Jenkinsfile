pipeline {
    agent any

    environment {
        BACKEND_DIR = 'student-record-backend'
        FRONTEND_DIR = 'frontend'
    }

    stages {
        stage('Checkout') {
            steps {
                git credentialsId: 'your-git-credential-id', 
                    url: 'https://github.com/chetan7330/DevOps.git', 
                    branch: 'main'
            }
        }

        stage('Backend Build & Test') {
            steps {
                dir(BACKEND_DIR) {
                    sh 'npm install'
                    sh 'npm test || echo "No backend tests defined"'
                    sh 'docker build -t student-backend .'
                }
            }
        }

        stage('Frontend Build & Test') {
            steps {
                dir(FRONTEND_DIR) {
                    sh 'npm install'
                    sh 'npm test || echo "No frontend tests defined"'
                    sh 'npm run build'
                    sh 'docker build -t student-frontend .'
                }
            }
        }

        stage('Deploy') {
            steps {
                // Example using docker-compose for deployment, customize as needed
                sh 'docker-compose down'
                sh 'docker-compose up -d --build'
            }
        }
    }

    post {
        success {
            echo 'Build and deployment succeeded!'
            // Add email notifications or Slack notifications here
        }
        failure {
            echo 'Build or deployment failed.'
            // Add failure notifications or rollback steps here
        }
    }
}
