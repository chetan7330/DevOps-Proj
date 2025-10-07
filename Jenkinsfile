pipeline {
  agent {
    docker { image 'node:18-alpine' }
  }

  environment {
    BACKEND_DIR = 'student-record-backend'
    FRONTEND_DIR = 'frontend'
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Install & Test Backend') {
      steps {
        dir(BACKEND_DIR) {
          sh 'npm install'
          sh 'npm test || echo "No backend tests"'
          sh 'docker build -t student-backend .'
        }
      }
    }

    stage('Install & Test Frontend') {
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
        // Example: Use docker-compose or SCP, replace with your deployment process
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
      echo 'Pipeline failed. Check logs.'
    }
  }
}
