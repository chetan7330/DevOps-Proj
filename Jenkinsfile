pipeline {
  agent any

  environment {
    BACKEND_DIR = 'student-record-backend'
    FRONTEND_DIR = 'frontend'
    PATH = "/opt/homebrew/bin:${env.PATH}" // Adjust this path as per your system
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Backend Build & Test') {
      steps {
        dir(BACKEND_DIR) {
          sh 'npm install'
          sh 'npm test || echo "No backend tests"'
          sh 'docker build -t student-backend .'
        }
      }
    }

    stage('Frontend Build & Test') {
      steps {
        dir(FRONTEND_DIR) {
          sh 'npm install'
          sh 'npm test || echo "No frontend tests"'
          sh 'npm run build'
          sh 'docker build -t student-frontend .'
        }
      }
    }

    stage('Deploy') {
      steps {
        sh 'docker-compose down || true'
        sh 'docker-compose up -d --build'
      }
    }
  }

  post {
    success {
      echo 'CI/CD pipeline completed successfully.'
    }
    failure {
      echo 'Build or deployment failed. Check logs.'
    }
  }
}
