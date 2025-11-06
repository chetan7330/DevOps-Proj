pipeline {
    agent any

    environment {
        DOCKER_BUILDKIT = '1'
        PATH = "/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin"
    }

    stages {

        stage('Checkout') {
            steps {
                echo "📥 Checking out source code..."
                checkout scm
            }
        }

        stage('Clean Existing Containers') {
            steps {
                script {
                    echo "🧹 Cleaning up old containers..."
                    sh '''
                        echo "Stopping and removing old containers..."
                        docker ps -aq | xargs -r docker rm -f || true
                        docker system prune -f || true
                    '''
                }
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
                script {
                    echo "🚀 Deploying stack using Docker Compose..."
                    sh '''
                        docker compose down -v --remove-orphans || true
                        docker compose up -d --build
                    '''
                }
            }
        }

        stage('Infrastructure Provision (Terraform)') {
            steps {
                dir('terraform') {
                    script {
                        echo "🏗️ Running Terraform for infrastructure setup..."
                        sh '''
                            terraform init -input=false
                            terraform plan -input=false -out=tfplan
                            terraform apply -auto-approve tfplan
                        '''
                    }
                }
            }
        }

        stage('Health Check') {
            steps {
                script {
                    echo "🩺 Performing health checks..."
                    sh '''
                        echo "⏳ Waiting for backend to start..."
                        sleep 10

                        echo "🌐 Checking backend health..."
                        curl -f http://localhost:3001 || exit 1
                        
                        echo "🌍 Checking frontend..."
                        curl -f http://localhost:3000 || exit 1

                        echo "✅ Health check passed!"
                    '''
                }
            }
        }

        stage('Monitoring Stack (Prometheus & Grafana)') {
            steps {
                script {
                    echo "📊 Checking monitoring containers..."
                    sh '''
                        docker ps | grep prometheus || echo "⚠️ Prometheus not found!"
                        docker ps | grep grafana || echo "⚠️ Grafana not found!"
                    '''
                }
            }
        }
    }

    post {
        success {
            echo "✅ CI/CD Pipeline + Terraform + Monitoring completed successfully!"
        }
        failure {
            echo "❌ Pipeline failed! Please check logs."
        }
    }
}
