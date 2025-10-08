pipeline {
  agent any

  stages {
    stage('Checkout SCM') {
      steps {
        checkout scm
      }
    }

    stage('Debug Workspace') {
      steps {
        echo 'Listing root workspace contents:'
        sh 'ls -la'
      }
    }

    stage('Backend Install & Test') {
      steps {
        dir('student-record-backend') {
          echo 'Listing backend folder contents:'
          sh 'ls -la'
          echo 'Installing backend dependencies and running tests...'
          sh 'npm install'
          sh 'npm test'
        }
      }
    }

    stage('Frontend Install & Build') {
      steps {
        dir('student-record-frontend') {
          echo 'Listing frontend folder contents:'
          sh 'ls -la'
          echo 'Installing frontend dependencies and building...'
          sh 'npm install'
          sh 'npm run build'
        }
      }
    }

    stage('Docker Build Backend') {
      steps {
        dir('student-record-backend') {
          echo 'Building backend Docker image...'
          sh 'docker build -t student-backend .'
        }
      }
    }

    stage('Docker Build Frontend') {
      steps {
        dir('student-record-frontend') {
          echo 'Building frontend Docker image...'
          sh 'docker build -t student-frontend .'
        }
      }
    }

    // Add stages for pushing Docker images or deployment here as needed

  }

  post {
    success {
      echo 'Pipeline completed successfully!'
    }
    failure {
      echo 'Pipeline failed!'
    }
  }
}
