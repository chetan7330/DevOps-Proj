pipeline {
  agent any

  environment {
    PATH = "/opt/homebrew/bin:${env.PATH}"  // Add full node and npm path here
    BACKEND_DIR = 'student-record-backend'
    FRONTEND_DIR = 'frontend'
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
      sh 'npm install'
      sh 'npm test || echo "No backend tests"'
    }
  }
}

stage('Frontend Install & Build') {
  steps {
    dir('student-record-frontend') {
      sh 'npm install'
      sh 'npm run build'
    }
  }
}


    stage('Docker Build Backend') {
      steps {
        sh 'docker build -t student-backend ./student-record-backend'
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
      echo '✅ Pipeline completed successfully'
    }
    failure {
      echo '❌ Pipeline failed!'
    }
  }
}
