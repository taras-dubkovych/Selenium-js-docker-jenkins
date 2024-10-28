pipeline {
    agent {
        docker {
            image 'node:18-alpine' // Основний образ, в якому встановимо всі залежності та запустимо тести
            args '-v /dev/shm:/dev/shm' // Параметри для оптимізації Chrome
            reuseNode true
        }
    }

    environment {
        CHROME_BIN = '/usr/bin/google-chrome'
    }

    stages {
        stage('Build') {
            steps {
                sh '''
                ls -la
                node --version
                npm --version   
                npm install selenium-webdriver mocha chromedriver --save-dev
                npm install chai --save-dev
                npm install mocha-junit-reporter --save-dev
                '''
            }
        }

        stage('Start Selenium Server') {
            steps {
                sh '''
                 sudo apt update
                sudo apt install -y docker.io
                sudo systemctl start docker
                sudo systemctl enable docker
                docker --version
                docker run -d --name selenium-chrome -p 4444:4444 selenium/standalone-chrome:latest
                '''
            }
        }

        stage('Test') {
            steps {
                sh '''
               
                ls -la
                npm test
                '''
            }
        }
    }

    post {
        always {
            sh 'docker stop selenium-chrome || true && docker rm selenium-chrome || true'
            archiveArtifacts artifacts: 'test-results.xml', allowEmptyArchive: true
            junit 'test-results.xml'
        }
    }
}
