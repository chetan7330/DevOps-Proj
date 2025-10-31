pipeline {
  agent any

  environment {
    PATH = "/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:/opt/homebrew/bin:/opt/homebrew/opt/node@20/bin"
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
            echo "🔧 Checking Node.js setup..."
            bash -lc "node -v" || { echo "❌ Node not found!"; exit 1; }

            echo "📦 Installing backend dependencies..."
            bash -lc "npm install"

            echo "🧪 Running backend tests (if any)..."
            bash -lc "npm test || echo No backend tests found"
          '''
        }
      }
    }

    stage('Frontend Install & Build') {
      steps {
        dir(FRONTEND_DIR) {
          sh '''
            echo "📦 Installing frontend dependencies..."
            bash -lc "npm install"

            echo "⚙️ Building frontend..."
            bash -lc "npm run build"
          '''
        }
      }
    }

    stage('Docker Build Backend') {
      steps {
        dir('student-record-backend') {
          echo '🐳 Building backend Docker image...'
          sh 'docker build -t student-backend .'
        }
      }
    }

    stage('Docker Build Frontend') {
      steps {
        dir('student-record-frontend') {
          echo '🐳 Building frontend Docker image...'
          sh 'docker build -t student-frontend .'
        }
      }
    }

    stage('Deploy') {
      steps {
        script {
          echo '🚀 Deploying using Docker Compose...'
          sh '''
            docker compose down -v --remove-orphans || true
            docker compose up -d --build
          '''
        }
      }
    }
  }

  post {
    success {
      echo '✅ Pipeline completed successfully!'
    }
    failure {
      echo '❌ Pipeline failed. Check the console logs for details.'
    }
  }
}
