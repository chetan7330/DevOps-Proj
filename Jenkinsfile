pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                echo "📥 Checking out source code..."
                checkout scm
            }
        }

        stage('Clean Existing Containers') {
            steps {
                echo "🧹 Cleaning up old containers..."
                sh '''
                    echo "Stopping and removing old containers..."
                    docker ps -aq | xargs -r docker rm -f
                    docker system prune -f
                '''
            }
        }

        stage('Build Backend Image') {
            steps {
                dir('backend') {
                    echo "🐳 Building backend Docker image..."
                    sh 'docker build -t student-backend:latest .'
                }
            }
        }

        stage('Build Frontend Image') {
            steps {
                dir('frontend') {
                    echo "🌐 Building frontend Docker image..."
                    sh 'docker build -t student-frontend:latest .'
                }
            }
        }

        stage('Deploy Using Docker Compose') {
            steps {
                echo "🚀 Deploying stack using Docker Compose..."
                sh '''
                    docker compose down -v --remove-orphans
                    docker compose up -d --build
                '''
            }
        }

        stage('Infrastructure Provision (Terraform)') {
            steps {
                dir('terraform') {
                    echo "🏗️ Running Terraform for infrastructure setup..."
                    sh '''
                        terraform init -input=false
                        terraform plan -input=false -out=tfplan
                        terraform apply -auto-approve tfplan
                    '''
                }
            }
        }

        stage('Monitoring Stack (Prometheus & Grafana)') {
            steps {
                echo "📊 Checking Prometheus and Grafana..."
                sh '''
                    curl -f http://localhost:9090
                    curl -f http://localhost:3000
                '''
            }
        }
    }

    post {
        success {
            echo "✅ Pipeline executed successfully!"
        }
        failure {
            echo "❌ Pipeline failed! Please check logs."
        }
    }
}
