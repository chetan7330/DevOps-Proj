pipeline {
    agent any

    environment {
        PATH = "/opt/homebrew/bin:/usr/local/bin:${PATH}"
    }

    stages {
        stage('Backend Install & Test') {
            dir('student-record-backend') {
                steps {
                    sh '''
                    echo "Node version:"
                    node -v || (echo "Node not found!" && exit 1)
                    npm -v || (echo "npm not found!" && exit 1)
                    npm install
                    npm test || echo "Tests failed or skipped"
                    '''
                }
            }
        }
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/chetan7330/DevOps-Project'
            }
        }

        stage('Backend Install & Test') {
    dir('student-record-backend') {
        sh '''
        echo "Node version:"
        /opt/homebrew/bin/node -v || (echo "Node not found!" && exit 1)
        /opt/homebrew/bin/npm install
        /opt/homebrew/bin/npm test
        '''
    }
}


        stage('Frontend Install & Build') {
            steps {
                dir('frontend') {
                    sh '''
                        npm install
                        npm run build
                    '''
                }
            }
        }

        stage('Docker Build Backend') {
            steps {
                sh '''
                    echo "Building backend Docker image..."
                    docker build -t student-record-backend ./student-record-backend
                '''
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deployment steps go here (e.g. docker run or push).'
            }
        }
    }

    post {
        success {
            echo '✅ Pipeline completed successfully!'
        }
        failure {
            echo '❌ Pipeline failed!'
        }
    }
}
}