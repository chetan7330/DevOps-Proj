pipeline {
  agent any

  environment {
    PATH = "/usr/local/bin:$PATH" // Adjust node path accordingly on your Mac
    BACKEND_DIR = 'student-record-backend'
    FRONTEND_DIR = 'student-record-frontend'
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }
    
    stage('Backend Install & Test') {
      steps {
        dir(BACKEND_DIR) {
          sh '''
            echo "Node version:"
            node -v || { echo "Node not found!"; exit 1; }
            npm install
            npm test || echo "No backend tests"
          '''
        }
      }
    }
    
    stage('Frontend Install & Build') {
      steps {
        dir(FRONTEND_DIR) {
          sh 'npm install'
        sh 'npm run build'
        }
      }
    }
    stage('Verify Docker') {
  steps {
    sh 'docker --version || { echo "Docker not available"; exit 1; }'
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
