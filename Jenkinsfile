pipeline {
    agent any
    tools {
        nodejs 'Node18'  // must match the name you configured
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

        stage('Backend Install & Test') {
            steps {
                dir(env.BACKEND_DIR) {
                    // Install backend dependencies
                    sh 'npm install'

                    // Run backend tests and generate Jest JUnit report
                    sh 'npx jest --ci --reporters=default --reporters=jest-junit'

                    // Archive test results
                    junit 'test-results/**/*.xml'
                }
            }
        }

        stage('Frontend Install & Build') {
            steps {
                dir(env.FRONTEND_DIR) {
                    // Install frontend dependencies
                    sh 'npm install'

                    // Build frontend
                    sh 'npm run build'

                    // Run frontend tests and generate Jest JUnit report
                    sh 'npx jest --ci --reporters=default --reporters=jest-junit || true'

                    // Archive frontend test results (ignore if none)
                    junit allowEmptyResults: true, testResults: 'test-results/**/*.xml'
                }
            }
        }

        stage('Docker Build Backend') {
            steps {
                dir(env.BACKEND_DIR) {
                    script {
                        // Only build docker if docker is available
                        if (sh(script: 'command -v docker', returnStatus: true) == 0) {
                            sh 'docker build -t student-backend .'
                        } else {
                            echo 'Docker not found, skipping backend Docker build'
                        }
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                echo "Deploy stage: Add your deployment commands here"
            }
        }
    }

    post {
        always {
            echo 'Pipeline finished'
        }
        success {
            echo 'Pipeline succeeded!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}
