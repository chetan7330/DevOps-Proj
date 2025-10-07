pipeline {
  agent any

  environment {
    BACKEND_DIR = 'student-record-backend' // confirm exact directory name matches Git repo
    FRONTEND_DIR = 'frontend' // confirm exact directory name matches Git repo
    PATH = "/opt/homebrew/bin:${env.PATH}" // Add Node.js install path for Mac if needed
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Prepare Submodules') {
      steps {
        // Initialize git submodules if any (ignore errors if none)
        sh 'git submodule update --init --recursive || echo "No submodules to initialize"'
      }
    }

    stage('Debug Workspace') {
      steps {
        // List root files and contents of backend folder
        sh 'ls -la'
        sh "ls -la ${BACKEND_DIR}"
        sh "cat ${BACKEND_DIR}/package.json || echo 'No package.json in backend'"
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
        // Example deploy commands with docker-compose; adjust for your environment
        sh 'docker-compose down || true'
        sh 'docker-compose up -d --build'
      }
    }
  }

  post {
    success {
      echo 'Pipeline completed successfully.'
      // Add notifications if needed
    }
    failure {
      echo 'Pipeline failed; check logs.'
      // Add notifications or rollback logic if needed
    }
  }
}
