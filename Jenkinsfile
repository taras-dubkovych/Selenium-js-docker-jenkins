pipeline {
    agent {
        docker {
            image 'cypress/browsers:node-18.8.0-chrome-103.0.5060.53-ff-102.0.1'
            args '-v /var/run/docker.sock:/var/run/docker.sock'
            reuseNode true
        }
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
