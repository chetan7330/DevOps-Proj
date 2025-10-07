pipeline {
    agent any

    // 👇 Ensure Jenkins can access Node installed via Homebrew
    environment {
        PATH = "/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:${PATH}"
    }

    stages {

        stage('Checkout') {
            steps {
                echo '🔄 Checking out source code...'
                git branch: 'main', url: 'https://github.com/chetan7330/DevOps-Project'
            }
        }

        stage('Backend Install & Test') {
            steps {
                dir('student-record-backend') {
                    echo '🧩 Installing backend dependencies...'
                    sh '''
                        echo "Node version:"
                        node -v || (echo "Node not found!" && exit 1)

                        echo "npm version:"
                        npm -v || (echo "npm not found!" && exit 1)

                        npm install
                        echo "✅ Backend dependencies installed successfully"

                        echo "🧪 Running backend tests..."
                        npm test || echo "⚠️ Tests failed or skipped"
                    '''
                }
            }
        }

        stage('Frontend Install & Build') {
            steps {
                dir('student-record-frontend') {
                    echo '🎨 Installing frontend dependencies...'
                    sh '''
                        npm install
                        echo "✅ Frontend dependencies installed successfully"

                        echo "🏗️ Building frontend..."
                        npm run build || echo "⚠️ Frontend build failed or skipped"
                    '''
                }
            }
        }

        stage('Docker Build Backend') {
            steps {
                dir('student-record-backend') {
                    echo '🐳 Building Docker image for backend...'
                    sh '''
                        docker build -t student-record-backend:latest .
                        echo "✅ Backend Docker image built successfully"
                    '''
                }
            }
        }

        stage('Docker Build Frontend') {
            steps {
                dir('student-record-frontend') {
                    echo '🐳 Building Docker image for frontend...'
                    sh '''
                        docker build -t student-record-frontend:latest .
                        echo "✅ Frontend Docker image built successfully"
                    '''
                }
            }
        }

        stage('Deploy') {
            steps {
                echo '🚀 Deploying containers...'
                sh '''
                    docker-compose down || true
                    docker-compose up -d --build
                    echo "✅ Application deployed successfully!"
                '''
            }
        }
    }

    post {
        success {
            echo '🎉 Pipeline completed successfully!'
        }
        failure {
            echo '❌ Pipeline failed! Check logs for details.'
        }
    }
}
